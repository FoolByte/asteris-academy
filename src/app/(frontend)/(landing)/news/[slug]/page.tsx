import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { LivePreviewListener } from './LivePreviewListener'
import { Container } from '@/components/ui/container'

type Args = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? ''

/* ---------- helpers ---------- */

function formatDate(date?: string | null) {
  if (!date) return null
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function formatShortDate(date?: string | null) {
  if (!date) return null
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

// Ambil teks polos dari data Lexical untuk estimasi waktu baca
function lexicalToText(node: any): string {
  if (!node) return ''
  if (node.root) return lexicalToText(node.root)
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(lexicalToText).join(' ')
  return ''
}

function readingTime(content: unknown) {
  const words = lexicalToText(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/* ---------- page ---------- */

export default async function NewsPage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
    depth: 2,
    pagination: false,
    overrideAccess: draft,
  })

  const post = docs[0] as any
  if (!post) notFound()

  // Berita terkait (3 terbaru selain yang sedang dibuka)
  const { docs: related } = await payload.find({
    collection: 'news',
    where: { slug: { not_equals: slug } },
    sort: '-createdAt',
    limit: 3,
    depth: 1,
    draft: false,
  })

  const hero = typeof post.heroImage === 'object' ? post.heroImage : null
  const category = typeof post.category === 'object' && post.category ? post.category : null
  const author = typeof post.author === 'object' && post.author ? post.author : null
  const authorName = author?.name ?? author?.email ?? null
  const publishedAt = post.publishedAt ?? post.createdAt
  const minutes = readingTime(post.content)

  const url = `${SITE_URL}/news/${post.slug}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(url)

  return (
    <Container className="mt-20">
      {draft && <LivePreviewListener />}

      <article className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-neutral-900 hover:underline">
                Beranda
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/news" className="hover:text-neutral-900 hover:underline">
                Berita
              </Link>
            </li>
            {category?.title && (
              <>
                <li aria-hidden>/</li>
                <li className="text-neutral-700">{category.title}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Header */}
        <header>
          {category?.title && (
            <span className="inline-block rounded bg-red-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {category.title}
            </span>
          )}

          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 md:text-xl">
              {post.excerpt}
            </p>
          )}

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200 py-4">
            <div className="text-sm text-neutral-600">
              {authorName && (
                <p>
                  Oleh <span className="font-semibold text-neutral-900">{authorName}</span>
                </p>
              )}
              <p className="mt-0.5">
                {formatDate(publishedAt)} · {minutes} menit baca
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500">Bagikan:</span>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              >
                X
              </a>
            </div>
          </div>
        </header>

        {/* Foto utama */}
        {hero?.url && (
          <figure className="mt-6">
            <img
              src={hero.url}
              alt={hero.alt || post.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
            {(hero.caption || hero.alt) && (
              <figcaption className="mt-2 text-sm italic text-neutral-500">
                {hero.caption || hero.alt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Isi berita */}
        <div className="prose prose-neutral prose-lg mt-8 max-w-none prose-headings:font-bold prose-a:text-red-600 prose-img:rounded-lg">
          <RichText data={post.content} />
        </div>

        {/* Galeri */}
        {post.gallery && post.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 border-l-4 border-red-600 pl-3 text-xl font-bold">Galeri Foto</h2>
            <div className="grid grid-cols-2 gap-4">
              {post.gallery.map((item: any) => {
                const img = typeof item.image === 'object' ? item.image : null
                if (!img?.url) return null
                return (
                  <figure key={item.id}>
                    <img
                      src={img.url}
                      alt={item.caption || ''}
                      className="aspect-4/3 w-full rounded-lg object-cover"
                    />
                    {item.caption && (
                      <figcaption className="mt-1 text-sm text-neutral-500">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              })}
            </div>
          </section>
        )}

        {/* Tag */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-6">
            <span className="text-sm font-semibold">Tag:</span>
            {post.tags.map((tag: any, i: number) => {
              const label = typeof tag === 'object' ? (tag.title ?? tag.name) : tag
              if (!label) return null
              return (
                <span
                  key={tag?.id ?? i}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                >
                  #{label}
                </span>
              )
            })}
          </div>
        )}
      </article>

      {/* Berita terkait */}
      {related.length > 0 && (
        <aside className="mx-auto max-w-5xl pb-16 mt-10">
          <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-bold">Berita Terkait</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item: any) => {
              const thumb = typeof item.heroImage === 'object' ? item.heroImage : null
              return (
                <Link key={item.id} href={`/news/${item.slug}`} className="group block">
                  {thumb?.url && (
                    <img
                      src={thumb.url}
                      alt={thumb.alt || item.title}
                      className="aspect-video w-full rounded-lg object-cover transition group-hover:opacity-90"
                    />
                  )}
                  <p className="mt-2 text-xs text-neutral-500">
                    {formatShortDate(item.publishedAt ?? item.createdAt)}
                  </p>
                  <h3 className="mt-1 font-semibold leading-snug group-hover:text-red-600 group-hover:underline">
                    {item.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </aside>
      )}
    </Container>
  )
}
