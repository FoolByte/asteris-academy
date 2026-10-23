import type { GlobalConfig } from 'payload'
import { admin, anyone } from '../access'
import { link } from '../fields/link'

// Nama sekolah & menu navigasi diambil dari `site-settings`.
export const PublicFooter: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Pengaturan Situs' },
  access: {
    read: anyone,
    update: admin,
  },
  fields: [
    {
      name: 'schoolInfo',
      type: 'group',
      label: 'Info Sekolah',
      fields: [
        { name: 'description', type: 'textarea', label: 'Deskripsi', required: true },
        { name: 'accreditation', type: 'text', label: 'Akreditasi', required: true },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Pusat Informasi & Layanan',
      fields: [
        { name: 'address', type: 'textarea', label: 'Alamat', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'phone', type: 'text', label: 'Telepon', required: true },
      ],
    },
    {
      name: 'communication',
      type: 'group',
      label: 'Kanal Komunikasi',
      fields: [
        { name: 'description', type: 'textarea', label: 'Deskripsi', required: true },
        { name: 'whatsappUrl', type: 'text', label: 'URL WhatsApp' },
        { name: 'whatsappLabel', type: 'text', label: 'Label tombol WhatsApp' },
      ],
    },
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Bar Bawah',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Teks hak cipta',
          admin: {
            description: 'Kosongkan untuk teks otomatis dari nama sekolah & tahun berjalan.',
          },
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Link legal',
          maxRows: 5,
          admin: { initCollapsed: true },
          fields: [link({ required: true })],
        },
      ],
    },
  ],
}
