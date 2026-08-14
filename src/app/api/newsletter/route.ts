import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { getMailTransport } from "@/lib/mailer";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`newsletter:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — a real visitor never fills this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  const mail = getMailTransport();
  if (!mail) {
    console.error("Newsletter: GMAIL_USER / GMAIL_APP_PASSWORD are not configured.");
    return NextResponse.json(
      { ok: false, error: "Signups aren't wired up yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    await mail.transporter.sendMail({
      from: `"Portfolio Newsletter" <${mail.user}>`,
      to: mail.user,
      replyTo: email,
      subject: "New newsletter signup",
      text: `New signup: ${email}`,
    });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
