import { iconField } from '@/fields/icon'
import type { Tab } from 'payload'

export const defaultGalleryItems = [
  {
    id: 'gallery-1', // 👈 Tambahkan ID unik di sini
    category: 'Teknologi Terapan',
    title: 'Robotics & IoT Prototyping Maker Lab',
    description:
      'Dilengkapi stasiun kerja mikrokontroler, mesin 3D printing presisi tinggi, dan workstation coding siswa.',
  },
  {
    id: 'gallery-2', // 👈 Tambahkan ID unik di sini
    category: 'Sains & Riset',
    title: 'Cambridge Science & Inquiry Laboratory',
    description:
      'Stasiun praktikum sains basah & fisika eksperimental berstandar Cambridge Assessment International.',
  },
  {
    id: 'gallery-3', // 👈 Tambahkan ID unik di sini
    category: 'Literasi Digital',
    title: 'Digital Learning Commons & Library',
    description:
      'Ruang temu literasi modern dengan akses ribuan jurnal internasional, katalog e-book, dan area kolaborasi hening.',
  },
  {
    id: 'gallery-5', // 👈 Tambahkan ID unik di sini
    category: 'Kebugaran & Karakter',
    title: 'Multipurpose Sports Hall & Amphitheater',
    description:
      'Gedung olahraga indoor dengan lantai kayu parket berstandar dan ruang pementasan seni akustik kayu.',
  },
]

export const facilitiesTab: Tab = {
  label: 'Halaman Fasilitas',
  description: 'Konten Galeri Fasilitas dan Filtering',

  fields: [
    {
      name: 'facilities',
      type: 'group',
      label: 'Facilities Section',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Label',
          required: true,
          defaultValue: 'LINGKUNGAN BELAJAR MASA DEPAN',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Judul Utama',
          required: true,
          defaultValue: 'Fasilitas Berstandar Global untuk Eksplorasi Tanpa Batas',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Deskripsi Singkat',
          required: true,

          defaultValue:
            'Dirancang secara cermat untuk merangsang rasa ingin tahu, kolaborasi riset sains, eksperimen teknologi terapan, dan kebugaran fisik siswa.',
        },
        {
          name: 'galleryItems',
          type: 'array',
          label: 'Daftar Galeri Fasilitas',
          minRows: 4,
          defaultValue: () => defaultGalleryItems,
          fields: [
            iconField,
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Gambar Fasilitas',
            },
            {
              name: 'category',
              type: 'text',
              label: 'Kategori',
              required: true,
              admin: {
                description: 'Contoh: Lab Sains & IoT, Digital Library, Olahraga & Seni',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Nama Fasilitas',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Deskripsi Fasilitas',
            },
          ],
        },
      ],
    },
  ],
}
