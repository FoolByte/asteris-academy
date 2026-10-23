import Link from 'next/link'
import Image from 'next/image'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  CheckmarkBadge01Icon,
  Location01Icon,
  Mail01Icon,
  Call02Icon,
  Message01Icon,
} from '@hugeicons/core-free-icons'
import { FooterData } from '@/lib/payload/get-footer-data'

export type SiteFooterProps = FooterData & { className?: string }

/* ---------- Helpers ---------- */

const headingClass = 'text-sm font-semibold uppercase tracking-wide text-foreground'

const linkClass =
  'text-sm text-neutral-600 transition-colors hover:text-foreground ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded-sm'

/** Ambil nomor telepon murni untuk href tel: */
const toTel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

/* ---------- Component ---------- */

export function SiteFooter({
  schoolInfo,
  contactInfo,
  communication,
  bottomBar,
  navigation,
  logo,
  className = '',
}: SiteFooterProps) {
  const whatsappUrl = communication.whatsappUrl || '#'
  const whatsappLabel = communication.whatsappLabel || 'Hubungi Via WhatsApp'

  return (
    <footer
      className={`border-t border-[#e5e5e5] bg-muted text-foreground ${className} mt-6 md:mt-15`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 pt-12 md:px-8 md:pt-16">
        {/* Mobile: 1 kolom (stack) → md: 4 kolom */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_0.6fr_1.2fr_1fr] md:gap-8">
          {/* 1. Brand */}
          <section aria-label={schoolInfo.name} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {logo?.url && (
                <Image
                  src={logo.url}
                  alt={logo.alt ?? ''}
                  width={88}
                  height={32}
                  className="h-8 w-auto shrink-0"
                />
              )}
              <p className="font-serif text-xl font-semibold leading-tight">{schoolInfo.name}</p>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-neutral-600">
              {schoolInfo.description}
            </p>

            <p className="flex items-start gap-2 text-sm text-foreground">
              <HugeiconsIcon
                icon={CheckmarkBadge01Icon}
                size={16}
                className="mt-0.5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              <span>{schoolInfo.accreditation}</span>
            </p>
          </section>

          {/* 2. Navigasi */}
          <nav aria-labelledby="footer-nav-title md:w-/4">
            <h2 id="footer-nav-title" className={headingClass}>
              Navigasi
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link href={item.url} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Pusat Informasi & Layanan */}
          <section aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className={headingClass}>
              Pusat Informasi &amp; Layanan
            </h2>
            <address className="mt-4 flex flex-col gap-3.5 not-italic">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={16}
                  className="mt-0.5 shrink-0 text-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-neutral-600">
                  {contactInfo.address}
                </span>
              </div>

              <a
                href={`mailto:${contactInfo.email}`}
                className={`flex items-start gap-3 ${linkClass}`}
              >
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={16}
                  className="mt-0.5 shrink-0 text-foreground"
                  aria-hidden="true"
                />
                <span className="min-w-0 break-all">{contactInfo.email}</span>
              </a>

              <a href={toTel(contactInfo.phone)} className={`flex items-start gap-3 ${linkClass}`}>
                <HugeiconsIcon
                  icon={Call02Icon}
                  size={16}
                  className="mt-0.5 shrink-0 text-foreground"
                  aria-hidden="true"
                />
                <span>{contactInfo.phone}</span>
              </a>
            </address>
          </section>

          {/* 4. Kanal Komunikasi */}
          <section aria-labelledby="footer-comm-title" className="flex flex-col items-start">
            <h2 id="footer-comm-title" className={headingClass}>
              Kanal Komunikasi
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {communication.description}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <HugeiconsIcon icon={Message01Icon} size={16} aria-hidden="true" />
              {whatsappLabel}
            </a>
          </section>
        </div>

        {/* Bottom bar: stack di mobile → satu baris di md */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#e5e5e5] py-6 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-600">{bottomBar.copyright}</p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {bottomBar.legalLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.url} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
