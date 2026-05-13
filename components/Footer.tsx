import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
                <span className="text-black font-black text-xs">O&B</span>
              </div>
              <span className="font-bold text-lg">O&B Detailing</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Professional mobile car detailing. We bring the showroom to your door — fully insured, fully equipped.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {['Express Wash & Vac', 'Full Valet', 'Interior Deep Clean', 'Enhancement Detail', 'Paint Correction', 'Ceramic Coating'].map(s => (
                <li key={s}>
                  <Link href="/quote" className="text-sm transition-colors" style={{ color: 'var(--muted)' }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Phone size={14} />07XXX XXXXXX
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Mail size={14} />hello@oandbdetailing.co.uk
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <MapPin size={14} className="mt-0.5 shrink-0" />Mobile service — we come to you
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} O&B Detailing. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" className="text-xs" style={{ color: 'var(--muted)' }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
