'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Database } from '@/types/supabase'
import { FileIcon } from '@/components/file-icon'
import { formatDate } from '@/lib/date-utils'
import { FileActions } from './file-actions'

type FileType = Database['public']['Tables']['files']['Row']

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <FileIcon 
          type={row.original.type} 
          className="w-5 h-5 text-muted-foreground" 
        />
        <span className="font-medium truncate">
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm capitalize">
        {row.original.type.split('/').pop()}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Fecha de Creación',
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <FileActions file={row.original} />,
    enableHiding: false,
  },
]