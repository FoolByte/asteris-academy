import { backgroundColorField } from '@/fields/backgroundColor'
import { iconField } from '@/fields/icon'
import type { Block, Field } from 'payload'
export const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Section',
    plural: 'Features Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Pondasi Pendidikan Berstandar Dunia',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Empat pilar utama yang dirancang untuk mengasah potensi analitis, kreativitas, dan kepemimpinan setiap anak.',
    },
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Lihat Fasilitas Lengkap',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/facilities',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Feature Cards',
      minRows: 4,
      admin: {
        description: 'Tambahkan kartu fitur yang akan tampil di bawah judul utama.',
      },
      defaultValue: [
        {
          iconName: 'graduation-cap',
          backgroundColor: 'bg-blue-200',
          title: 'Kurikulum Cambridge Terintegrasi',
          description:
            'Standar akademik internasional dalam Matematika, Sains, dan Bahasa Inggris yang memicu nalar kritis sejak jenjang menengah pertama.',
        },
        {
          iconName: 'terminal',
          backgroundColor: 'bg-blue-200',
          title: 'Ekosistem Coding & Lab Robotika',
          description:
            'Pembelajaran komputasi nyata mencakup Python, logika algoritma, mikrokontroler IoT, serta prototipe robotika praktis.',
        },
        {
          iconName: 'handshake',
          backgroundColor: 'bg-blue-200',
          title: 'Pembinaan Karakter & Kepemimpinan',
          description:
            'Menginternalisasi etika digital, kepemimpinan kolaboratif, integritas, dan tanggung jawab sosial melalui proyek berbasis komunitas.',
        },
        {
          iconName: 'devices',
          backgroundColor: 'bg-blue-200',
          title: 'Fasilitas Riset & Ruang Cerdas',
          description:
            'Studio sains modern dengan papan interaktif pintar, konektivitas serat optik berkecepatan tinggi, dan perpustakaan digital mandiri.',
        },
      ],
      fields: [
        iconField,

        backgroundColorField,
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
