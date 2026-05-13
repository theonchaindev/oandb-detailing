'use client'
import { QuoteState, timeSlots, formatTime } from '@/lib/pricing'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Props {
  state: QuoteState
  onChange: (updates: Partial<QuoteState>) => void
  onNext: () => void
  onBack: () => void
}

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1 // Mon start
  const cells: (Date | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DateTimeStep({ state, onChange, onNext, onBack }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const cells = buildCalendar(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function isDisabled(d: Date) {
    if (d < today) return true
    if (d.getDay() === 0) return true // Sundays off
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 60)
    if (d > maxDate) return true
    return false
  }

  function toISO(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  function selectDate(d: Date) {
    if (isDisabled(d)) return
    onChange({ date: toISO(d), timeSlot: '' })
  }

  const canProceed = state.date && state.timeSlot

  return (
    <div className="animate-fade-in space-y-6">
      {/* Calendar */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
          Choose a Date
        </h3>
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <button onClick={prevMonth} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'var(--muted)' }}>
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold">{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: 'var(--muted)' }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border)' }}>
            {DAYS.map(d => (
              <div key={d} className="py-2.5 text-center text-xs font-medium" style={{ color: 'var(--muted)' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 p-2 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />
              const iso = toISO(d)
              const disabled = isDisabled(d)
              const selected = state.date === iso
              const isToday = iso === toISO(today)

              return (
                <button
                  key={i}
                  onClick={() => selectDate(d)}
                  disabled={disabled}
                  className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: selected ? 'var(--gold)' : isToday && !selected ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: selected ? '#000' : disabled ? '#333' : '#fff',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}>
                  {d.getDate()}
                </button>
              )
            })}
          </div>

          <div className="px-5 pb-3 flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: 'var(--gold)' }} />
              Selected
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10" />
              Unavailable
            </div>
          </div>
        </div>
      </div>

      {/* Time slots */}
      {state.date && (
        <div className="animate-fade-in">
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
            Choose a Time
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {timeSlots.map(slot => {
              const selected = state.timeSlot === slot
              return (
                <button
                  key={slot}
                  onClick={() => onChange({ timeSlot: slot })}
                  className="py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all"
                  style={{
                    background: selected ? 'var(--gold)' : 'var(--surface)',
                    borderColor: selected ? 'var(--gold)' : 'var(--border)',
                    color: selected ? '#000' : '#fff',
                  }}>
                  {formatTime(slot)}
                </button>
              )
            })}
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
            All times are approximate start times. Mon–Sat only. Sundays unavailable.
          </p>
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
          disabled={!canProceed}
          className="px-8 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'var(--gold)', color: '#000' }}>
          Your Details →
        </button>
      </div>
    </div>
  )
}
