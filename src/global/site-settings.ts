import type { GlobalConfig } from 'payload'
import { admin, anyone } from '../access'
import { link } from '../fields/link'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Umum',
  admin: { group: 'Pengaturan Situs' },
  access: {
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Sekolah',
      required: true,
    },
    {
      name: 'siteName',
      type: 'text',
      label: 'Nama Sekolah / Website',
      required: true,
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Menu navigasi',
      labels: { singular: 'Menu', plural: 'Menu' },
      admin: {
        initCollapsed: true,
        description: 'Dipakai bersama oleh Navbar dan Footer.',
      },
      maxRows: 8,
      fields: [link({ required: true })],
    },
  ],
}
