import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('previewSecret')

  if (!path || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Tidak diizinkan', { status: 403 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Tidak diizinkan', { status: 403 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
