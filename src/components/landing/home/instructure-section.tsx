import React from 'react'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { HugeiconsIcon } from '@hugeicons/react'
import { iconMap } from '@/config/icons'

type Media = { url: string; alt?: string }

type InstructorCard = {
  id: string
  image: Media
  tag: string
  name: string
  qualifications: string
  description: string
}
type Highlight = { id: string; iconName: string; text: string }

interface InstructureBlockProps {
  eyebrow: string
  title: string
  subtitle: string
  cards: InstructorCard[]
  highlights: Highlight[]
}

export const InstructureBlock: React.FC<InstructureBlockProps> = ({
  eyebrow,
  title,
  subtitle,
  cards,
  highlights,
}) => {
  return (
    <section>
      <Container className="pt-20">
        <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards?.map((card, index) => (
            <Card
              key={card.id || index}
              image={card.image}
              tag={card.tag}
              title={card.name}
              qualifications={card.qualifications}
              description={card.description}
            />
          ))}
        </div>

        {/* Bottom Highlights */}
        {highlights && highlights.length > 0 && (
          <div className="border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {highlights.map((highlight, index) => {
              const Icon = iconMap[highlight.iconName]
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 flex-1 md:first:pl-0 last:pr-0 pb-4 md:pb-0 md:mx-3 first:pt-0"
                >
                  {Icon ? (
                    <HugeiconsIcon icon={Icon} size={40} />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  )}
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {highlight.text}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
