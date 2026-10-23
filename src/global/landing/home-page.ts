import type { GlobalConfig } from 'payload'
import { clearPageCache } from '@/lib/revalidate'
import { HeroBlock } from './blocks/hero'
import { FeaturesBlock } from './blocks/features'
import { CurriculumBlock } from './blocks/curriculum'
import { InstructureBlock } from './blocks/Instructure '
import { facilitiesTab } from './facilities'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',

  hooks: {
    afterChange: [
      async ({ doc }) => {
        await clearPageCache('/')
        return doc
      },
    ],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Halaman Beranda',
          description: 'Susun urutan blok (section) untuk halaman beranda',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              blocks: [HeroBlock, FeaturesBlock, CurriculumBlock, InstructureBlock],
            },
          ],
        },
        facilitiesTab,
        // Tab lain untuk pengaturan umum (misal: SEO)
      ],
    },
  ],
}
