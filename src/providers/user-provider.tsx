'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  user: User | null
  isLoading: boolean
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserContextType>({
    user: null,
    isLoading: true
  })

  useEffect(() => {
    const supabase = createClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState({
          user: session?.user ?? null,
          isLoading: false
        })
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={state}>
      {!state.isLoading && children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider')
  }
  return context
}