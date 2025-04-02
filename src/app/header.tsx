'use client'

import Link from 'next/link'
import { useUser } from '@/providers/user-provider'
import { useOrganization } from '@/providers/organization-provider'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ChevronDown, Plus } from 'lucide-react'
import { UserButton } from '@/components/user-button'

export function Header() {
  const { user, isLoading: userLoading } = useUser()
  const { 
    organizations,
    selectedOrganization,
    isLoading: orgLoading,
    setSelectedOrganization
  } = useOrganization()

  if (userLoading || orgLoading) {
    return (
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          FileDrive
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    {selectedOrganization?.name || 'Select Organization'}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end">
                  {organizations.map(org => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={() => setSelectedOrganization(org)}
                    >
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <Link href="/create-organization" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create New
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
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
      </div>
    </header>
  )
}