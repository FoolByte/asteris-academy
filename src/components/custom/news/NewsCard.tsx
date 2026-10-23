import Link from 'next/link'

type NewsCardProps = {
  post: any
}

function formatDate(date?: string | null) {
  if (!date) return null
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function NewsCard({ post }: NewsCardProps) {
  const img = typeof post.heroImage === 'object' && post.heroImage ? post.heroImage : null
  const category = typeof post.category === 'object' && post.category ? post.category : null
  const date = formatDate(post.publishedAt ?? post.createdAt)

  return (
    <article className="h-full">
      <Link
        href={`/news/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        {/* Gambar */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          {img?.url ? (
            <img
              src={img.url}
              alt={img.alt || post.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-12 w-12"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>
            </div>
          )}

          {/* Gradasi tipis agar badge tetap terbaca */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />

          {category?.title && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur">
              {category.title}
            </span>
          )}
        </div>

        {/* Konten */}
        <div className="flex flex-1 flex-col p-5">
          {date && (
            <time
              dateTime={post.publishedAt ?? post.createdAt}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              {date}
            </time>
          )}

          <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-neutral-900">
            Baca selengkapnya
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
