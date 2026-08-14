import { Section } from "@/components/ui/section";
import { ContactPageHero } from "@/components/contact/contact-page-hero";
import { WhyContactCards } from "@/components/contact/why-contact-cards";
import { ContactInfoGrid } from "@/components/contact/contact-info-grid";
import { ContactForm } from "@/components/contact/contact-form";
import { ProcessStrip } from "@/components/contact/process-strip";
import { WhyWorkGrid } from "@/components/contact/why-work-grid";
import { ContactFinalCta } from "@/components/contact/contact-final-cta";
import { Faq } from "@/components/sections/faq";
import { StructuredData } from "@/components/seo/structured-data";
import { pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with Bhavya Chawla — full-stack development, UI/UX design, mobile apps, and creative web experiences. One form, one person, a reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <StructuredData data={personSchema()} />

      {/* 01. Hero */}
      <ContactPageHero />

      {/* 02. Why Contact Me */}
      <WhyContactCards />

      {/* 03. Contact Information */}
      <ContactInfoGrid />

      {/* 04. Contact Form */}
      <Section id="contact-form" dataProgress="Start Your Project">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          04 / Start Your Project
        </p>
        <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-border bg-surface-raised p-8 md:mt-14 md:p-12">
          <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Project enquiry
          </h2>
          <p className="mt-3 text-sm text-ink-muted md:text-base">
            The more context you give, the more useful my first reply will be.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* 05. Process */}
      <ProcessStrip />

      {/* 06. Why Work With Me */}
      <WhyWorkGrid />

      {/* 07. FAQ */}
      <Faq index="07" />

      {/* 08. Final CTA */}
      <ContactFinalCta />
    </>
  );
}
