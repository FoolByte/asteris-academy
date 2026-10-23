import type { Field } from 'payload'

export const iconField: Field = {
  name: 'iconName',
  type: 'text',
  required: true,
  admin: {
    description: 'Pilih icon Hugeicons yang akan ditampilkan pada UI',
    components: {
      Field: '@/components/icon-selec.tsx',
    },
  },
}
