import { getPayload } from 'payload'
import config from '@payload-config'

export async function getHomeContents() {
  const payload = await getPayload({ config })

  const homePage = await payload.findGlobal({
    slug: 'home-page',
    depth: 1,
  })

  return homePage || null
}
