import { backgroundColorField } from '@/fields/backgroundColor'
import { iconField } from '@/fields/icon'
import type { Block } from 'payload'
export const CurriculumBlock: Block = {
  slug: 'curriculum',
  labels: {
    singular: 'Curriculum Section',
    plural: 'Curriculum Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Akademik & Karakter Berkelanjutan',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Kurikulum Terpadu: Cambridge Lower Secondary & Kurikulum Merdeka',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Mengintegrasikan kedalaman sains, matematika terapan, dan kefasihan bahasa Inggris Cambridge dengan fleksibilitas eksplorasi minat siswa dan proyek penguatan profil pelajar Pancasila.',
    },
    {
      name: 'cardsGrade',
      type: 'array',
      label: 'Fase & Jenjang Belajar',
      minRows: 3,
      admin: {
        description: 'Tambahkan kartu Kurikulum per Tingkat Kelas.',
      },
      defaultValue: [
        {
          eyebrow: 'Kelas VII',
          title: 'Foundation & Exploration',
          description:
            'Penguatan fondasi English academic fluency, Cambridge Checkpoint Science & Math, serta logika pemrograman dasar (Python & Algoritma).',
        },
        {
          eyebrow: 'Kelas VIII',
          title: 'Inquiry & Applied Innovation',
          description:
            'Pendalaman riset analitis, pemecahan masalah multidisiplin, integrasi IoT sederhana, dan proyek sosial kolaboratif.',
        },
        {
          eyebrow: 'Kelas IV',
          title: 'Mastery & Global Readiness',
          description:
            'Persiapan sertifikasi resmi Cambridge Lower Secondary Checkpoint, Capstone Project teknologi terapan, dan pemantapan portofolio ke SMA unggulan global.',
        },
      ],
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'cardsHighlights',
      type: 'array',
      label: 'Metode & Pendekatan',
      minRows: 3,
      dbName: 'curr_hl',
      admin: {
        description: 'Tambahkan kartu fitur keunggulan metode pengajaran yang diterapkan.',
      },
      defaultValue: [
        {
          iconName: 'graduation-cap',
          backgroundColor: 'bg-blue-200',
          title: 'Dual Language Immersion',
          description:
            'Instruksi sains dan matematika dalam Bahasa Inggris penuh guna membentuk kepercayaan diri akademis siswa di kancah internasional.',
        },
        {
          iconName: 'terminal',
          backgroundColor: 'bg-blue-200',
          title: 'Sains Berbasis Inkuiri Terbuka',
          description:
            'Laboratorium eksperimental yang mendorong siswa berhipotesis, melakukan observasi empiris, dan membedah fenomena nyata.',
        },
        {
          iconName: 'handshake',
          backgroundColor: 'bg-blue-200',
          title: 'Asesmen Diagnostik Personal',
          description:
            'Evaluasi berkala yang melacak lintasan kemajuan individual siswa tanpa membandingkan secara sempit dengan peringkat kelompok.',
        },
      ],
      fields: [
        iconField,

        backgroundColorField,
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
