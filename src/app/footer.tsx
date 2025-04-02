'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/providers/user-provider'

export function Footer() {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <footer className="border-t mt-auto">
        <div className="container">
          <Skeleton className="h-6 w-full max-w-xs mx-auto" />
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t py-4 mt-auto">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FileDrive. Todos los derechos reservados.
      </div>
    </footer>
  )
}