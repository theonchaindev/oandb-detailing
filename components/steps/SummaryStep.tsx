'use client'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { QuoteState, PriceBreakdown, vehicleTypes, conditions, services, addOns, formatDate, formatTime } from '@/lib/pricing'
import { CheckCircle, Car, Calendar, User, Lock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import PaymentForm from '@/components/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  state: QuoteState
  pricing: PriceBreakdown
  onBack: () => void
}

interface SummaryRow {
  label: string
  value: string
}

export default function SummaryStep({ state, pricing, onBack }: Props) {
  const [phase, setPhase] = useState<'review' | 'payment'>('review')
  const [clientSecret, setClientSecret] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(false)

  const vehicleType = vehicleTypes.find(v => v.id === state.vehicleTypeId)
  const condition = conditions.find(c => c.id === state.vehicleConditionId)
  const service = services.find(s => s.id === state.serviceId)
  const selectedAddOnItems = addOns.filter(a => state.selectedAddOns.includes(a.id))

  const vehicleRows: SummaryRow[] = [
    { label: 'Vehicle', value: `${state.vehicleMake} ${state.vehicleModel}` },
    { label: 'Type', value: vehicleType?.label ?? '' },
    { label: 'Registration', value: state.vehicleReg },
    { label: 'Condition', value: condition?.label ?? '' },
  ]

  const bookingRows: SummaryRow[] = [
    { label: 'Date', value: formatDate(state.date) },
    { label: 'Time', value: formatTime(state.timeSlot) },
    { label: 'Service', value: service?.name ?? '' },
    { label: 'Duration', value: service?.duration ?? '' },
  ]

  const customerRows: SummaryRow[] = [
    { label: 'Name', value: `${state.firstName} ${state.lastName}` },
    { label: 'Email', value: state.email },
    { label: 'Phone', value: state.phone },
    { label: 'Postcode', value: state.postcode },
    ...(state.address ? [{ label: 'Address', value: state.address }] : []),
  ]

  async function handlePayDeposit() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, pricing }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to initialise payment')
      setClientSecret(data.clientSecret)
      setBookingId(data.bookingId)
      setPhase('payment')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const returnUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/confirmation/${bookingId}`
    : ''

  if (phase === 'payment' && clientSecret) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="p-4 rounded-2xl border" style={{ background: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.2)' }}>
          <div className="flex justify-between items-center text-sm">
            <span style={{ color: 'var(--muted)' }}>Deposit to pay now</span>
            <span className="font-black text-xl" style={{ color: 'var(--gold)' }}>£{pricing.deposit}</span>
          </div>
          <div className="flex justify-between items-center text-xs mt-1" style={{ color: 'var(--muted)' }}>
            <span>Balance due on the day</span>
            <span>£{pricing.balanceDue}</span>
          </div>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#c9a84c',
                colorBackground: '#1a1a1a',
                colorText: '#ffffff',
                colorTextSecondary: '#888888',
                borderRadius: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
              },
            },
          }}>
          <PaymentForm
            depositAmount={pricing.deposit}
            returnUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/confirmation/${bookingId}`}
          />
        </Elements>

        <button
          onClick={() => setPhase('review')}
          className="text-sm underline"
          style={{ color: 'var(--muted)' }}>
          ← Back to review
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Vehicle */}
      <SummaryCard icon={<Car size={15} />} title="Vehicle" rows={vehicleRows} />

      {/* Booking */}
      <SummaryCard icon={<Calendar size={15} />} title="Appointment" rows={bookingRows} />

      {/* Customer */}
      <SummaryCard icon={<User size={15} />} title="Your Details" rows={customerRows} />

      {/* Add-ons */}
      {selectedAddOnItems.length > 0 && (
        <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={15} style={{ color: 'var(--gold)' }} />
            <span className="font-semibold text-sm">Add-Ons</span>
          </div>
          <div className="space-y-1.5">
            {selectedAddOnItems.map(a => (
              <div key={a.id} className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted)' }}>{a.label}</span>
                <span>£{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price breakdown */}
      <div className="p-5 rounded-2xl border" style={{ background: 'rgba(201,168,76,0.05)', borderColor: 'rgba(201,168,76,0.25)' }}>
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="w-full flex items-center justify-between text-sm mb-1">
          <span className="font-semibold">Price Breakdown</span>
          {detailsOpen ? <ChevronUp size={14} style={{ color: 'var(--muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--muted)' }} />}
        </button>

        {detailsOpen && (
          <div className="space-y-1.5 mt-3 pb-3 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Base service ({vehicleType?.label})</span>
              <span>£{pricing.basePrice}</span>
            </div>
            {pricing.conditionSurcharge > 0 && (
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted)' }}>Condition surcharge</span>
                <span>£{pricing.conditionSurcharge}</span>
              </div>
            )}
            {pricing.addOnTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted)' }}>Add-ons</span>
                <span>£{pricing.addOnTotal}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 mt-3">
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--muted)' }}>Total</span>
            <span className="font-semibold">£{pricing.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--muted)' }}>Balance due on day</span>
            <span>£{pricing.balanceDue}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Deposit due today</span>
            <span className="font-black text-2xl" style={{ color: 'var(--gold)' }}>£{pricing.deposit}</span>
          </div>
        </div>

        <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
          A 25% deposit (min. £25) is taken now to secure your booking. The remaining balance of £{pricing.balanceDue} is payable on the day of your appointment.
        </p>
      </div>

      {/* T&Cs */}
      <label className="flex items-start gap-3 cursor-pointer">
        <div
          onClick={() => setAgreed(!agreed)}
          className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all cursor-pointer"
          style={{
            background: agreed ? 'var(--gold)' : 'transparent',
            borderColor: agreed ? 'var(--gold)' : 'var(--border)',
          }}>
          {agreed && <CheckCircle size={12} style={{ color: '#000' }} />}
        </div>
        <span className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
          I agree to the <a href="#" className="underline text-white">Terms & Conditions</a> and <a href="#" className="underline text-white">Cancellation Policy</a>. I understand that the deposit is non-refundable with less than 48 hours notice.
        </span>
      </label>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          ← Back
        </button>
        <button
          onClick={handlePayDeposit}
          disabled={!agreed || loading}
          className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'var(--gold)', color: '#000' }}>
          <Lock size={15} />
          {loading ? 'Setting up payment...' : `Pay £${pricing.deposit} Deposit`}
        </button>
      </div>
    </div>
  )
}

function SummaryCard({ icon, title, rows }: { icon: React.ReactNode; title: string; rows: SummaryRow[] }) {
  return (
    <div className="p-4 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: 'var(--gold)' }}>{icon}</span>
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {rows.map(row => (
          <div key={row.label} className="flex gap-2 text-sm">
            <span className="shrink-0 w-24" style={{ color: 'var(--muted)' }}>{row.label}</span>
            <span className="font-medium break-all">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
