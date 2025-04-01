'use client'

import { Database } from '@/types/supabase'
import { FileCard } from './file-card'
import { FileUploadButton } from './file-upload-button'
import { useUser } from '@/providers/user-provider'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type FileType = Database['public']['Tables']['files']['Row']

export function FileBrowser() {
  const supabase = createClient()
  const { user, isLoading: userLoading } = useUser()
  const [files, setFiles] = useState<FileType[]>([])
  const [currentOrg, setCurrentOrg] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener organización activa
  useEffect(() => {
    const fetchOrganization = async () => {
      if (!user) return
      
      try {
        const { data, error } = await supabase
          .from('organization_members')
          .select('org_id')
          .eq('user_id', user.id)
          .single()

        if (error) throw error
        setCurrentOrg(data?.org_id || null)
      } catch (err) {
        setError('Error al cargar la organización')
      }
    }

    if (!userLoading) fetchOrganization()
  }, [user, userLoading, supabase])

  // Obtener archivos de la organización
  useEffect(() => {
    const fetchFiles = async () => {
      if (!currentOrg) return
      
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('files')
          .select('*')
          .eq('org_id', currentOrg)
          .order('created_at', { ascending: false })

        if (error) throw error
        setFiles(data || [])
      } catch (err) {
        setError('Error al cargar archivos')
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [currentOrg, supabase])

  if (userLoading) return <div className="space-y-4">
    <Skeleton className="h-[125px] w-full rounded-lg" />
    <Skeleton className="h-[125px] w-full rounded-lg" />
  </div>

  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading ? (
        Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-[125px] w-full rounded-lg" />
        ))
      ) : (
        <>
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
          {currentOrg && <FileUploadButton orgId={currentOrg} />}
        </>
      )}
    </div>
  )
}