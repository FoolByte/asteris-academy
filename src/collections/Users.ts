import type { CollectionConfig } from 'payload'
import { admin } from '@/access'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  admin: {
    useAsTitle: 'email',
  },

  access: {
    // Admin bisa membaca semua user. User biasa hanya bisa membaca profilnya sendiri.
    read: (args) => {
      if (admin(args)) return true
      if (!args.req.user) return false

      if (args.id === undefined) {
        return {
          id: {
            equals: args.req.user.id,
          },
        }
      }

      return String(args.req.user.id) === String(args.id)
    },

    // Hanya admin yang boleh membuat user baru.
    create: admin,

    // Admin bisa mengedit semua user. Editor/User hanya bisa mengedit profil sendiri.
    update: (args) => {
      if (admin(args)) return true
      if (!args.req.user) return false

      if (args.id === undefined) {
        return {
          id: {
            equals: args.req.user.id,
          },
        }
      }

      return String(args.req.user.id) === String(args.id)
    },

    // Hanya admin yang boleh menghapus user.
    delete: admin,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil',
      admin: {
        description: 'Upload foto profil pengguna.',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',

      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],

      saveToJWT: true,

      access: {
        update: ({ req: { user }, id, doc }) => {
          const u = user as User | null

          // 1. Cek role secara langsung dari object user
          if (u?.role !== 'admin' && u?.role !== 'super-admin') return false

          const targetId = id ?? doc?.id

          if (targetId === undefined) return true

          // 2. Cegah admin mengubah field role miliknya sendiri
          return String(u?.id) !== String(targetId)
        },
      },
    },
  ],
}
