import type { Field } from 'payload'

type LinkOptions = {
  name?: string
  required?: boolean
  disableLabel?: boolean
}

/**
 * Field link reusable.
 * - anchor   : scroll ke section di halaman yang sama (#kurikulum)
 * - internal : path internal situs (/galeri)
 * - external : URL luar
 * - whatsapp : memakai nomor di SiteSettings + pesan opsional
 */
export const link = ({
  name = 'link',
  required = false,
  disableLabel = false,
}: LinkOptions = {}): Field => {
  const typeField: Field = {
    name: 'type',
    type: 'select',
    defaultValue: 'anchor',
    required,
    admin: { width: disableLabel ? '100%' : '30%' },
    options: [
      { label: 'Anchor (section)', value: 'anchor' },
      { label: 'Halaman internal', value: 'internal' },
      { label: 'URL eksternal', value: 'external' },
      { label: 'WhatsApp', value: 'whatsapp' },
    ],
  }

  const labelField: Field = {
    name: 'label',
    type: 'text',
    localized: true,
    required,
    admin: { width: '70%' },
  }

  return {
    name,
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: disableLabel ? [typeField] : [typeField, labelField],
      },
      {
        name: 'anchor',
        type: 'text',
        required,
        admin: {
          description: 'Tanpa tanda #, contoh: kurikulum',
          condition: (_, siblingData) => siblingData?.type === 'anchor',
        },
      },
      {
        name: 'path',
        type: 'text',
        required,
        admin: {
          description: 'Contoh: /galeri',
          condition: (_, siblingData) => siblingData?.type === 'internal',
        },
      },
      {
        name: 'url',
        type: 'text',
        required,
        admin: {
          description: 'Contoh: https://example.com',
          condition: (_, siblingData) => siblingData?.type === 'external',
        },
      },
      {
        name: 'waMessage',
        type: 'text',
        localized: true,
        admin: {
          description: 'Pesan awal WhatsApp (opsional). Nomor diambil dari Pengaturan Situs.',
          condition: (_, siblingData) => siblingData?.type === 'whatsapp',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Buka di tab baru',
        admin: {
          condition: (_, siblingData) =>
            siblingData?.type === 'external' || siblingData?.type === 'whatsapp',
        },
      },
    ],
  }
}
