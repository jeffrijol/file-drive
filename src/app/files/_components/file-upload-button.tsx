'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { useToast } from '@/components/ui/use-toast'
import { UploadIcon } from '@radix-ui/react-icons'

type FileType = Database['public']['Tables']['files']['Insert']

export function FileUploadButton({ orgId }: { orgId: string }) {
  const supabase = createClient()
  const { toast } = useToast()

  const handleUpload = async (file: File) => {
    try {
      // Subir archivo al storage
      const filePath = `org_${orgId}/${crypto.randomUUID()}-${file.name}`
      const { data: storageData, error: storageError } = await supabase.storage
        .from('files')
        .upload(filePath, file)

      if (storageError) throw storageError

      // Insertar metadata
      const { error: dbError } = await supabase
        .from('files')
        .insert({
          name: file.name,
          type: file.type,
          org_id: orgId,
          storage_path: filePath,
          size: file.size
        } as FileType)

      if (dbError) {
        // Rollback: Eliminar archivo subido si falla la inserción
        await supabase.storage.from('files').remove([filePath])
        throw dbError
      }

      toast({ title: 'Archivo subido exitosamente' })
    } catch (error) {
      toast({
        title: 'Error al subir archivo',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="relative group border-dashed border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors hover:border-primary">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        aria-label="Subir archivo"
      />
      <UploadIcon className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
      <p className="text-sm text-muted-foreground">
        Arrastra archivos o haz clic para subir
      </p>
      <span className="text-xs text-muted-foreground">Máx. 50MB</span>
    </div>
  )
}