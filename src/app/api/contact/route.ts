import { NextResponse } from "next/server";
import { getMailTransport } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";

const PROJECT_TYPES = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Creative Development",
  "Shopify",
  "WordPress",
  "API Integration",
  "Other",
] as const;

const CONTACT_METHODS = ["Email", "Phone"] as const;

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_FILE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
]);
const ALLOWED_EXTENSIONS = /\.(pdf|docx?|png|jpe?g|zip)$/i;

const MIN_FILL_TIME_MS = 2500;
const MAX_SERVICES = 10;

function sanitizeLine(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
}

function sanitizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — a real visitor never fills this hidden field.
  if (sanitizeLine(form.get("hp_field")) !== "") {
    return NextResponse.json({ ok: true });
  }

  // Bots tend to submit near-instantly after the form mounts.
  const startedAt = Number(form.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitizeLine(form.get("name"));
  const email = sanitizeLine(form.get("email"));
  const phone = sanitizeLine(form.get("phone"));
  const company = sanitizeLine(form.get("company"));
  const website = sanitizeLine(form.get("website"));
  const projectType = sanitizeLine(form.get("projectType"));
  const message = sanitizeText(form.get("message"));
  const budget = sanitizeLine(form.get("budget"));
  const timeline = sanitizeLine(form.get("timeline"));
  const preferredContact = sanitizeLine(form.get("preferredContact"));
  const consent = sanitizeLine(form.get("consent"));
  const servicesRequired = form
    .getAll("servicesRequired")
    .map(sanitizeLine)
    .filter(Boolean)
    .slice(0, MAX_SERVICES);

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json(
      { ok: false, error: "Message should be between 10 and 3000 characters." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Please confirm the consent checkbox before sending." },
      { status: 400 }
    );
  }
  if (projectType && !PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
    return NextResponse.json({ ok: false, error: "Invalid project type." }, { status: 400 });
  }
  if (
    preferredContact &&
    !CONTACT_METHODS.includes(preferredContact as (typeof CONTACT_METHODS)[number])
  ) {
    return NextResponse.json(
      { ok: false, error: "Invalid preferred contact method." },
      { status: 400 }
    );
  }

  const attachment = form.get("attachment");
  let attachmentBuffer: Buffer | null = null;
  let attachmentName = "";

  if (attachment instanceof File && attachment.size > 0) {
    if (attachment.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Attachment is too large — max file size is 8MB." },
        { status: 400 }
      );
    }
    const looksAllowed =
      ALLOWED_FILE_TYPES.has(attachment.type) || ALLOWED_EXTENSIONS.test(attachment.name);
    if (!looksAllowed) {
      return NextResponse.json(
        { ok: false, error: "That file type isn't supported. Please use PDF, Word, image, or ZIP." },
        { status: 400 }
      );
    }
    attachmentBuffer = Buffer.from(await attachment.arrayBuffer());
    attachmentName = sanitizeLine(attachment.name) || "attachment";
  }

  const mail = getMailTransport();
  if (!mail) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD are not configured.");
    return NextResponse.json(
      { ok: false, error: "Contact form isn't configured yet. Please email directly." },
      { status: 500 }
    );
  }

  try {
    await mail.transporter.sendMail({
      from: `"Portfolio Contact Form" <${mail.user}>`,
      to: mail.user,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        company && `Company: ${company}`,
        website && `Website: ${website}`,
        projectType && `Project type: ${projectType}`,
        budget && `Budget: ${budget}`,
        timeline && `Timeline: ${timeline}`,
        servicesRequired.length && `Services required: ${servicesRequired.join(", ")}`,
        preferredContact && `Preferred contact method: ${preferredContact}`,
        "",
        message,
        "",
        "— Submission details —",
        `Submitted at: ${new Date().toISOString()}`,
        `IP: ${ip}`,
        `User agent: ${userAgent}`,
      ]
        .filter(Boolean)
        .join("\n"),
      attachments: attachmentBuffer
        ? [{ filename: attachmentName, content: attachmentBuffer }]
        : undefined,
    });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
