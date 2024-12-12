import './globals.css'

import localFont from 'next/font/local'

import { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { Header } from '@/components/custom/header'

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
  description: 'Smart Environmental Monitoring System',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${geistSans.className} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className='text-foreground select-none bg-background min-h-screen overflow-x-hidden'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1 flex flex-col'>
              <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl'>
                <div className='w-full space-y-4 sm:space-y-6 lg:space-y-8'>
                  {children}
                </div>
              </div>
            </main>
          </div>
          <Toaster
            position='top-right'
             richColors
            closeButton
            theme='system'
            className='toaster-override'
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
