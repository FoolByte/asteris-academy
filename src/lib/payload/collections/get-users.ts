import config from '@payload-config'
import { getPayload } from 'payload'

// Tipe data yang akan digunakan di frontend
export type UserItem = {
  id: string | number
  name: string
  email: string
  role: 'super-admin' | 'admin' | 'editor' | string
}

export async function getUsers(): Promise<UserItem[]> {
  const payload = await getPayload({ config })

  // 1. Ambil dokumen dari collection 'users'
  const data = await payload.find({
    collection: 'users',
    depth: 0, // Set 0 agar lebih ringan jika tidak butuh data relasi
    limit: 100, // Batas maksimal user yang diambil (default 10)
    overrideAccess: true, // Wajib true agar server bisa ambil data tanpa login auth
  })

  // 2. Mapping dan bersihkan data sesuai kebutuhan Frontend
  const users: UserItem[] = data.docs.map((user) => {
    return {
      id: user.id,
      name: typeof user.name === 'string' ? user.name : 'No Name',
      email: typeof user.email === 'string' ? user.email : '',
      role: typeof user.role === 'string' ? user.role : 'Unknown',
    }
  })

  // 3. Kembalikan array berisi daftar user
  return users
}
