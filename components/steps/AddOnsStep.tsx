'use client'
import { addOns, services, QuoteState } from '@/lib/pricing'
import { CheckCircle, Plus } from 'lucide-react'

interface Props {
  state: QuoteState
  onChange: (updates: Partial<QuoteState>) => void
  onNext: () => void
  onBack: () => void
}

const alreadyIncluded: Record<string, string[]> = {
  correction: ['tar-iron', 'engine-bay', 'leather'],
  ceramic: ['tar-iron', 'engine-bay', 'leather'],
  enhancement: ['tar-iron', 'rain-repel', 'trim-restore'],
}

export default function AddOnsStep({ state, onChange, onNext, onBack }: Props) {
  const includedInService = alreadyIncluded[state.serviceId] ?? []

  function toggle(id: string) {
    const current = state.selectedAddOns
    if (current.includes(id)) {
      onChange({ selectedAddOns: current.filter(a => a !== id) })
    } else {
      onChange({ selectedAddOns: [...current, id] })
    }
  }

  const service = services.find(s => s.id === state.serviceId)

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Enhance your <span className="text-white font-medium">{service?.name}</span> with optional extras.
          All add-ons are applied during the same appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addOns.map(addon => {
          const selected = state.selectedAddOns.includes(addon.id)
          const included = includedInService.includes(addon.id)

          return (
            <button
              key={addon.id}
              onClick={() => !included && toggle(addon.id)}
              disabled={included}
              className="p-4 rounded-xl border text-left transition-all relative"
              style={{
                background: included
                  ? 'rgba(34,197,94,0.05)'
                  : selected
                  ? 'rgba(201,168,76,0.08)'
                  : 'var(--surface)',
                borderColor: included
                  ? 'rgba(34,197,94,0.3)'
                  : selected
                  ? 'var(--gold)'
                  : 'var(--border)',
                cursor: included ? 'default' : 'pointer',
              }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{addon.label}</span>
                    {included && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                        Included
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{addon.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  {included ? (
                    <CheckCircle size={18} style={{ color: '#22c55e' }} />
                  ) : selected ? (
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} />
                  ) : (
                    <div className="flex items-center gap-1">
                      <Plus size={12} style={{ color: 'var(--muted)' }} />
                      <span className="font-bold text-sm">£{addon.price}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {state.selectedAddOns.length > 0 && (
        <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
          {state.selectedAddOns.length} add-on{state.selectedAddOns.length !== 1 ? 's' : ''} selected · +£{state.selectedAddOns.reduce((sum, id) => {
            const a = addOns.find(ad => ad.id === id)
            return sum + (a?.price ?? 0)
          }, 0)}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all"
          style={{ background: 'var(--gold)', color: '#000' }}>
          Pick Date & Time →
        </button>
      </div>
    </div>
  )
}
