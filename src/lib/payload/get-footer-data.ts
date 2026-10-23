import config from '@payload-config'
import { getPayload } from 'payload'
import { getSiteSettings, resolveLinkHref, type PayloadLink } from './get-site-settings'

export type FooterLink = {
  id: string
  label: string
  url: string
}

export type FooterData = {
  logo?: { url: string; alt?: string } | null
  schoolInfo: { name: string; description: string; accreditation: string }
  contactInfo: { address: string; email: string; phone: string }
  communication: {
    description: string
    whatsappUrl?: string | null
    whatsappLabel?: string | null
  }
  bottomBar: { copyright: string; legalLinks: FooterLink[] }
  navigation: FooterLink[]
}

type FooterGlobal = {
  schoolInfo: { description: string; accreditation: string }
  contactInfo: FooterData['contactInfo']
  communication: FooterData['communication']
  bottomBar: {
    copyright?: string | null
    legalLinks?: { id: string; link: PayloadLink }[]
  }
}

const toFooterLink = (item: { id: string; link: PayloadLink }): FooterLink => ({
  id: item.id,
  label: item.link.label,
  url: resolveLinkHref(item.link),
})

export async function getFooterData(): Promise<FooterData> {
  const payload = await getPayload({ config })

  const [settings, footerRaw] = await Promise.all([
    getSiteSettings(),
    payload.findGlobal({ slug: 'footer', depth: 1 }),
  ])
  const footer = footerRaw as unknown as FooterGlobal

  return {
    logo: settings.logo,
    schoolInfo: { name: settings.siteName, ...footer.schoolInfo },
    contactInfo: footer.contactInfo,
    communication: footer.communication,
    bottomBar: {
      copyright:
        footer.bottomBar.copyright ||
        `© ${new Date().getFullYear()} ${settings.siteName}. Hak Cipta Dilindungi.`,
      legalLinks: (footer.bottomBar.legalLinks ?? []).map(toFooterLink),
    },
    navigation: (settings.navigation ?? []).map(toFooterLink),
  }
}
