import { User } from '@/payload-types'
import { Access } from 'payload'

// Akses terbuka untuk semua orang
export const anyone: Access = () => true

// Akses khusus untuk Admin & Super Admin
export const admin: Access = ({ req: { user } }) => {
  const u = user as User | null
  return Boolean(u?.role === 'admin' || u?.role === 'super-admin')
}

// Akses untuk Editor, Admin, & Super Admin
export const editor: Access = ({ req: { user } }) => {
  const u = user as User | null
  return Boolean(u?.role === 'admin' || u?.role === 'super-admin' || u?.role === 'editor')
}
