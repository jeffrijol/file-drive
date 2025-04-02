'use client'

import { Database } from '@/types/supabase'
import { FileActions } from './file-actions'
import { createClient } from '@/lib/supabase/client'
import { FileTextIcon, ImageIcon } from '@radix-ui/react-icons'

type FileType = Database['public']['Tables']['files']['Row']

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />
  return <FileTextIcon className="w-6 h-6" />
}

export function FileCard({ file }: { file: FileType }) {
  const supabase = createClient()
  
  /* const getFileSize = () => {
    if (!file.size) return ''
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2)
    return `${sizeInMB} MB`
  } */

  return (
    <div className="group border rounded-lg p-4 hover:bg-accent transition-colors relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-muted-foreground">
          {getFileIcon(file.type)}
        </div>
        <div className="flex-1">
          <h3 className="font-medium truncate">{file.name}</h3>
          <p className="text-sm text-muted-foreground">
            {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'Unknown date'}
          </p>
          {/* {file.size && (
            <p className="text-xs text-muted-foreground">{getFileSize()}</p>
          )} */}
        </div>
      </div>
      <FileActions file={file} />
    </div>
  )
}