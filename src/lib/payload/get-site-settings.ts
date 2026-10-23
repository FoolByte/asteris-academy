import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export type PayloadLink = {
  type: 'internal' | 'custom' | 'anchor' | string
  label: string
  anchor?: string | null
  path?: string | null
  url?: string | null
  newTab?: boolean | null
}

export type SiteSettingsData = {
  logo?: { url: string; alt?: string } | null
  siteName: string
  navigation?: { id: string; link: PayloadLink }[]
}

/** Ubah field link Payload menjadi href string. */
export function resolveLinkHref(link: PayloadLink): string {
  switch (link.type) {
    case 'internal':
      return link.path || '/'
    case 'anchor':
      return link.anchor ? `/#${link.anchor.replace(/^#/, '')}` : '/'
    default:
      return link.url || '#'
  }
}

/** `cache` dari React: dipanggil Navbar & Footer pada request yang sama → hanya 1 query. */
export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  return settings as unknown as SiteSettingsData
})
