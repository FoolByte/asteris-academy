'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FacilitiesContent } from '@/lib/payload/collections/landing/facilities-contents'
import { HugeiconsIcon } from '@hugeicons/react'
import { iconMap } from '@/config/icons'
import { Badge } from '../ui/badge'
import { Container } from '../ui/container'
import { Heading } from '../ui/heading'

// di luar komponen
const sizeClass = {
  small: '',
  wide: 'sm:col-span-2',
  tall: 'lg:row-span-2',
  large: 'sm:col-span-2 sm:row-span-2',
} as const

const sizePool: (keyof typeof sizeClass)[] = [
  'small',
  'small',
  'small',
  'small',
  'wide',
  'wide',
  'tall',
  'tall',
  'large',
]

function hash(value: string | undefined) {
  let h = 2166136261

  for (const c of String(value)) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }

  return h >>> 0
}

// di luar komponen
const LARGE = 'sm:col-span-2 sm:row-span-2'
const WIDE = 'sm:col-span-2'

function getLayout(index: number, total: number) {
  const blockStart = Math.floor(index / 4) * 4
  const remaining = total - blockStart // item tersisa mulai dari blok ini
  const pos = index % 4
  const isEvenBlock = Math.floor(index / 4) % 2 === 0

  // Blok terakhir yang tidak penuh: isi satu baris penuh
  if (remaining === 1) return { span: 'sm:col-span-2 lg:col-span-4', featured: true }
  if (remaining === 2) return { span: 'lg:col-span-2', featured: true }
  if (remaining === 3) return { span: pos === 0 ? WIDE : '', featured: pos === 0 }

  // Blok penuh (4 item)
  const pattern = isEvenBlock ? [LARGE, WIDE, '', ''] : [WIDE, LARGE, '', '']
  const span = pattern[pos]
  return { span, featured: span === LARGE }
}

export function FacilitiesSection({ facilities, galleryItems }: FacilitiesContent) {
  const [activeFilter, setActiveFilter] = useState<string>('Semua Fasilitas')

  const categories = [
    'Semua Fasilitas',
    ...Array.from(new Set(galleryItems?.map((item) => item.category) || [])),
  ]

  const filteredItems = galleryItems?.filter((item) => {
    if (activeFilter === 'Semua Fasilitas') return true
    return item.category === activeFilter
  })

  return (
    <section>
      <Container className="mt-20">
        <Heading
          eyebrow={facilities.eyebrow}
          title={facilities.title}
          subtitle={facilities.subtitle}
        />

        {/* --- FILTER BUTTONS --- */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* --- GALLERY GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-60 gap-4">
          {filteredItems?.map((item, index) => {
            const imageObj = item.image as any
            const imageUrl = imageObj?.url
            const imageAlt = imageObj?.alt || item.title
            const Icon = iconMap[item.iconName]

            function getBentoSize(id: string | undefined) {
              return sizePool[hash(id) % sizePool.length]
            }

            const size = getBentoSize(item.id)
            const { span, featured: isLarge } = getLayout(index, filteredItems.length)

            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm
                    transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${span}`}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent
                        opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Badge kategori (glass) */}
                <Badge
                  className="absolute top-4 left-4 gap-2 rounded-full border border-white/30 bg-black/55
                  px-3 py-1.5 text-sm font-medium text-white shadow-lg backdrop-blur-md"
                >
                  {Icon && <HugeiconsIcon icon={Icon} strokeWidth={2} className="size-4" />}
                  {item.category}
                </Badge>

                {/* Nomor urut dekoratif */}
                <span
                  className="absolute top-3 right-5 font-serif text-5xl font-bold text-white/20
                         transition-colors duration-500 group-hover:text-white/50"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Konten */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3
                    className={`font-serif font-bold text-white leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.65)]
                        ${isLarge ? 'text-2xl' : 'text-3xl'}`}
                  >
                    {item.title}
                  </h3>

                  {item.description && (
                    <p
                      className={`mt-2 text-sm leading-relaxed text-white/80
                          transition-all duration-500
                          lg:max-h-0 lg:translate-y-2 lg:opacity-0
                          lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100
                          ${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}
                    >
                      {item.description}
                    </p>
                  )}

                  {/* Garis aksen */}
                  <div className="mt-4 h-0.5 w-8 rounded-full bg-white/60 transition-all duration-500 group-hover:w-20" />
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
