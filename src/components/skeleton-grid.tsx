'use client'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonGridProps {
  items?: number
  className?: string
}

export function SkeletonGrid({ 
  items = 6, 
  className 
}: SkeletonGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      className
    )}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton 
          key={i}
          className="h-[125px] w-full rounded-lg"
        />
      ))}
    </div>
  )
}