import './globals.css'

import localFont from 'next/font/local'

import { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/provider/theme-provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'NAC - Entropy',
  description: 'Application for the IOT project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${geistSans.className} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body
        className='text-foreground select-none'
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            // position="top-left"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
