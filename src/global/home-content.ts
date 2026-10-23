import { anyone, editor } from '@/access'
import type { GlobalConfig } from 'payload'

export const HomeContent: GlobalConfig = {
  slug: 'home-content',
  label: 'Home Content (Alternative)',

  access: {
    read: anyone,
    update: editor,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        // --- 1. HERO SECTION ---
        {
          label: 'Hero Section',
          description: 'Konten utama di bagian paling atas halaman.',
          fields: [
            {
              name: 'heroHeadline',
              type: 'text',
              required: true,
              admin: { description: 'Contoh: Pendidikan Berkarakter Berbasis Teknologi' },
            },
            {
              name: 'heroSubtext',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroBackgroundMedia',
              type: 'upload',
              relationTo: 'media', // Pastikan Anda memiliki collection 'media'
              admin: { description: 'Upload video drone atau gambar resolusi tinggi' },
            },
            {
              type: 'row',
              fields: [
                { name: 'heroCtaText', type: 'text', defaultValue: 'Portal PPDB', required: true },
                { name: 'heroCtaLink', type: 'text', defaultValue: '/ppdb', required: true },
              ],
            },
          ],
        },

        // --- 2. ABOUT & HISTORY ---
        {
          label: 'About & History',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              required: true,
              defaultValue: 'Jejak Langkah & Visi Kami',
            },
            { name: 'aboutDescription', type: 'richText', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'aboutImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
                {
                  name: 'establishedYear',
                  type: 'number',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            { name: 'vision', type: 'textarea', required: true },
            {
              name: 'missions',
              type: 'array',
              label: 'Misi Sekolah',
              required: true,
              fields: [{ name: 'missionStatement', type: 'text', required: true }],
            },
          ],
        },

        // --- 3. MODERN FEATURES ---
        {
          label: 'Tech Features',
          description:
            'Highlight fasilitas modern sekolah (Misal: Presensi QR Code, CBT, Tabungan Digital)',
          fields: [
            {
              name: 'modernFeatures',
              type: 'array',
              minRows: 3,
              maxRows: 6,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'icon',
                  type: 'text',
                  admin: { description: 'Nama icon lucide-react (ex: QrCode, Laptop, Wallet)' },
                },
              ],
            },
          ],
        },

        // --- 4. STATISTICS ---
        {
          label: 'Statistics',
          description: 'Angka statistik sekolah',
          fields: [
            {
              name: 'schoolStats',
              type: 'array',
              minRows: 3,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '50%', description: 'Ex: Siswa Aktif' },
                    },
                    { name: 'value', type: 'number', required: true, admin: { width: '25%' } },
                    {
                      name: 'suffix',
                      type: 'text',
                      admin: { width: '25%', description: 'Ex: + (hasil: 750+)' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
