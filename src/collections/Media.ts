import { admin, anyone } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: anyone,
    create: admin,
    update: admin,
    delete: admin,
  },

  upload: true,

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
