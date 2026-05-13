'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { Lock, AlertCircle } from 'lucide-react'

interface Props {
  depositAmount: number
  returnUrl: string
}

export default function PaymentForm({ depositAmount, returnUrl }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    })

    if (error) {
      setError(error.message ?? 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="stripe-element-container p-5 rounded-2xl border" style={{ background: 'var(--surface-light, #1a1a1a)', borderColor: 'var(--border)' }}>
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
          }}
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'var(--gold)', color: '#000' }}>
        <Lock size={16} />
        {loading ? 'Processing...' : `Pay £${depositAmount} Deposit`}
      </button>

      <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
        Secured by Stripe. We never see or store your card details.
      </p>
    </form>
  )
}
