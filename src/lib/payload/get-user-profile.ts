import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export type UserProfile = {
  name: string
  email: string
  role: 'super-admin' | 'admin' | 'editor'
  avatarUrl: string | null
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const payload = await getPayload({ config })

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (!user) {
    return null
  }

  const avatar = typeof user.avatar === 'object' && user.avatar !== null ? user.avatar : null

  return {
    name: user.name ?? 'Pengguna',
    email: user.email,
    role: user.role,
    avatarUrl: avatar?.url ?? null,
  }
}
