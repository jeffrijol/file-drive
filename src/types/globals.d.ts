import { Database } from './supabase'

declare global {
  type FileWithUrl = Database['public']['Tables']['files']['Row'] & {
    url: string
  }
}