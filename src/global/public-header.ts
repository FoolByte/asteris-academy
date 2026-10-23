import type { GlobalConfig } from 'payload'
import { admin, anyone } from '../access'
import { link } from '../fields/link'

export const PublicHeader: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Pengaturan Situs' },
  access: {
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: 'cta',
      type: 'group',
      label: 'Tombol CTA',
      fields: [link({ name: 'link' })],
    },
  ],
}
