'use client'
import { QuoteState } from '@/lib/pricing'

interface Props {
  state: QuoteState
  onChange: (updates: Partial<QuoteState>) => void
  onNext: () => void
  onBack: () => void
}

interface FieldDef {
  key: keyof QuoteState
  label: string
  placeholder: string
  type?: string
  required?: boolean
  span?: 'full' | 'half'
  hint?: string
}

const fields: FieldDef[] = [
  { key: 'firstName', label: 'First Name', placeholder: 'John', required: true },
  { key: 'lastName', label: 'Last Name', placeholder: 'Smith', required: true },
  { key: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', required: true, span: 'full' },
  { key: 'phone', label: 'Mobile Number', placeholder: '07XXX XXXXXX', type: 'tel', required: true, span: 'full' },
  { key: 'address', label: 'Address Line', placeholder: '12 High Street', span: 'full', hint: 'Where we should come to detail your vehicle' },
  { key: 'postcode', label: 'Postcode', placeholder: 'AB12 3CD', required: true, hint: 'Used to confirm we cover your area' },
]

export default function DetailsStep({ state, onChange, onNext, onBack }: Props) {
  const canProceed =
    state.firstName.trim() &&
    state.lastName.trim() &&
    state.email.trim() &&
    state.phone.trim() &&
    state.postcode.trim()

  return (
    <div className="animate-fade-in space-y-6">
      <p className="text-sm" style={{ color: 'var(--muted)' }}>
        We'll use these details to confirm your booking and contact you on the day.
        Your information is never shared with third parties.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={String(f.key)} className={f.span === 'full' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
              {f.label} {f.required && <span style={{ color: 'var(--gold)' }}>*</span>}
            </label>
            <input
              type={f.type ?? 'text'}
              placeholder={f.placeholder}
              value={state[f.key] as string}
              onChange={e => onChange({ [f.key]: f.key === 'postcode' ? e.target.value.toUpperCase() : e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-transparent transition-colors"
              style={{ borderColor: 'var(--border)', color: '#fff' }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
            {f.hint && <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{f.hint}</p>}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
            Additional Notes <span className="font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Any specific concerns, access instructions, or requests..."
            value={state.notes}
            onChange={e => onChange({ notes: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-transparent transition-colors resize-none"
            style={{ borderColor: 'var(--border)', color: '#fff' }}
            onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}>
        <strong className="text-white">Data & Privacy:</strong> Your details are stored securely and used solely to manage your booking. We may contact you by phone or email regarding your appointment. See our privacy policy for full details.
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'var(--gold)', color: '#000' }}>
          Review & Pay →
        </button>
      </div>
    </div>
  )
}
