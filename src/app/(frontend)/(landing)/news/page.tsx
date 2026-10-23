import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Container } from '@/components/ui/container'
import { NewsCard } from '@/components/custom/news/NewsCard'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 9

type Args = { searchParams: Promise<{ page?: string }> }

export default async function NewsListPage({ searchParams }: Args) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const payload = await getPayload({ config })
  const { docs, totalPages, hasPrevPage, hasNextPage } = await payload.find({
    collection: 'news',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: PAGE_SIZE,
    page,
    depth: 1,
  })

  return (
    <section>
      <Container className="mt-20">
        {/* Header */}
        <header className="mx-auto mb-5 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            Berita
          </h1>
          <p className="text-base text-neutral-600 md:text-lg">
            Kabar dan informasi terbaru seputar kegiatan sekolah.
          </p>
        </header>

        {/* Grid kartu */}
        {docs.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {docs.map((post) => (
              <li key={post.id}>
                <NewsCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 py-20 text-center text-neutral-500">
            Belum ada berita.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {hasPrevPage ? (
              <Link
                href={`/news?page=${page - 1}`}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                ← Sebelumnya
              </Link>
            ) : (
              <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-400">
                ← Sebelumnya
              </span>
            )}

            <span className="px-3 text-sm text-neutral-600">
              Halaman {page} dari {totalPages}
            </span>

            {hasNextPage ? (
              <Link
                href={`/news?page=${page + 1}`}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                Berikutnya →
              </Link>
            ) : (
              <span className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-400">
                Berikutnya →
              </span>
            )}
          </nav>
        )}
      </Container>
    </section>
  )
}
