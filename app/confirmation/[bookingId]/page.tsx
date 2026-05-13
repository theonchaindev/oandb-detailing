import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { formatDate, formatTime } from '@/lib/pricing'
import CalendarButtons from '@/components/CalendarButtons'
import Link from 'next/link'
import { CheckCircle, Car, Calendar, User, Phone, Mail, AlertTriangle } from 'lucide-react'

interface Props {
  params: Promise<{ bookingId: string }>
  searchParams: Promise<{ payment_intent?: string; redirect_status?: string }>
}

export default async function ConfirmationPage({ params, searchParams }: Props) {
  const { bookingId } = await params
  const sp = await searchParams
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) notFound()

  let paymentConfirmed = booking.status === 'confirmed'

  if (!paymentConfirmed && sp.payment_intent) {
    try {
      const pi = await stripe.paymentIntents.retrieve(sp.payment_intent)
      if (pi.status === 'succeeded') {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'confirmed', stripePaymentIntent: pi.id },
        })
        paymentConfirmed = true
      }
    } catch {
      // payment intent retrieval failed — show warning below
    }
  }

  const addOns: string[] = JSON.parse(booking.addOns || '[]')

  if (!paymentConfirmed && sp.redirect_status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '80px' }}>
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(239,68,68,0.1)' }}>
            <AlertTriangle size={28} style={{ color: '#ef4444' }} />
          </div>
          <h1 className="text-2xl font-black mb-3">Payment Failed</h1>
          <p className="mb-6" style={{ color: 'var(--muted)' }}>
            Your payment could not be processed. No charge has been made.
          </p>
          <Link href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
            style={{ background: 'var(--gold)', color: '#000' }}>
            Try Again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '80px' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(201,168,76,0.12)', border: '2px solid rgba(201,168,76,0.3)' }}>
            <CheckCircle size={36} style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="text-3xl font-black mb-2">Booking Confirmed!</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Your deposit has been received. We'll send a confirmation to <strong className="text-white">{booking.email}</strong>
          </p>
          <div className="mt-3 px-3 py-1.5 inline-block rounded-full text-xs font-mono" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            Booking #{booking.id.slice(-8).toUpperCase()}
          </div>
        </div>

        {/* Booking card */}
        <div className="rounded-2xl border overflow-hidden mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {/* Service header */}
          <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(201,168,76,0.05)' }}>
            <div className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--gold)' }}>
              {booking.serviceName}
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
              <Calendar size={13} />
              <span className="font-medium text-white">{formatDate(booking.date)}</span>
              <span>at</span>
              <span className="font-medium text-white">{formatTime(booking.timeSlot)}</span>
            </div>
          </div>

          {/* Details grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Car size={14} style={{ color: 'var(--gold)' }} />
                <span className="font-semibold text-sm">Vehicle</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { l: 'Vehicle', v: `${booking.vehicleMake} ${booking.vehicleModel}` },
                  { l: 'Type', v: booking.vehicleTypeName },
                  { l: 'Registration', v: booking.vehicleReg },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-2 text-sm">
                    <span className="w-24 shrink-0" style={{ color: 'var(--muted)' }}>{l}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <User size={14} style={{ color: 'var(--gold)' }} />
                <span className="font-semibold text-sm">Contact</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { l: 'Name', v: `${booking.firstName} ${booking.lastName}` },
                  { l: 'Phone', v: booking.phone },
                  { l: 'Postcode', v: booking.postcode },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-2 text-sm">
                    <span className="w-24 shrink-0" style={{ color: 'var(--muted)' }}>{l}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {addOns.length > 0 && (
              <div className="sm:col-span-2 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <div className="font-semibold text-sm mb-2">Add-Ons Included</div>
                <div className="flex flex-wrap gap-2">
                  {addOns.map(a => (
                    <span key={a} className="px-2.5 py-1 rounded-full text-xs border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment summary */}
          <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--border)', background: 'rgba(201,168,76,0.04)' }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Total</div>
                <div className="font-bold">£{booking.subtotal}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Deposit Paid</div>
                <div className="font-bold" style={{ color: '#22c55e' }}>£{booking.deposit} ✓</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Balance Due</div>
                <div className="font-bold">£{booking.balanceDue}</div>
              </div>
            </div>
            <p className="text-xs text-center mt-3" style={{ color: 'var(--muted)' }}>
              Balance of £{booking.balanceDue} is payable on the day of your appointment.
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl border p-6 mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <CalendarButtons booking={booking} />
        </div>

        {/* What to expect */}
        <div className="rounded-2xl border p-6 mb-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <h3 className="font-bold mb-4">What happens next?</h3>
          <div className="space-y-4">
            {[
              {
                icon: <Mail size={14} />,
                title: 'Confirmation email',
                desc: 'You\'ll receive a confirmation email at ' + booking.email + ' shortly.',
              },
              {
                icon: <Phone size={14} />,
                title: 'We\'ll call you',
                desc: 'We\'ll call or WhatsApp you the day before to confirm access and any last-minute details.',
              },
              {
                icon: <Car size={14} />,
                title: 'We come to you',
                desc: 'On the day, our detailer will arrive at your location at the agreed time with all equipment.',
              },
              {
                icon: <CheckCircle size={14} />,
                title: 'Balance on completion',
                desc: `Pay the remaining £${booking.balanceDue} by card or bank transfer once the work is done.`,
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{title}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>Questions? We're here to help.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="tel:07000000000" className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
              <Phone size={14} />07XXX XXXXXX
            </a>
            <a href="mailto:hello@oandbdetailing.co.uk" className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
              <Mail size={14} />Email us
            </a>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-sm" style={{ color: 'var(--muted)' }}>← Back to homepage</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
