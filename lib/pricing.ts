export interface QuoteState {
  vehicleTypeId: string
  vehicleConditionId: string
  vehicleMake: string
  vehicleModel: string
  vehicleReg: string
  serviceId: string
  selectedAddOns: string[]
  date: string
  timeSlot: string
  firstName: string
  lastName: string
  email: string
  phone: string
  postcode: string
  address: string
  notes: string
}

export const defaultQuoteState: QuoteState = {
  vehicleTypeId: '',
  vehicleConditionId: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleReg: '',
  serviceId: '',
  selectedAddOns: [],
  date: '',
  timeSlot: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  postcode: '',
  address: '',
  notes: '',
}

export const vehicleTypes = [
  {
    id: 'city',
    label: 'City / Mini',
    description: 'Fiesta, Corsa, Polo, Yaris',
    multiplier: 1.0,
    icon: '🚗',
  },
  {
    id: 'hatchback',
    label: 'Hatchback / Saloon',
    description: 'Golf, Focus, Astra, 3 Series',
    multiplier: 1.1,
    icon: '🚘',
  },
  {
    id: 'estate',
    label: 'Estate / Coupe',
    description: 'Passat Estate, A5 Coupe, 5 Series',
    multiplier: 1.2,
    icon: '🚙',
  },
  {
    id: 'suv-small',
    label: 'Small SUV / Crossover',
    description: 'Qashqai, Tucson, Tiguan, CRV',
    multiplier: 1.3,
    icon: '🚐',
  },
  {
    id: 'suv-large',
    label: 'Large SUV / 4x4',
    description: 'Range Rover, X5, Defender, Q7',
    multiplier: 1.55,
    icon: '🛻',
  },
  {
    id: 'mpv',
    label: 'MPV / People Carrier',
    description: 'Galaxy, Touran, Sharan, S-Max',
    multiplier: 1.35,
    icon: '🚌',
  },
  {
    id: 'van',
    label: 'Van',
    description: 'Transit, Sprinter, Vivaro, Transporter',
    multiplier: 1.7,
    icon: '🚚',
  },
]

export const conditions = [
  {
    id: 'clean',
    label: 'Well Maintained',
    description: 'Regularly cleaned, light daily soiling only',
    surcharge: 0,
    badge: 'No extra charge',
    color: 'green',
  },
  {
    id: 'average',
    label: 'Average',
    description: 'Some build-up, normal everyday use and dirt',
    surcharge: 0,
    badge: 'No extra charge',
    color: 'green',
  },
  {
    id: 'dirty',
    label: 'Dirty',
    description: 'Heavy soiling, pet hair, significant stains or odour',
    surcharge: 20,
    badge: '+£20',
    color: 'amber',
  },
  {
    id: 'very-dirty',
    label: 'Heavily Neglected',
    description: 'Extreme soiling, long-term neglect, biohazard',
    surcharge: 45,
    badge: '+£45',
    color: 'red',
  },
]

