'use client'

import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { TrashIcon, DownloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'

type FileType = Database['public']['Tables']['files']['Row']

export function FileActions({ file }: { file: FileType }) {
  const supabase = createClient()
  const { toast } = useToast()

  const handleDownload = async () => {
    try {
      const { data } = supabase.storage
        .from('files')
        .getPublicUrl(file.storage_path)
      
      if (!data?.publicUrl) throw new Error('URL no disponible')
      window.open(data.publicUrl, '_blank')
    } catch (error) {
      toast({
        title: 'Error al descargar',
        description: 'No se pudo obtener el enlace del archivo',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async () => {
    try {
      // Eliminar de storage
      const { error: storageError } = await supabase.storage
        .from('files')
        .remove([file.storage_path])

      if (storageError) throw storageError

      // Eliminar metadata
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', file.id)

      if (dbError) throw dbError

      toast({ title: 'Archivo eliminado exitosamente' })
    } catch (error) {
      toast({
        title: 'Error al eliminar',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDownload}
        className="text-blue-600 hover:bg-blue-50"
      >
        <DownloadIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="text-red-600 hover:bg-red-50"
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}