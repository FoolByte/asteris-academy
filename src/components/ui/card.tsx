import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Badge } from './badge'
import Image from 'next/image'

type Media = {
  url?: string
  alt?: string
  [key: string]: any
}

type CardProps = {
  key: string | number
  title: string
  description: string
  image?: string | Media | null
  iconName?: IconSvgElement
  backgroundColor?: string
  eyebrow?: string
  tag?: string
  qualifications?: string
  className?: string
}

export const Card = ({
  title,
  description,
  image,
  iconName,
  backgroundColor,
  eyebrow,
  tag,
  qualifications,
  className,
}: CardProps) => {
  const imageSrc = typeof image === 'object' && image !== null ? image.url : image
  const imageAlt = typeof image === 'object' && image !== null && image.alt ? image.alt : title

  return (
    <div
      className={`flex flex-col items-start p-4 rounded-3xl shadow-sm border border-border bg-white transition-all hover:shadow-md ${className}`}
    >
      {imageSrc && (
        <div className="relative w-full aspect-3/4 mb-5 rounded-2xl overflow-hidden bg-muted">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-top" />
        </div>
      )}

      <div className="flex flex-col grow w-full">
        {iconName && (
          <div
            className={`p-3 w-fit text-primary rounded-xl mb-5 flex items-center justify-center ${backgroundColor}`}
          >
            <HugeiconsIcon icon={iconName} size={24} />
          </div>
        )}

        {eyebrow && <Badge className="mb-3">{eyebrow}</Badge>}

        {tag && (
          <span className="inline-block bg-muted text-muted-foreground text-[10px] font-medium px-3 py-1 rounded-full mb-4 w-max">
            {tag}
          </span>
        )}

        <h3 className={`text-xl font-bold mb-2 text-foreground ${tag ? 'font-serif' : ''}`}>
          {title}
        </h3>

        {qualifications && (
          <p className="text-xs font-semibold text-foreground/80 mb-4 leading-relaxed">
            {qualifications}
          </p>
        )}

        <p className="text-muted-foreground text-sm leading-relaxed mt-auto">{description}</p>
      </div>
    </div>
  )
}
