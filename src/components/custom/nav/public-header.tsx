'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderData, PayloadLink } from '@/lib/payload/get-navbar-data'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons'

type HeaderProps = {
  header: HeaderData
}

// Fungsi pembantu untuk menentukan href berdasarkan tipe link
const getLinkUrl = (link?: PayloadLink) => {
  if (!link) return '#'
  if (link.type === 'internal' && link.path) return link.path
  if (link.type === 'custom' && link.url) return link.url
  if (link.type === 'anchor' && link.anchor) return `#${link.anchor.replace(/^#/, '')}`
  return '#'
}

export const PublicHeader = ({ header }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false)
        setOpen(false) // Tutup menu mobile saat di-scroll
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b flex h-16 shrink-0 items-center transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between w-full px-4 mx-auto max-w-7xl">
        {/* Logo & Nama Sekolah */}
        <div className="flex items-center gap-3">
          {header?.logo?.url && (
            <Image
              src={header.logo.url}
              alt={header.logo.alt || header.schoolName}
              width={40}
              height={40}
              className="object-contain w-10 h-10"
              draggable={false}
            />
          )}
          <span className="font-bold text-lg md:text-xl">{header?.schoolName}</span>
        </div>

        {/* 1. Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {header?.navItems?.map((item) => {
            const href = getLinkUrl(item.link)
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

            return (
              <Link
                key={item.id}
                href={href}
                target={item.link.newTab ? '_blank' : '_self'}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 underline-offset-4
                  ${
                    isActive ? 'text-foreground underline' : 'text-muted-foreground hover:underline'
                  }
                `}
              >
                {item.link.label}
              </Link>
            )
          })}
        </nav>

        {/* Tombol CTA (Desktop) & Hamburger Menu (Mobile) */}
        <div className="flex items-center gap-2">
          {header?.cta?.link && (
            <div className="hidden md:block">
              <Button nativeButton={false} render={<Link href={getLinkUrl(header.cta.link)} />}>
                {header.cta.link.label}
              </Button>
            </div>
          )}

          <button
            className="md:hidden p-2 text-foreground focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={open}
          >
            <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Wrapper */}
      <div
        id="mobile-nav"
        inert={!open ? true : undefined}
        className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 border-t border-b bg-background px-4 py-4 shadow-lg sm:px-6">
            {/* 2. Menu Navigasi Mobile (Datanya didapatkan persis sama seperti Desktop) */}
            {header?.navItems?.map((item) => {
              const href = getLinkUrl(item.link)
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

              return (
                <Link
                  key={item.id}
                  href={href}
                  target={item.link.newTab ? '_blank' : '_self'}
                  onClick={() => setOpen(false)} // Tutup menu saat link diklik
                  className={`
                    block px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? 'bg-secondary text-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }
                  `}
                >
                  {item.link.label}
                </Link>
              )
            })}

            {/* Tombol CTA di Mobile */}
            {header?.cta?.link && (
              <div className="pt-2 mt-2 border-t">
                <Button
                  nativeButton={false}
                  className="w-full"
                  onClick={() => setOpen(false)}
                  render={<Link href={getLinkUrl(header.cta.link)} />}
                >
                  {header.cta.link.label}
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
