'use client'

import Link from 'next/link'
import { UserButton } from '@/components/user-button'
import { useUser } from '@/providers/user-provider'

export function Header() {
  const { user } = useUser()

  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          FileDrive
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <UserButton user={user} />
            </>
          ) : (
            <Link href="/login" className="btn">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}