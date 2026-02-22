'use client'

import { FormEvent, useState } from 'react'

export function NewsletterForm() {
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    const data = new FormData(event.currentTarget)

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
        name: data.get('name'),
        consent: true,
        hp: data.get('website'),
      }),
    })

    setState(response.ok ? 'success' : 'error')
    if (response.ok) event.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="glass mx-auto flex max-w-xl flex-col gap-3 rounded-2xl p-6">
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input name="name" placeholder="Nombre (opcional)" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" />
      <input required type="email" name="email" placeholder="tu@email.com" className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" />
      <button className="rounded-xl bg-white px-4 py-3 font-medium text-black transition active:scale-[0.98] hover:bg-zinc-200" disabled={state==='loading'}>
        {state === 'loading' ? 'Enviando...' : 'Quiero suscribirme'}
      </button>
      {state === 'success' && <p className="text-emerald-300">¡Listo! Revisa tu correo para próximas novedades.</p>}
      {state === 'error' && <p className="text-red-300">No se pudo guardar. Intenta de nuevo.</p>}
    </form>
  )
}
