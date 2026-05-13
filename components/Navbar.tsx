'use client'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)' }}>
            <span className="text-black font-black text-xs">O&B</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">O&B Detailing</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/#services', label: 'Services' },
            { href: '/#about', label: 'About' },
            { href: '/#reviews', label: 'Reviews' },
            { href: '/#faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:07000000000" className="hidden sm:flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <Phone size={14} />
            <span>07XXX XXXXXX</span>
          </a>
          <Link href="/quote"
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'var(--gold)', color: '#000' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold-light)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--gold)' }}>
            Get a Quote
          </Link>
          <button className="md:hidden p-1" style={{ color: 'var(--muted)' }} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-4" style={{ borderColor: 'var(--border)', backgroundColor: '#0a0a0a' }}>
          {[
            { href: '/#services', label: 'Services' },
            { href: '/#about', label: 'About' },
            { href: '/#reviews', label: 'Reviews' },
            { href: '/#faq', label: 'FAQ' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm py-1" style={{ color: 'var(--muted)' }} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a href="tel:07000000000" className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <Phone size={14} />07XXX XXXXXX
          </a>
        </div>
      )}
    </header>
  )
}
