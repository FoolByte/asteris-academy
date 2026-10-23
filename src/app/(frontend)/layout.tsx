import React from 'react'
import '@/app/(frontend)/styles.css'
import { Metadata } from 'next'
import { PublicHeader } from '@/components/custom/nav/public-header'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
