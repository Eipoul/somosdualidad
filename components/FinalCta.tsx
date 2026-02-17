"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { siteContent } from "@/content/site";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations";
import { Button } from "@/components/Button";

export function FinalCta() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<NewsletterFormValues>();

  const onSubmit = async (data: NewsletterFormValues) => {
    const parsed = newsletterSchema.safeParse(data);

    if (!parsed.success) {
      setError("email", { message: parsed.error.flatten().fieldErrors.email?.[0] ?? "Email inválido" });
      return;
    }

    clearErrors();

    try {
      setStatus("loading");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter", email: parsed.data.email, message: "Nueva suscripción desde home." })
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl border border-accentDark/15 bg-gradient-to-r from-white to-warmGray-100 p-8 md:p-10">
      <p className="text-sm uppercase tracking-[0.2em] text-accentDark/75">CTA</p>
      <h3 className="mt-3 font-serif text-3xl">{siteContent.finalCta.title}</h3>
      <p className="mt-3 max-w-2xl text-foreground/75">{siteContent.finalCta.description}</p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit(onSubmit)}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          className="w-full rounded-full border border-accentDark/20 bg-white px-5 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accentLight"
          placeholder={siteContent.contact.newsletterPlaceholder}
          {...register("email")}
        />
        <Button type="submit" className="sm:min-w-48" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : siteContent.finalCta.buttonLabel}
        </Button>
      </form>

      {errors.email ? <p className="mt-2 text-sm text-red-700">{errors.email.message}</p> : null}
      {status === "success" ? <p className="mt-2 text-sm text-green-700">{siteContent.contact.formSuccess}</p> : null}
      {status === "error" ? <p className="mt-2 text-sm text-red-700">{siteContent.contact.formError}</p> : null}
    </div>
  );
}
