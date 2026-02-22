'use client'

import {FormEvent, useMemo, useState} from 'react'

type NewsletterFormProps = {
  title?: string
  subtitle?: string
  buttonLabel?: string
  consentLabel?: string
  successMessage?: string
}

export function NewsletterForm({
  title = 'Suscríbete al newsletter',
  subtitle,
  buttonLabel = 'Suscribirme',
  consentLabel = 'Acepto recibir novedades por email.',
  successMessage = '¡Gracias! Revisa tu correo para confirmar.',
}: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const startedAt = useMemo(() => Date.now(), [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          consent: formData.get('consent') === 'on',
          sourcePage: window.location.pathname,
          hpField: formData.get('website'),
          startedAt,
        }),
      })

      if (!response.ok) throw new Error('No se pudo enviar el formulario.')

      setStatus('success')
      setMessage(successMessage)
      event.currentTarget.reset()
    } catch {
      setStatus('error')
      setMessage('Hubo un problema al enviar. Inténtalo de nuevo en un momento.')
    }
  }

  return (
    <div className="rounded-2xl border border-accentDark/10 bg-white/60 p-8">
      <h2 className="font-serif text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-foreground/75">{subtitle}</p> : null}
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input name="name" required placeholder="Tu nombre" className="rounded-md border border-accentDark/20 bg-white px-4 py-3" />
        <input name="email" type="email" required placeholder="tu@email.com" className="rounded-md border border-accentDark/20 bg-white px-4 py-3" />
        <label className="flex items-start gap-3 text-sm text-foreground/80">
          <input name="consent" type="checkbox" className="mt-1" />
          <span>{consentLabel}</span>
        </label>
        <button type="submit" disabled={status === 'loading'} className="inline-flex w-fit rounded-full bg-accentDark px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
          {status === 'loading' ? 'Enviando...' : buttonLabel}
        </button>
      </form>
      {message ? (
        <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>{message}</p>
      ) : null}
    </div>
  )
}
