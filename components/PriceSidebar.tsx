'use client'
import { QuoteState, PriceBreakdown, services, addOns, vehicleTypes, formatDate, formatTime } from '@/lib/pricing'
import { Clock, Calendar } from 'lucide-react'

interface Props {
  state: QuoteState
  pricing: PriceBreakdown | null
  currentStep: number
}

export default function PriceSidebar({ state, pricing, currentStep }: Props) {
  const service = services.find(s => s.id === state.serviceId)
  const vehicleType = vehicleTypes.find(v => v.id === state.vehicleTypeId)
  const selectedAddOns = addOns.filter(a => state.selectedAddOns.includes(a.id))

  if (!state.vehicleTypeId) return null

  return (
    <div className="rounded-2xl border overflow-hidden sticky top-20" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(201,168,76,0.05)' }}>
        <div className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--gold)' }}>Your Quote</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          {state.vehicleMake && state.vehicleModel
            ? `${state.vehicleMake} ${state.vehicleModel}`
            : vehicleType?.label ?? 'Building...'}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Service */}
        {service && (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm">{service.name}</div>
                <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  <Clock size={10} />
                  {service.duration}
                </div>
              </div>
              {pricing && <div className="font-bold text-sm">£{pricing.basePrice + (pricing.conditionSurcharge ?? 0)}</div>}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {selectedAddOns.length > 0 && (
          <div className="space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>Add-Ons</div>
            {selectedAddOns.map(a => (
              <div key={a.id} className="flex justify-between text-xs">
                <span style={{ color: 'var(--muted)' }}>{a.label}</span>
                <span>+£{a.price}</span>
              </div>
            ))}
          </div>
        )}

        {/* Date/time */}
        {state.date && state.timeSlot && (
          <div className="border-t pt-3 flex items-center gap-2 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <Calendar size={11} />
            {formatDate(state.date)} at {formatTime(state.timeSlot)}
          </div>
        )}

        {/* Totals */}
        {pricing && (
          <div className="border-t pt-4 space-y-2" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Total</span>
              <span className="font-semibold">£{pricing.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Balance on day</span>
              <span>£{pricing.balanceDue}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-semibold">Deposit today</span>
              <span className="font-black text-xl" style={{ color: 'var(--gold)' }}>£{pricing.deposit}</span>
            </div>
          </div>
        )}

        {!pricing && state.vehicleTypeId && (
          <div className="text-xs" style={{ color: 'var(--muted)' }}>Select a service to see pricing</div>
        )}
      </div>
    </div>
  )
}
