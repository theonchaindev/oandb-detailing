import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateICS } from '@/lib/calendar'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const ics = generateICS(booking)

    return new NextResponse(ics, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="oanb-detailing-${booking.date}.ics"`,
      },
    })
  } catch (err) {
    console.error('Calendar error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
