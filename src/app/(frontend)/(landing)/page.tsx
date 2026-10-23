import { getPayload } from 'payload'
import { getHomeContents } from '@/lib/payload/collections/landing/home-contents'
import { RenderBlocks } from '@/components/landing/home/render-blocks'

// 2592000 detik = 30 hari (1 bulan)
export const revalidate = 2592000

export default async function HomePage() {
  const homeContent = await getHomeContents()

  // Handle ketika belum ada dokumen di collection atau layout kosong
  if (!homeContent || !homeContent.sections || homeContent.sections.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8 bg-background">
        <div className="text-center max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Konten Saat Ini Belum Tersedia</h2>
        </div>
      </main>
    )
  }

  return (
    <main>
      <RenderBlocks layout={homeContent.sections} />
    </main>
  )
}
