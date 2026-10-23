import { RoboticIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { iconMap } from '@/config/icons'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

type HeroSectionProps = {
  eyebrow?: string
  title: string
  description?: string

  image: {
    url?: string | null
    alt?: string | null
  }

  imageAlt?: string
  iconName?: string
  imageBadge?: string

  primaryButton?: {
    label?: string
    url?: string
  }

  secondaryButton?: {
    label?: string
    url?: string
  }

  trustIndicators?: {
    text: string
  }[]
}

export function HeroSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  iconName,
  imageBadge,
  primaryButton,
  secondaryButton,
  trustIndicators,
}: HeroSectionProps) {
  const iconObject = iconName ? iconMap[iconName as string] : RoboticIcon
  return (
    <section>
      <Container className="pt-20 md:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Content */}
          <div className="flex flex-col items-start lg:col-span-6">
            {/* Eyebrow */}
            {eyebrow && (
              <Badge variant="outline" className="text-xs md:text-lg p-3 mb-3">
                {eyebrow}
              </Badge>
            )}

            {/* Heading */}
            <h1 className="mb-3 md:mb-6 text-2xl font-semibold leading-[1.42] md:leading-[1.12] tracking-[-0.02em] text-foreground md:text-[60px]">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="mb-8 max-w-135 text-md md:text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            {/* CTA */}
            {(primaryButton || secondaryButton) && (
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                {primaryButton?.label && primaryButton.url && (
                  <Link
                    href={primaryButton.url}
                    className="inline-flex h-13.5 items-center justify-center rounded-full bg-primary px-8 text-[16px] font-medium text-primary-foreground transition-colors hover:bg-neutral-800"
                  >
                    {primaryButton.label}
                  </Link>
                )}

                {secondaryButton?.label && secondaryButton.url && (
                  <Link
                    href={secondaryButton.url}
                    className="inline-flex h-13.5 items-center justify-center rounded-full border border-primary bg-transparent px-8 text-[16px] font-medium text-foreground transition-colors hover:bg-surface-container-low"
                  >
                    {secondaryButton.label}
                  </Link>
                )}
              </div>
            )}

            {/* Trust Indicators */}
            {trustIndicators && trustIndicators.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <span className="text-foreground">✓</span>
                    <span>{item.text}</span>

                    {index < trustIndicators.length - 1 && (
                      <span className="ml-2 text-border">•</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="flex justify-center lg:col-span-6">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[16px] border border-border bg-surface-container-low lg:aspect-5/4">
              {image?.url && (
                <img
                  src={image.url}
                  alt={imageAlt ?? image.alt ?? ''}
                  draggable={false}
                  className="h-full w-full object-cover object-center"
                />
              )}

              {/* Image Badge */}
              {imageBadge && (
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-primary-foreground shadow-sm">
                    <HugeiconsIcon icon={iconObject} size={24} />
                    <span>{imageBadge}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
