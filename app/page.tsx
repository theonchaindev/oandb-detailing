import Link from 'next/link'
import { Star, Shield, Clock, Sparkles, ChevronRight, CheckCircle, Car, Award } from 'lucide-react'
import { services } from '@/lib/pricing'

const stats = [
  { value: '500+', label: 'Cars Detailed' },
  { value: '5.0★', label: 'Average Rating' },
  { value: '100%', label: 'Fully Insured' },
  { value: '3yr', label: 'Ceramic Warranty' },
]

const reviews = [
  {
    name: 'James T.',
    rating: 5,
    text: 'Absolutely incredible work on my Range Rover. Full correction detail — the paint looks better than new. Worth every penny.',
    service: 'Full Paint Correction',
    date: 'Dec 2024',
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Had the interior deep clean after my dog destroyed the back seats. Honestly couldn\'t believe the transformation. Highly recommended.',
    service: 'Interior Deep Clean',
    date: 'Nov 2024',
  },
  {
    name: 'David K.',
    rating: 5,
    text: 'Second time using O&B. They came to my office, job was done before lunch. Car looked showroom fresh. The ceramic coating is still beading water months later.',
    service: 'Ceramic Coating',
    date: 'Oct 2024',
  },
  {
    name: 'Emma R.',
    rating: 5,
    text: 'Super easy to book online, turned up on time, brilliant communication throughout. My Golf looks brand new. Will be a regular customer.',
    service: 'Full Valet',
    date: 'Dec 2024',
  },
  {
    name: 'Mike H.',
    rating: 5,
    text: 'Had the enhancement detail on my M3. The single-stage polish removed pretty much all the swirl marks. Stunning result, very professional.',
    service: 'Enhancement Detail',
    date: 'Nov 2024',
  },
  {
    name: 'Claire B.',
    rating: 5,
    text: 'Quick and easy quote process, no hidden costs, great value. The express wash was exactly what I needed before a long drive.',
    service: 'Express Wash & Vac',
    date: 'Jan 2025',
  },
]

const faqs = [
  {
    q: 'Are you a mobile service?',
    a: 'Yes — we come to you. Whether that\'s your home, workplace or anywhere else, we bring all our professional equipment to your location.',
  },
  {
    q: 'How do I pay the balance?',
    a: 'A 25% deposit is taken at booking to secure your slot. The remaining balance is due on the day of your appointment, payable by card or bank transfer.',
  },
  {
    q: 'What areas do you cover?',
    a: 'We cover a wide area — enter your postcode in the quote builder to confirm availability in your location.',
  },
  {
    q: 'How long does a detail take?',
    a: 'Times vary by service — from 1.5 hours for an express wash up to 1–2 full days for a ceramic coating. You\'ll see the estimated duration when choosing your package.',
  },
  {
    q: 'Do I need to be present?',
    a: 'Not necessarily. You just need to ensure we have access to the vehicle and a power/water supply nearby. Many customers leave us to it while they work from home.',
  },
  {
    q: 'What if it rains?',
    a: 'We carry a portable shelter and will always complete the work as agreed. Exterior services may be rescheduled in extreme weather — we\'ll contact you in advance.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ paddingTop: '64px' }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.12), transparent)',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
              style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', color: 'var(--gold)' }}>
              <Sparkles size={12} />
              Professional Mobile Car Detailing
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
              Your car deserves{' '}
              <span className="gold-shimmer">perfection</span>
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Premium detailing services delivered to your door. Get an instant quote and book online in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105"
                style={{ background: 'var(--gold)', color: '#000' }}>
                Build Your Quote
                <ChevronRight size={18} />
              </Link>
              <a href="tel:07000000000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base border transition-colors"
                style={{ borderColor: 'var(--border)', color: '#fff' }}>
                Call Us
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-xl font-black mb-0.5" style={{ color: 'var(--gold)' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Book in 3 simple steps</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>No phone calls needed — everything online</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: <Car size={24} />, title: 'Build your quote', desc: 'Choose your vehicle, service package and any add-ons. See live pricing instantly.' },
              { step: '02', icon: <Clock size={24} />, title: 'Pick your slot', desc: 'Select a date and time that suits you. We\'ll come to your home or workplace.' },
              { step: '03', icon: <Shield size={24} />, title: 'Pay your deposit', desc: 'Secure your booking with a 25% deposit. Balance paid on the day.' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="p-6 rounded-2xl border relative" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="absolute top-5 right-5 text-4xl font-black opacity-5">{step}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                  {icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Our Services</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Prices vary by vehicle size — get your exact quote online</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(svc => (
              <Link key={svc.id} href="/quote"
                className="p-6 rounded-2xl border group transition-all hover:scale-[1.01]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${svc.color}18`, color: svc.color }}>
                    {svc.duration}
                  </div>
                  {svc.popular && (
                    <div className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                      Most Popular
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{svc.name}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{svc.tagline}</p>
                <div className="text-xl font-black mb-4" style={{ color: svc.color }}>
                  from £{svc.basePrice}
                </div>
                <ul className="space-y-1.5">
                  {svc.includes.slice(0, 4).map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                      <CheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                      {item}
                    </li>
                  ))}
                  {svc.includes.length > 4 && (
                    <li className="text-xs" style={{ color: 'var(--gold)' }}>
                      +{svc.includes.length - 4} more included
                    </li>
                  )}
                </ul>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--gold)' }}>
                  Get a quote <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="about" className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4">Why choose O&B Detailing?</h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                We're passionate about cars and obsessive about quality. Every vehicle gets the same meticulous attention to detail — whether it's an Express Wash or a full Ceramic Coating.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Shield size={18} />, title: 'Fully Insured', desc: 'Public liability insurance on every job. Your vehicle is always protected.' },
                  { icon: <Award size={18} />, title: 'Pro-Grade Products', desc: 'We use professional detailing products — Gyeon, CarPro, Koch-Chemie and more.' },
                  { icon: <Clock size={18} />, title: 'We Come To You', desc: 'Mobile service — we bring the full setup to your home or workplace.' },
                  { icon: <Star size={18} />, title: '5-Star Results', desc: 'Hundreds of happy customers and a 100% satisfaction track record.' },
                ].map(({ icon, title, desc }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)' }}>
                      {icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5">{title}</div>
                      <div className="text-sm" style={{ color: 'var(--muted)' }}>{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Fully Mobile', sub: 'We come to you' },
                { label: 'Pro Products', sub: 'Gyeon, CarPro & more' },
                { label: 'Insured', sub: 'Full liability cover' },
                { label: 'Flexible Hours', sub: 'Mon–Sat, 8am–6pm' },
              ].map(({ label, sub }) => (
                <div key={label} className="p-5 rounded-2xl border text-center" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                  <div className="font-bold text-base mb-1">{label}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="var(--gold)" className="text-transparent" />)}
            </div>
            <h2 className="text-3xl font-black mb-2">5.0 on Google</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>100% of customers would recommend us</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill="var(--gold)" className="text-transparent" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>{r.service}</div>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-5 rounded-2xl border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-10 rounded-3xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-3xl font-black mb-3">Ready to book?</h2>
            <p className="mb-6" style={{ color: 'var(--muted)' }}>
              Get your instant quote and secure your slot in under 2 minutes.
            </p>
            <Link href="/quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'var(--gold)', color: '#000' }}>
              Build My Quote
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
