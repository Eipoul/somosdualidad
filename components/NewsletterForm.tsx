'use client'

import {FormEvent, useMemo, useState} from 'react'

type NewsletterFormProps = {
  title?: string
  subtitle?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  buttonLabel?: string
  consentLabel?: string
  successMessage?: string
}

export function NewsletterForm({
  title = 'Suscríbete',
  subtitle,
  namePlaceholder = 'Tu nombre (opcional)',
  emailPlaceholder = 'tu@email.com',
  buttonLabel = 'Suscribirme',
  consentLabel = 'Acepto recibir novedades por email.',
  successMessage = '¡Gracias por suscribirte!',
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
      const response = await fetch('/api/newsletter/subscribe', {
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
      if (!response.ok) throw new Error('request failed')
      setStatus('success')
      setMessage(successMessage)
      event.currentTarget.reset()
    } catch {
      setStatus('error')
      setMessage('Hubo un problema al enviar. Inténtalo de nuevo en un momento.')
    }
  }

  return (
    <div className="rounded-3xl border border-accentDark/10 bg-white p-8 shadow-soft">
      <h2 className="font-serif text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-foreground/75">{subtitle}</p> : null}
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input name="name" placeholder={namePlaceholder} className="rounded-xl border border-accentDark/20 px-4 py-3" />
        <input name="email" type="email" required aria-label="Email" placeholder={emailPlaceholder} className="rounded-xl border border-accentDark/20 px-4 py-3" />
        <label className="flex gap-2 text-sm text-foreground/80"><input name="consent" type="checkbox" /><span>{consentLabel}</span></label>
        <button type="submit" disabled={status === 'loading'} className="w-fit rounded-full bg-accentDark px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60">{status === 'loading' ? 'Enviando...' : buttonLabel}</button>
      </form>
      {message ? <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>{message}</p> : null}
    </div>
  )
}
