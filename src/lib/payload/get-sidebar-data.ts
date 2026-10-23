import config from '@payload-config'
import { getPayload } from 'payload'

export type SidebarItem = {
  slug: string
  label: string
  type: 'collection' | 'global'
  group: string
  url: string
}

// Tambahkan tipe baru untuk data yang sudah dikelompokkan
export type SidebarGroup = {
  groupLabel: string
  items: SidebarItem[]
}

export async function getSidebarData(): Promise<SidebarGroup[]> {
  const payload = await getPayload({ config })

  // 1. Ambil Collections
  const collections: SidebarItem[] = payload.config.collections
    .filter((collection) => !collection.admin?.hidden)
    .map((collection) => {
      const group = collection.admin?.group
      const label =
        typeof collection.labels?.plural === 'string' ? collection.labels.plural : collection.slug

      return {
        slug: collection.slug,
        label,
        type: 'collection',
        group: typeof group === 'string' ? group : 'Collections', // Disesuaikan dengan gambar
        url: `/dashboard/${collection.slug}`,
      }
    })

  // 2. Ambil Globals
  const globals: SidebarItem[] = payload.config.globals
    .filter((global) => !global.admin?.hidden)
    .map((global) => {
      const group = global.admin?.group
      const label = typeof global.label === 'string' ? global.label : global.slug

      return {
        slug: global.slug,
        label,
        type: 'global',
        group: typeof group === 'string' ? group : 'Globals', // Disesuaikan dengan gambar
        url: `/dashboard/${global.slug}`,
      }
    })

  // 3. Gabungkan semua item
  const allItems = [...collections, ...globals]

  // 4. Kelompokkan data berdasarkan properti 'group'
  const groupedData = allItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = []
      }
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, SidebarItem[]>,
  )

  // 5. Kembalikan dalam format array of groups
  return Object.entries(groupedData).map(([groupLabel, items]) => ({
    groupLabel,
    items,
  }))
}
