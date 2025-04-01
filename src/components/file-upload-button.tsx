'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'

type FileType = Database['public']['Tables']['files']['Insert']

export function FileUploadButton({ orgId }: { orgId: string }) {
  const supabase = createClient()

  const uploadFile = async (file: File) => {
    const path = `org_${orgId}/${crypto.randomUUID()}_${file.name}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('files')
      .upload(path, file)

    if (!uploadError && uploadData) {
      const { error } = await supabase
        .from('files')
        .insert({
          name: file.name,
          type: file.type.split('/')[1] || file.type,
          org_id: orgId,
          storage_path: path
        } as FileType)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input 
        type="file"
        onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
      />
    </div>
  )
}