import { FileBrowser } from '../_components/file-browser'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'
import { SkeletonGrid } from '@/components/skeleton-grid'

export default function FavoritesPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Favoritos</h1>
      </div>
      
      <Suspense fallback={<SkeletonGrid items={6} />}>
        <FavoriteFiles />
      </Suspense>
    </div>
  )
}

async function FavoriteFiles() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('is_favorite', true)
    .order('created_at', { ascending: false })

  if (error) return <div>Error cargando favoritos</div>
  if (!data?.length) return <div>No hay archivos favoritos</div>

  return <FileBrowser data={data} />
}