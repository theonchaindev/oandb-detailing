'use client'
import { useState } from 'react'
import { defaultQuoteState, calculatePrice, QuoteState } from '@/lib/pricing'
import VehicleStep from '@/components/steps/VehicleStep'
import ServiceStep from '@/components/steps/ServiceStep'
import AddOnsStep from '@/components/steps/AddOnsStep'
import DateTimeStep from '@/components/steps/DateTimeStep'
import DetailsStep from '@/components/steps/DetailsStep'
import SummaryStep from '@/components/steps/SummaryStep'
import PriceSidebar from '@/components/PriceSidebar'
import { Car, Package, Plus, Calendar, User, CreditCard } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Vehicle', icon: Car },
  { number: 2, label: 'Service', icon: Package },
  { number: 3, label: 'Add-Ons', icon: Plus },
  { number: 4, label: 'Date & Time', icon: Calendar },
  { number: 5, label: 'Details', icon: User },
  { number: 6, label: 'Pay', icon: CreditCard },
]

export default function QuoteBuilder() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<QuoteState>(defaultQuoteState)

  function update(updates: Partial<QuoteState>) {
    setState(prev => ({ ...prev, ...updates }))
  }

  function next() {
    setStep(s => Math.min(s + 1, 6))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function back() {
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pricing = calculatePrice(state)

  const stepTitles: Record<number, string> = {
    1: 'Tell us about your vehicle',
    2: 'Choose your service',
    3: 'Optional add-ons',
    4: 'Choose your date & time',
    5: 'Your contact details',
    6: 'Review & confirm booking',
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '80px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 hidden sm:block" style={{ background: 'var(--border)' }} />
            {STEPS.map(s => {
              const Icon = s.icon
              const done = step > s.number
              const active = step === s.number
              return (
                <div key={s.number} className="flex flex-col items-center gap-1.5 relative z-10">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      background: done ? 'var(--gold)' : active ? 'rgba(201,168,76,0.15)' : 'var(--bg)',
                      borderColor: done || active ? 'var(--gold)' : 'var(--border)',
                      color: done ? '#000' : active ? 'var(--gold)' : 'var(--muted)',
                    }}>
                    {done ? '✓' : <Icon size={14} />}
                  </div>
                  <span className="text-xs font-medium hidden sm:block" style={{ color: active ? 'var(--gold)' : done ? '#fff' : 'var(--muted)' }}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Mobile step indicator */}
          <div className="sm:hidden mt-4 text-center">
            <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
              Step {step} of {STEPS.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border p-6 sm:p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h2 className="text-xl font-black mb-6">{stepTitles[step]}</h2>

              {step === 1 && <VehicleStep state={state} onChange={update} onNext={next} />}
              {step === 2 && <ServiceStep state={state} onChange={update} onNext={next} onBack={back} />}
              {step === 3 && <AddOnsStep state={state} onChange={update} onNext={next} onBack={back} />}
              {step === 4 && <DateTimeStep state={state} onChange={update} onNext={next} onBack={back} />}
              {step === 5 && <DetailsStep state={state} onChange={update} onNext={next} onBack={back} />}
              {step === 6 && pricing && <SummaryStep state={state} pricing={pricing} onBack={back} />}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <PriceSidebar state={state} pricing={pricing} currentStep={step} />
          </div>
        </div>

        {/* Mobile price bar */}
        {pricing && step < 6 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t z-40"
            style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Deposit today</div>
                <div className="font-black text-lg" style={{ color: 'var(--gold)' }}>£{pricing.deposit}</div>
              </div>
              <div className="text-right">
                <div className="text-xs" style={{ color: 'var(--muted)' }}>Total</div>
                <div className="font-bold">£{pricing.subtotal}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
