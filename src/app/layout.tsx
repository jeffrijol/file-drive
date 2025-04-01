import './globals.css'
import { UserProvider } from '@/providers/user-provider'
import { Header } from './header'
import { Footer } from './footer'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserProvider>
          <Header />
          
          <main className="flex-1 container py-8">
            {children}
          </main>

          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}