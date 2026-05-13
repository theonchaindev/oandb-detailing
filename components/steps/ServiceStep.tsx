'use client'
import { services, vehicleTypes, conditions, QuoteState } from '@/lib/pricing'
import { CheckCircle, Clock } from 'lucide-react'

interface Props {
  state: QuoteState
  onChange: (updates: Partial<QuoteState>) => void
  onNext: () => void
  onBack: () => void
}

export default function ServiceStep({ state, onChange, onNext, onBack }: Props) {
  const vehicleType = vehicleTypes.find(v => v.id === state.vehicleTypeId)
  const condition = conditions.find(c => c.id === state.vehicleConditionId)

  function priceFor(basePrice: number) {
    if (!vehicleType) return basePrice
    let p = Math.round(basePrice * vehicleType.multiplier)
    if (condition) p += condition.surcharge
    return p
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="p-3 rounded-xl text-sm flex items-center gap-2" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
        <span>Prices shown for:</span>
        <span className="font-semibold">{vehicleType?.label} · {state.vehicleMake} {state.vehicleModel}</span>
        {condition && condition.surcharge > 0 && (
          <span className="ml-auto text-xs opacity-70">Condition surcharge: +£{condition.surcharge}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(svc => {
          const selected = state.serviceId === svc.id
          const price = priceFor(svc.basePrice)

          return (
            <button
              key={svc.id}
              onClick={() => onChange({ serviceId: svc.id })}
              className="p-5 rounded-2xl border text-left transition-all relative hover:scale-[1.01]"
              style={{
                background: selected ? `${svc.color}0d` : 'var(--surface)',
                borderColor: selected ? svc.color : 'var(--border)',
              }}>
              {svc.popular && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                  Most Popular
                </div>
              )}
              {selected && !svc.popular && (
                <CheckCircle size={16} className="absolute top-4 right-4" style={{ color: svc.color }} />
              )}
              {selected && svc.popular && (
                <CheckCircle size={16} className="absolute top-4 left-4" style={{ color: svc.color }} />
              )}

              <div className="flex items-center gap-2 mb-1">
                <div className="font-bold text-base">{svc.name}</div>
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{svc.tagline}</div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-black" style={{ color: svc.color }}>£{price}</span>
                {condition && condition.surcharge > 0 && (
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>inc. condition</span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs mb-4" style={{ color: 'var(--muted)' }}>
                <Clock size={11} />
                <span>{svc.duration}</span>
              </div>

              <ul className="space-y-1.5">
                {svc.includes.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: selected ? '#ddd' : 'var(--muted)' }}>
                    <CheckCircle size={11} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!state.serviceId}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'var(--gold)', color: '#000' }}>
          Choose Add-Ons →
        </button>
      </div>
    </div>
  )
}
