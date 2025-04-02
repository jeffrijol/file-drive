import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDate(
  dateString: string | Date, 
  formatStr: string = "dd MMM yyyy 'a las' HH:mm"
): string {
  const date = typeof dateString === 'string' 
    ? new Date(dateString) 
    : dateString
    
  return format(date, formatStr, { locale: es })
}

