import QuoteBuilder from '@/components/QuoteBuilder'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Quote | O&B Detailing',
  description: 'Build your personalised detailing quote and book online in minutes.',
}

export default function QuotePage() {
  return <QuoteBuilder />
}
