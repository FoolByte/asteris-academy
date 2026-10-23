import { FacilitiesSection } from '@/components/landing/facilities'
import { getFacilitiesContents } from '@/lib/payload/collections/landing/facilities-contents'

export default async function Page() {
  const pageData = await getFacilitiesContents()

  // Mencegah error runtime jika Payload belum memiliki data (null)
  if (!pageData) {
    return null
  }

  return (
    <main>
      <FacilitiesSection facilities={pageData.facilities} galleryItems={pageData.galleryItems} />
    </main>
  )
}
