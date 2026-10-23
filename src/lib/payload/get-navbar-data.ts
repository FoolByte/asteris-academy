import config from '@payload-config'
import { getPayload } from 'payload'
import { getSiteSettings, type PayloadLink } from './get-site-settings'

export type { PayloadLink }

// Bentuk data tidak berubah, jadi komponen Navbar tidak perlu diubah.
export type HeaderData = {
  logo?: { url: string; alt?: string }
  schoolName: string
  navItems?: { id: string; link: PayloadLink }[]
  cta?: { link: PayloadLink }
}

export async function getNavbarData(): Promise<HeaderData> {
  const payload = await getPayload({ config })

  const [settings, header] = await Promise.all([
    getSiteSettings(),
    payload.findGlobal({ slug: 'header', depth: 1 }),
  ])

  return {
    logo: settings.logo ?? undefined,
    schoolName: settings.siteName,
    navItems: settings.navigation,
    cta: (header as unknown as Pick<HeaderData, 'cta'>).cta,
  }
}
