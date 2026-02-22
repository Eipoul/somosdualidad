'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email')
      return
    }

    try {
      setStatus('loading')
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) throw new Error('Error subscribing')

      setStatus('success')
      setEmail('')
      setMessage('Welcome! Check your email for confirmation.')
    } catch {
      setStatus('error')
      setMessage('Error subscribing. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-accentDark/20 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight"
            disabled={status === 'loading'}
          />
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
        {message ? (
          <p className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