export const services = [
  {
    id: 'express',
    name: 'Express Wash & Vac',
    tagline: 'A quick, thorough refresh',
    basePrice: 35,
    duration: '~1.5 hrs',
    includes: [
      'Hand wash & rinse',
      'Interior vacuum',
      'Dashboard & console wipe',
      'Window clean (inside & out)',
      'Tyre shine application',
      'Door shuts wiped',
    ],
    popular: false,
    color: '#4a9eff',
  },
  {
    id: 'full-valet',
    name: 'Full Valet',
    tagline: 'Our most popular complete clean',
    basePrice: 90,
    duration: '3–4 hrs',
    includes: [
      'Everything in Express Wash',
      'Full interior deep clean',
      'Carpet & mat shampoo',
      'Seat clean (fabric or leather wipe)',
      'All plastics cleaned & dressed',
      'Boot interior cleaned',
      'Hand wax paint protection',
      'Tyre dressing & wheel clean',
      'Air freshener applied',
    ],
    popular: true,
    color: '#c9a84c',
  },
  {
    id: 'interior-only',
    name: 'Interior Deep Clean',
    tagline: 'Intensive interior restoration',
    basePrice: 95,
    duration: '3–4 hrs',
    includes: [
      'Steam clean all surfaces',
      'Shampoo carpets, seats & boot',
      'Leather clean & condition',
      'Full odour neutralisation',
      'Headlining clean',
      'All vents & crevices detailed',
      'Door cards & sill strips',
      'Dashboard deep clean',
    ],
    popular: false,
    color: '#7c6bff',
  },
  {
    id: 'enhancement',
    name: 'Enhancement Detail',
    tagline: 'Transform your paintwork',
    basePrice: 185,
    duration: '5–7 hrs',
    includes: [
      'Everything in Full Valet',
      'Pre-wash snow foam',
      'Clay bar decontamination',
      'Iron & tar fallout removal',
      'Single-stage machine polish',
      'Paint sealant (6 month protection)',
      'Plastic trim restoration',
      'Glass polish & rain repellent',
    ],
    popular: false,
    color: '#22c55e',
  },
  {
    id: 'correction',
    name: 'Full Paint Correction',
    tagline: 'Show-room perfection',
    basePrice: 320,
    duration: '8–12 hrs',
    includes: [
      'Everything in Enhancement Detail',
      'Multi-stage machine correction',
      'Swirl & scratch removal (up to 90%)',
      'Premium paint sealant (12 month)',
      'Full interior deep detail',
      'Leather conditioning treatment',
      'Engine bay clean',
      'Ceramic wax top coat',
    ],
    popular: false,
    color: '#f97316',
  },
  {
    id: 'ceramic',
    name: 'Ceramic Coating',
    tagline: 'Ultimate long-term protection',
    basePrice: 550,
    duration: '1–2 days',
    includes: [
      'Full paint correction included',
      'Professional ceramic coating',
      '3–5 year hydrophobic protection',
      'UV & chemical resistance',
      'Full interior detail',
      'Ceramic coated glass',
      'Aftercare kit included',
      'Maintenance guide & support',
    ],
    popular: false,
    color: '#ec4899',
  },
]

export const addOns = [
  {
    id: 'tar-iron',
    label: 'Tar & Iron Removal',
    price: 30,
    description: 'Remove embedded tar spots & iron fallout from paintwork',
  },
  {
    id: 'engine-bay',
    label: 'Engine Bay Detail',
    price: 40,
    description: 'Full degrease, clean & dress of engine bay',
  },
  {
    id: 'headlights',
    label: 'Headlight Restoration',
    price: 50,
    description: 'Restore clarity & brightness to yellowed / cloudy headlights',
  },
  {
    id: 'alloys',
    label: 'Alloy Wheel Deep Clean',
    price: 35,
    description: 'Remove baked-on brake dust, polish & protect all four wheels',
  },
  {
    id: 'pet-hair',
    label: 'Pet Hair Removal',
    price: 35,
    description: 'Specialist tools to extract stubborn embedded pet hair',
  },
  {
    id: 'leather',
    label: 'Leather Conditioning',
    price: 30,
    description: 'Deep clean, nourish & protect all leather surfaces',
  },
  {
    id: 'odour',
    label: 'Ozone Odour Treatment',
    price: 35,
    description: 'Professional ozone generator to permanently eliminate odours',
  },
  {
    id: 'fabric-protect',
    label: 'Fabric Protector',
    price: 35,
    description: 'Scotchgard-style protector applied to all fabric surfaces',
  },
  {
    id: 'rain-repel',
    label: 'Glass Rain Repellent',
    price: 25,
    description: 'Hydrophobic coating on all glass for improved visibility',
  },
  {
    id: 'trim-restore',
    label: 'Plastic Trim Restore',
    price: 25,
    description: 'Restore faded, grey exterior black plastic trim to black',
  },
]

export const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
]

export interface PriceBreakdown {
  basePrice: number
  conditionSurcharge: number
  addOnTotal: number
  subtotal: number
  deposit: number
  balanceDue: number
}

export function calculatePrice(state: QuoteState): PriceBreakdown | null {
  const vehicleType = vehicleTypes.find(v => v.id === state.vehicleTypeId)
  const condition = conditions.find(c => c.id === state.vehicleConditionId)
  const service = services.find(s => s.id === state.serviceId)

  if (!vehicleType || !condition || !service) return null

  const basePrice = Math.round(service.basePrice * vehicleType.multiplier)
  const conditionSurcharge = condition.surcharge
  const addOnTotal = state.selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find(a => a.id === id)
    return sum + (addon?.price ?? 0)
  }, 0)

  const subtotal = basePrice + conditionSurcharge + addOnTotal
  const deposit = Math.max(25, Math.round(subtotal * 0.25))
  const balanceDue = subtotal - deposit

  return { basePrice, conditionSurcharge, addOnTotal, subtotal, deposit, balanceDue }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'pm' : 'am'
  const display = hour > 12 ? hour - 12 : hour
  return `${display}:${m}${ampm}`
}
