"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { siteContent } from "@/content/site";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<ContactFormValues>();

  const onSubmit = async (values: ContactFormValues) => {
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.name?.[0]) setError("name", { message: fieldErrors.name[0] });
      if (fieldErrors.email?.[0]) setError("email", { message: fieldErrors.email[0] });
      if (fieldErrors.message?.[0]) setError("message", { message: fieldErrors.message[0] });
      return;
    }

    clearErrors();

    try {
      setStatus("loading");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });

      if (!response.ok) throw new Error("Error de envío");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-accentDark/10 bg-white/70 p-6 shadow-soft">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          className="w-full rounded-xl border border-accentDark/20 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight"
          {...register("name")}
        />
        {errors.name ? <p className="mt-1 text-sm text-red-700">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-xl border border-accentDark/20 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight"
          {...register("email")}
        />
        {errors.email ? <p className="mt-1 text-sm text-red-700">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-xl border border-accentDark/20 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight"
          {...register("message")}
        />
        {errors.message ? <p className="mt-1 text-sm text-red-700">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </Button>

      {status === "success" ? <p className="text-sm text-green-700">{siteContent.contact.formSuccess}</p> : null}
      {status === "error" ? (
        <p className="text-sm text-red-700">
          {siteContent.contact.formError} También puedes escribir a{" "}
          <a className="underline" href={`mailto:${siteContent.contact.email}`}>
            {siteContent.contact.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
