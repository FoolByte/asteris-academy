import config from '@payload-config'
import { getPayload } from 'payload'

// 1. Tipe untuk Media (Gambar) yang ter-populate karena depth: 1
export type Media = {
  alt: string
  url: string
}

// 2. Tipe untuk Item Galeri Fasilitas
export type GalleryItem = {
  id?: string
  iconName: string
  image: Media | number
  category: string
  title: string
  description: string
}

// 3. Tipe untuk Header Fasilitas
export type FacilitiesInfo = {
  eyebrow: string
  title: string
  subtitle: string
}

// 4. Tipe Kembalian Gabungan
export type FacilitiesContent = {
  facilities: FacilitiesInfo
  galleryItems: GalleryItem[]
}

// 5. Helper Function Utama
export async function getFacilitiesContents(): Promise<FacilitiesContent | null> {
  const payload = await getPayload({ config })

  // findGlobal mengembalikan object dari global 'home-page'
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    depth: 1,
    select: {
      facilities: true,
    },
  })

  // Mengambil object facilities dan array galleryItems dari homePage
  // Sesuaikan penamaan variabel dengan key yang ada di JSON Payload Anda
  const facilities = homePage.facilities as FacilitiesInfo | undefined
  const galleryItems = homePage.facilities.galleryItems as GalleryItem[] | undefined

  if (!facilities || !galleryItems) {
    return null
  }

  return {
    facilities,
    galleryItems,
  }
}
