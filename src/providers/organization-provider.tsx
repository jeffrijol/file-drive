'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type Organization = Database['public']['Tables']['organizations']['Insert']

type OrganizationContextType = {
  organizations: Organization[]
  selectedOrganization: Organization | null
  isLoading: boolean
  error: string | null
  setSelectedOrganization: (org: Organization | null) => void
}

const OrganizationContext = createContext<OrganizationContextType>({
  organizations: [],
  selectedOrganization: null,
  isLoading: true,
  error: null,
  setSelectedOrganization: () => {}
})

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const supabase = createClient()
  const [state, setState] = useState<OrganizationContextType>({
    organizations: [],
    selectedOrganization: null,
    isLoading: true,
    error: null,
    setSelectedOrganization: (org) => {
      setState(prev => ({...prev, selectedOrganization: org}))
    }
  })

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setState(prev => ({...prev, isLoading: false }))
          return
        }

        const { data, error } = await supabase
          .from('organization_members')
          .select('organizations(*)')
          .eq('user_id', user.id)

        if (error) throw error

        const orgs = data.flatMap(member => member.organizations) as Organization[]
        setState(prev => ({
          ...prev,
          organizations: orgs,
          selectedOrganization: orgs[0] || null,
          isLoading: false
        }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Error loading organizations',
          isLoading: false
        }))
      }
    }

    fetchOrganizations()
  }, [supabase])

  return (
    <OrganizationContext.Provider value={state}>
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = () => useContext(OrganizationContext)