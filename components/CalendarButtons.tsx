'use client'
import { Booking } from '@prisma/client'
import { googleCalendarUrl, outlookCalendarUrl } from '@/lib/calendar'
import { Calendar, Download } from 'lucide-react'

interface Props {
  booking: Booking
}

export default function CalendarButtons({ booking }: Props) {
  const googleUrl = googleCalendarUrl(booking)
  const outlookUrl = outlookCalendarUrl(booking)
  const icsUrl = `/api/calendar/${booking.id}`

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold mb-3">Add to your calendar</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all hover:scale-[1.02]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
            <path d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.4 6.9 29.5 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21 21-9.4 21-21c0-1.3-.1-2.7-.4-3.9z" fill="#FFC107"/>
            <path d="M6.3 15.6l6.6 4.8C14.5 16.3 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.4 6.9 29.5 5 24 5 16.3 5 9.7 9.5 6.3 15.6z" fill="#FF3D00"/>
            <path d="M24 47c5.4 0 10.2-2 13.8-5.3l-6.4-5.4C29.4 38 26.8 39 24 39c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 42.4 16.3 47 24 47z" fill="#4CAF50"/>
            <path d="M43.6 20.1H42V20H24v8h11.3c-.7 2.1-2 3.9-3.7 5.2l6.4 5.4C37.8 36.2 45 30 45 26c0-1.3-.1-2.7-.4-3.9z" fill="#1976D2"/>
          </svg>
          Google Calendar
        </a>

        <a
          href={outlookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all hover:scale-[1.02]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="4" fill="#0072C6"/>
            <path d="M28 8h12v32H28L8 36V12L28 8z" fill="white" fillOpacity="0.15"/>
            <rect x="20" y="14" width="20" height="4" rx="2" fill="white"/>
            <rect x="20" y="22" width="16" height="4" rx="2" fill="white"/>
            <rect x="20" y="30" width="18" height="4" rx="2" fill="white"/>
            <rect x="8" y="14" width="14" height="20" rx="2" fill="white"/>
            <text x="15" y="29" textAnchor="middle" fill="#0072C6" fontSize="12" fontWeight="bold">O</text>
          </svg>
          Outlook
        </a>

        <a
          href={icsUrl}
          download
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all hover:scale-[1.02]"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <Download size={16} style={{ color: 'var(--gold)' }} />
          Download .ics
        </a>
      </div>

      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        The .ics file works with Apple Calendar, Outlook desktop, and any other calendar app.
      </p>
    </div>
  )
}
