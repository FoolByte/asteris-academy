import type { Field } from 'payload'
import { colorOptions } from '@/config/colors' // Sesuaikan path jika berbeda

// Jika dipisah menjadi file sendiri:
export const backgroundColorField: Field = {
  name: 'backgroundColor',
  type: 'select',
  required: true,
  defaultValue: 'bg-blue-200',
  // Ambil opsi label dan value dari file config (tanpa hex) untuk database
  options: colorOptions.map((opt) => ({
    label: opt.label,
    value: opt.value,
  })),
  admin: {
    description: 'Pilih warna latar belakang card',
    components: {
      // Gunakan string path tanpa .tsx
      Field: '@/components/color-select',
    },
  },
}
