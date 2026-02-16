import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos para resolver dudas o comenzar tu proceso en Somos Dualidad."
};

export default function ContactPage() {
  return (
    <Section className="pt-12 md:pt-16">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accentDark/70">Contacto</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">TODO: Hablemos de tu siguiente paso</h1>
          <p className="mt-4 text-foreground/75">TODO: Explica qué sucede después de enviar el formulario y en cuánto tiempo responden.</p>
          <p className="mt-6 text-sm">
            Email directo:{" "}
            <a href={`mailto:${siteContent.contact.email}`} className="underline underline-offset-4">
              {siteContent.contact.email}
            </a>
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {siteContent.social.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
