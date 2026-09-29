import './globals.css'
import { Syne, Space_Mono, DM_Sans } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400','700'], variable: '--font-mono' })
// Premium body font for popup content — clean, editorial, highly legible
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['300','400','500','600','700'] })

export const metadata = {
  title: 'Dhanumithra T | SDE, SQE & Data Analyst',
  description: 'M.Sc. Software Systems student at CIT. Detail-obsessed software developer, quality engineer, and data analyst specializing in modern web engineering, testing, and scalable backend solutions.',
  keywords: ['Software Developer', 'SQE', 'Data Analyst', 'Next.js', 'React', 'Python', 'Software Quality Engineer', 'Dhanumithra T', 'CIT Coimbatore', 'Web Engineering'],
  openGraph: {
    title: 'Dhanumithra T | Portfolio',
    description: 'Explore my projects, skills, and experience in software development and AI.',
    url: 'https://dhanumithra.vercel.app/',
    siteName: 'Dhanumithra T Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dhanumithra T - Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanumithra T | Portfolio',
    description: 'Software Developer & AI Researcher from CIT.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${mono.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  )
}
