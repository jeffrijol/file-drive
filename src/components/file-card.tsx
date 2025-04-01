'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'

type FileType = Database['public']['Tables']['files']['Row']

export function FileCard({ file }: { file: FileType }) {
  const supabase = createClient()

  const getFileUrl = () => {
    const { data } = supabase.storage
      .from('files')
      .getPublicUrl(file.storage_path)
    return data.publicUrl
  }

  return (
    <div className="border rounded-lg p-4">
      <a 
        href={getFileUrl()} 
        target="_blank"
        className="flex flex-col gap-2"
      >
        <span className="font-medium">{file.name}</span>
        <span className="text-sm text-gray-500">{file.type}</span>
      </a>
    </div>
  )
}