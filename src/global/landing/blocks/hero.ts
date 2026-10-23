import { iconField } from '@/fields/icon'
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',

  labels: {
    singular: 'Hero',
    plural: 'Hero Sections',
  },

  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Pendaftaran Siswa Baru TA 2025/2026 Dibuka',
    },

    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Mempersiapkan Generasi Unggul Berkarakter Global & Berbasis Teknologi.',
    },

    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'SMP Modernisasi Teknologi memadukan kurikulum internasional Cambridge dengan pembelajaran teknologi aplikatif, lab robotika, dan pembinaan karakter berbudi pekerti luhur.',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'imageAlt',
      type: 'text',
      required: true,
    },

    iconField,

    {
      name: 'imageBadge',
      type: 'text',
      defaultValue: 'Lab Robotika & Kecerdasan Buatan',
    },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Daftar Sekarang',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#daftar',
        },
      ],
    },

    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Jadwalkan Kunjungan',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#kunjungan',
        },
      ],
    },

    {
      name: 'trustIndicators',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
