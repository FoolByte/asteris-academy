import { iconField } from '@/fields/icon'
import type { Block } from 'payload'

export const InstructureBlock: Block = {
  slug: 'instructure', // Sesuai permintaan Anda
  labels: {
    singular: 'Instructor Section',
    plural: 'Instructor Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'DEDIKASI & KEUNGGULAN AKADEMIK',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Dibimbing Langsung oleh Pendidik Berstandar Cambridge & Praktisi Teknologi',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Para pendidik bersertifikasi internasional yang menggabungkan kedalaman nalar sains, penguasaan bahasa global, serta etika rekayasa teknologi modern dengan rasio personal 1:12.',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Instructor Cards',
      minRows: 3,
      admin: {
        description: 'Tambahkan kartu profil instruktur/pengajar',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Pastikan collection media Anda bernama 'media'
          required: true,
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: { description: 'Contoh: Cambridge Mathematics & CT Lead' },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'qualifications',
          type: 'textarea',
          required: true,
          admin: { description: 'Gelar dan sertifikasi' },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Bottom Highlights',
      minRows: 3,
      maxRows: 3,
      fields: [
        iconField,
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
