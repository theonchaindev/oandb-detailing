import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { QuoteState, PriceBreakdown, services, vehicleTypes, addOns } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const { state, pricing }: { state: QuoteState; pricing: PriceBreakdown } = await req.json()

    const vehicleType = vehicleTypes.find(v => v.id === state.vehicleTypeId)
    const service = services.find(s => s.id === state.serviceId)

    if (!vehicleType || !service || !pricing) {
      return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 })
    }

    const depositInPence = Math.round(pricing.deposit * 100)

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: depositInPence,
      currency: 'gbp',
      description: `O&B Detailing deposit — ${service.name} for ${state.vehicleMake} ${state.vehicleModel}`,
      metadata: {
        service: service.name,
        vehicle: `${state.vehicleMake} ${state.vehicleModel} (${state.vehicleReg})`,
        date: state.date,
        timeSlot: state.timeSlot,
        customer: `${state.firstName} ${state.lastName}`,
        email: state.email,
      },
    })

    const addOnNames = state.selectedAddOns.map(id => {
      const a = addOns.find(ad => ad.id === id)
      return a?.label ?? id
    })

    const booking = await prisma.booking.create({
      data: {
        stripePaymentIntent: paymentIntent.id,
        status: 'pending_payment',
        vehicleTypeId: state.vehicleTypeId,
        vehicleTypeName: vehicleType.label,
        vehicleConditionId: state.vehicleConditionId,
        vehicleMake: state.vehicleMake,
        vehicleModel: state.vehicleModel,
        vehicleReg: state.vehicleReg,
        serviceId: state.serviceId,
        serviceName: service.name,
        addOns: JSON.stringify(addOnNames),
        date: state.date,
        timeSlot: state.timeSlot,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone,
        postcode: state.postcode,
        address: state.address ?? '',
        notes: state.notes ?? '',
        basePrice: pricing.basePrice,
        conditionSurcharge: pricing.conditionSurcharge,
        addOnTotal: pricing.addOnTotal,
        subtotal: pricing.subtotal,
        deposit: pricing.deposit,
        balanceDue: pricing.balanceDue,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking.id,
    })
  } catch (err: any) {
    console.error('Payment intent error:', err)
    return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
  }
}
