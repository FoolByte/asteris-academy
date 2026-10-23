import { iconMap } from '@/config/icons'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FeatureCard {
  id: string
  iconName: string
  backgroundColor: string
  title: string
  description: string
}

interface Button {
  label: string
  url: string
}

interface FeaturesSectionProps {
  id?: string
  title: string
  subtitle: string
  cards: FeatureCard[]
  button?: Button
}

export const FeaturesSection = ({ title, subtitle, cards, button }: FeaturesSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <Container>
        <Heading title={title} subtitle={subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards?.map((card) => {
            return (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                iconName={iconMap[card.iconName]}
                backgroundColor={card.backgroundColor}
              />
            )
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Button nativeButton={false} render={<Link href={button?.url ?? '#'} />}>
            {button?.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
