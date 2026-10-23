import type { Access, CollectionConfig, FieldHook } from 'payload'
import { admin, anyone, editor } from '@/access'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const formatSlug = (val: string): string =>
  val
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const slugHook: FieldHook = ({ value, data, operation }) => {
  if (typeof value === 'string' && value.length > 0) return formatSlug(value)
  if (operation === 'create' || !value) {
    if (data?.title) return formatSlug(data.title)
  }
  return value
}

// Ambil semua teks dari struktur Lexical untuk hitung waktu baca
const extractText = (node: any): string => {
  if (!node) return ''
  let text = typeof node.text === 'string' ? node.text + ' ' : ''
  if (Array.isArray(node.children)) {
    text += node.children.map(extractText).join('')
  }
  if (node.root) text += extractText(node.root)
  return text
}

const buildPreviewURL = (data: Record<string, any> | null | undefined): string => {
  const slug = data?.slug
  if (!slug) return `${SERVER_URL}/news`
  const params = new URLSearchParams({
    slug,
    collection: 'news',
    path: `/news/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })
  return `${SERVER_URL}/next/preview?${params.toString()}`
}

/* -------------------------------------------------------------------------- */
/*                                   Access                                   */
/* -------------------------------------------------------------------------- */

// Publik hanya bisa melihat berita yang sudah published.
// Admin/editor bisa melihat semuanya (termasuk draft).
const readAccess: Access = ({ req }) => {
  if (req.user?.role === 'admin' || req.user?.role === 'editor') return true
  return { _status: { equals: 'published' } }
}

/* -------------------------------------------------------------------------- */
/*                                 Collection                                 */
/* -------------------------------------------------------------------------- */

export const News: CollectionConfig = {
  slug: 'news',

  labels: {
    singular: 'Berita',
    plural: 'Berita',
  },

  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },

  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'featured', '_status', 'publishedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    description: 'Kelola berita, artikel, dan pengumuman.',

    // Live Preview (panel di samping editor, update real-time saat mengetik)
    livePreview: {
      url: ({ data }) => buildPreviewURL(data),
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },

    // Tombol "Preview" (buka tab baru)
    preview: (doc) => buildPreviewURL(doc),
  },

  // Draft, autosave, jadwal publish, dan riwayat versi
  versions: {
    maxPerDoc: 25,
    drafts: {
      autosave: { interval: 800 },
      schedulePublish: true,
    },
  },

  defaultSort: '-publishedAt',

  timestamps: true,

  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ------------------------------- Konten ------------------------------ */
        {
          label: 'Konten',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Judul',
              required: true,
              maxLength: 150,
              admin: { description: 'Judul berita yang menarik, maksimal 150 karakter.' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Ringkasan',
              maxLength: 300,
              admin: {
                description:
                  'Ringkasan singkat untuk kartu berita & hasil pencarian (maks. 300 karakter).',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Gambar Utama',
              admin: { description: 'Rekomendasi rasio 16:9, minimal 1200x675.' },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Isi Berita',
              required: true,
            },
          ],
        },

        /* ------------------------------- Detail ------------------------------ */
        {
          label: 'Detail',
          fields: [
            {
              name: 'category',
              type: 'select',
              label: 'Kategori',
              required: true,
              defaultValue: 'umum',
              options: [
                { label: 'Umum', value: 'umum' },
                { label: 'Pengumuman', value: 'pengumuman' },
                { label: 'Kegiatan', value: 'kegiatan' },
                { label: 'Prestasi', value: 'prestasi' },
                { label: 'Akademik', value: 'akademik' },
                { label: 'Event', value: 'event' },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tag',
              labels: { singular: 'Tag', plural: 'Tag' },
              admin: { initCollapsed: false },
              fields: [{ name: 'tag', type: 'text', label: 'Tag', required: true }],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galeri Foto',
              labels: { singular: 'Foto', plural: 'Foto' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', label: 'Keterangan' },
              ],
            },
            {
              name: 'relatedNews',
              type: 'relationship',
              relationTo: 'news',
              hasMany: true,
              label: 'Berita Terkait',
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
          ],
        },

        /* --------------------------------- SEO -------------------------------- */
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Meta Title',
              maxLength: 60,
              admin: { description: 'Kosongkan untuk memakai judul berita. Ideal ≤ 60 karakter.' },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
              maxLength: 160,
              admin: { description: 'Ideal 120–160 karakter.' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Gambar Share (OG Image)',
              admin: { description: 'Kosongkan untuk memakai gambar utama.' },
            },
          ],
        },
      ],
    },

    /* ------------------------------- Sidebar -------------------------------- */
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Otomatis dari judul, bisa diubah manual.',
      },
      hooks: { beforeValidate: [slugHook] },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Terbit',
      index: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Otomatis terisi saat dipublikasikan.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData?._status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Penulis',
      defaultValue: ({ user }) => user?.id,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Berita Unggulan',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Tampilkan di bagian utama beranda.',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Waktu Baca (menit)',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Dihitung otomatis dari isi berita.',
      },
    },
    {
      name: 'views',
      type: 'number',
      label: 'Jumlah Dilihat',
      defaultValue: 0,
      admin: { position: 'sidebar', readOnly: true },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.content) {
          const words = extractText(data.content).trim().split(/\s+/).filter(Boolean).length
          data.readingTime = Math.max(1, Math.ceil(words / 200))
        }
        return data
      },
    ],

    // Refresh cache halaman Next.js setelah berita dipublikasikan / diubah
    afterChange: [
      async ({ doc, previousDoc, req: { payload, context } }) => {
        if (context?.disableRevalidate) return doc
        try {
          const { revalidatePath } = await import('next/cache')
          if (doc._status === 'published') {
            revalidatePath(`/news/${doc.slug}`)
            revalidatePath('/news')
            revalidatePath('/')
          }
          // Jika di-unpublish atau slug berubah, bersihkan cache lama
          if (previousDoc?._status === 'published' && doc._status !== 'published') {
            revalidatePath(`/news/${previousDoc.slug}`)
            revalidatePath('/news')
          }
          if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
            revalidatePath(`/news/${previousDoc.slug}`)
          }
        } catch (err) {
          payload.logger.warn(`Revalidate news gagal: ${(err as Error).message}`)
        }
        return doc
      },
    ],
  },
}
