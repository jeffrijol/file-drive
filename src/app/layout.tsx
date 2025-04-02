import { Metadata } from 'next'
import { Suspense } from 'react'
import { UserProvider } from '@/providers/user-provider'
import { OrganizationProvider } from '@/providers/organization-provider'
import { Header } from './header'
import { Footer } from './footer'
import { Toaster } from '@/components/ui/toaster'
import { Skeleton } from '@/components/ui/skeleton'
import './globals.css'

export const metadata: Metadata = {
  title: 'FileDrive',
  description: 'Tu almacenamiento en la nube seguro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <OrganizationProvider>
            <Suspense fallback={<Skeleton className="h-16 w-full" />}>
              <Header />
            </Suspense>

            <main className="flex-1 container py-8">
              {children}
            </main>

            <Suspense fallback={<Skeleton className="h-20 w-full mt-auto" />}>
              <Footer />
            </Suspense>
            
            <Toaster />
          </OrganizationProvider>
        </UserProvider>
      </body>
    </html>
  )
}