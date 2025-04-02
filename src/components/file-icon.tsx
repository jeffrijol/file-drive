'use client'

import { 
  FileText, 
  Image, 
  Folder,
  File,
  FileVideo,
  FileAudio,
  Archive,
  FileCode
} from 'lucide-react'
import { JSX } from 'react'

interface FileIconProps {
  type: string
  className?: string
}

export const FileIcon = ({ type, className }: FileIconProps) => {
  const iconMap: Record<string, JSX.Element> = {
    'folder': <Folder className={className} />,
    'image': <Image className={className} />,
    'video': <FileVideo className={className} />,
    'audio': <FileAudio className={className} />,
    'application/zip': <Archive className={className} />,
    'text': <FileText className={className} />,
    'application/pdf': <FileText className={className} />,
    'code': <FileCode className={className} />
  }

  return iconMap[type] || <File className={className} />
}