'use client'
import { vehicleTypes, conditions, QuoteState } from '@/lib/pricing'
import { CheckCircle } from 'lucide-react'

interface Props {
  state: QuoteState
  onChange: (updates: Partial<QuoteState>) => void
  onNext: () => void
}

export default function VehicleStep({ state, onChange, onNext }: Props) {
  const canProceed =
    state.vehicleTypeId &&
    state.vehicleConditionId &&
    state.vehicleMake.trim() &&
    state.vehicleModel.trim() &&
    state.vehicleReg.trim()

  return (
    <div className="animate-fade-in space-y-8">
      {/* Vehicle type */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
          Vehicle Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {vehicleTypes.map(vt => {
            const selected = state.vehicleTypeId === vt.id
            return (
              <button
                key={vt.id}
                onClick={() => onChange({ vehicleTypeId: vt.id })}
                className="p-4 rounded-xl border text-left transition-all relative"
                style={{
                  background: selected ? 'rgba(201,168,76,0.1)' : 'var(--surface)',
                  borderColor: selected ? 'var(--gold)' : 'var(--border)',
                }}>
                {selected && (
                  <CheckCircle size={14} className="absolute top-3 right-3" style={{ color: 'var(--gold)' }} />
                )}
                <div className="text-2xl mb-2">{vt.icon}</div>
                <div className="font-semibold text-sm mb-0.5">{vt.label}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{vt.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Vehicle details */}
      {state.vehicleTypeId && (
        <div className="animate-fade-in">
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
            Vehicle Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { key: 'vehicleMake', label: 'Make', placeholder: 'e.g. BMW' },
              { key: 'vehicleModel', label: 'Model', placeholder: 'e.g. 3 Series' },
              { key: 'vehicleReg', label: 'Registration', placeholder: 'e.g. AB12 CDE' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={state[key as keyof QuoteState] as string}
                  onChange={e => onChange({ [key]: key === 'vehicleReg' ? e.target.value.toUpperCase() : e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-transparent transition-colors"
                  style={{ borderColor: 'var(--border)', color: '#fff' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Condition */}
      {state.vehicleTypeId && (
        <div className="animate-fade-in">
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>
            Current Condition
          </h3>
          <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
            Be honest — this helps us allocate the right amount of time and price your service correctly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conditions.map(c => {
              const selected = state.vehicleConditionId === c.id
              const badgeColors: Record<string, string> = {
                green: '#22c55e',
                amber: '#f59e0b',
                red: '#ef4444',
              }
              return (
                <button
                  key={c.id}
                  onClick={() => onChange({ vehicleConditionId: c.id })}
                  className="p-4 rounded-xl border text-left transition-all relative"
                  style={{
                    background: selected ? 'rgba(201,168,76,0.1)' : 'var(--surface)',
                    borderColor: selected ? 'var(--gold)' : 'var(--border)',
                  }}>
                  {selected && (
                    <CheckCircle size={14} className="absolute top-3 right-3" style={{ color: 'var(--gold)' }} />
                  )}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{c.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${badgeColors[c.color]}18`, color: badgeColors[c.color] }}>
                      {c.badge}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{c.description}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'var(--gold)', color: '#000' }}>
          Choose Service →
        </button>
      </div>
    </div>
  )
}
