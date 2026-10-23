import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { iconMap } from '@/config/icons'

interface cardsGradeItems {
  eyebrow: string
  title: string
  description: string
}

interface cardsHighlightsItems {
  id: string
  iconName: string
  backgroundColor: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  id?: string
  eyebrow?: string
  title: string
  subtitle: string
  cardsGrade: cardsGradeItems[]
  cardsHighlights: cardsHighlightsItems[]
}

export const CurriculumSection = ({
  eyebrow,
  title,
  subtitle,
  cardsGrade,
  cardsHighlights,
}: FeaturesSectionProps) => {
  return (
    <section>
      <Container>
        <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cardsGrade?.map((card, index) => (
            <Card
              key={index}
              eyebrow={card.eyebrow}
              title={card.title}
              description={card.description}
              className="bg-muted/80 hover:bg-muted/50"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardsHighlights?.map((card) => {
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
      </Container>
    </section>
  )
}
