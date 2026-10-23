'use server'

import { revalidatePath } from 'next/cache'

export async function clearPageCache(path: string) {
  // Fungsi ini akan memaksa Next.js menghapus cache pada path yang diberikan
  revalidatePath(path)
}
