import { Booking } from '@prisma/client'

function toICSDate(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hour, min] = timeStr.split(':').map(Number)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(min)}00`
}

function addHours(dateStr: string, timeStr: string, hours: number): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const [hour, min] = timeStr.split(':').map(Number)
  const d = new Date(year, month - 1, day, hour + hours, min)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
}

export function generateICS(booking: Booking): string {
  const start = toICSDate(booking.date, booking.timeSlot)
  const end = addHours(booking.date, booking.timeSlot, 3)
  const uid = `${booking.id}@oandbdetailing.co.uk`
  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)

  const description = [
    `Service: ${booking.serviceName}`,
    `Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleReg})`,
    `Total: £${booking.subtotal} | Deposit Paid: £${booking.deposit} | Balance Due: £${booking.balanceDue}`,
    '',
    'Thank you for booking with O&B Detailing.',
    'We will contact you to confirm your appointment.',
    '',
    'Questions? Call or WhatsApp: 07XXX XXXXXX',
  ].join('\\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//O&B Detailing//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:O&B Detailing — ${booking.serviceName}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${booking.postcode}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function googleCalendarUrl(booking: Booking): string {
  const start = toICSDate(booking.date, booking.timeSlot)
  const end = addHours(booking.date, booking.timeSlot, 3)
  const title = encodeURIComponent(`O&B Detailing — ${booking.serviceName}`)
  const details = encodeURIComponent(
    `Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleReg})\nBalance due on day: £${booking.balanceDue}`
  )
  const location = encodeURIComponent(booking.postcode)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`
}

export function outlookCalendarUrl(booking: Booking): string {
  const [y, m, d] = booking.date.split('-')
  const [h, min] = booking.timeSlot.split(':')
  const startDt = `${y}-${m}-${d}T${h}:${min}:00`
  const endDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h) + 3, parseInt(min))
  const endDt = endDate.toISOString().slice(0, 16)
  const subject = encodeURIComponent(`O&B Detailing — ${booking.serviceName}`)
  const body = encodeURIComponent(
    `Vehicle: ${booking.vehicleMake} ${booking.vehicleModel} (${booking.vehicleReg})\nBalance due on day: £${booking.balanceDue}`
  )
  const location = encodeURIComponent(booking.postcode)
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&startdt=${startDt}&enddt=${endDt}&body=${body}&location=${location}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`
}
