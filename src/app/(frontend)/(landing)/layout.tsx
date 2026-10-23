import React from 'react'
import { Metadata } from 'next'
import { PublicHeader } from '@/components/custom/nav/public-header'
import { getNavbarData } from '@/lib/payload/get-navbar-data'
import SiteFooter from '@/components/site-footer'
import { getFooterData } from '@/lib/payload/get-footer-data'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function PublicLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const navbarItems = await getNavbarData()
  const footerItem = await getFooterData()

  return (
    <>
      <PublicHeader header={navbarItems} />
      <main>{children}</main>
      <SiteFooter {...footerItem} />
    </>
  )
}
