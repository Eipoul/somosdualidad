import { Resend } from "resend";
import { createElement } from "react";

export const FROM_EMAIL = "Somos Dualidad <hola@somosdualidad.com>";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://somosdualidad.com";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendWelcomeEmail(email: string) {
  const { WelcomeEmail } = await import("@/emails/welcome");
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Bienvenida a Somos Dualidad 🌿",
    react: createElement(WelcomeEmail, { email, siteUrl: SITE_URL }),
  });
}

export async function sendNewEpisodeEmail({
  subscribers,
  episode,
}: {
  subscribers: string[];
  episode: {
    title: string;
    description: string;
    coverImageUrl?: string;
    slug: string;
  };
}) {
  if (subscribers.length === 0) return;
  const { NewEpisodeEmail } = await import("@/emails/new-episode");
  const resend = getResend();

  const batches: string[][] = [];
  for (let i = 0; i < subscribers.length; i += 100) {
    batches.push(subscribers.slice(i, i + 100));
  }

  return Promise.all(
    batches.map((batch) =>
      resend.batch.send(
        batch.map((email) => ({
          from: FROM_EMAIL,
          to: email,
          subject: `Nuevo episodio: ${episode.title}`,
          react: createElement(NewEpisodeEmail, { email, episode, siteUrl: SITE_URL }),
        }))
      )
    )
  );
}

export function getBroadcastClient() {
  return getResend();
}
