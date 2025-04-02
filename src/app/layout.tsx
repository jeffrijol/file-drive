import { Metadata } from 'next'
import { UserProvider } from '@/providers/user-provider'
import { Header } from './header'
import { Footer } from './footer'
import { Toaster } from '@/components/ui/toaster'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'FileDrive',
  description: 'Almacenamiento en la nube seguro',
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
          <Suspense fallback={<Skeleton className="h-16 w-full" />}>
            <Header />
          </Suspense>

          <main className="flex-1 container py-8">
            {children}
          </main>

          <Suspense fallback={<Skeleton className="h-20 w-full" />}>
            <Footer />
          </Suspense>
          
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}