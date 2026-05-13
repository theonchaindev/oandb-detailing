import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'O&B Detailing | Professional Car Detailing',
  description:
    'Premium mobile car detailing services across the UK. Get an instant quote and book online in minutes.',
  openGraph: {
    title: 'O&B Detailing | Professional Car Detailing',
    description: 'Premium mobile car detailing. Instant online quotes and booking.',
    url: 'https://oandbdetailing.co.uk',
    siteName: 'O&B Detailing',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
