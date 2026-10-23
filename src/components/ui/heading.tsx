import { Badge } from './badge'

type HeadingProps = {
  eyebrow?: string
  title: string
  subtitle: string
}

export const Heading = ({ eyebrow, title, subtitle }: HeadingProps) => {
  return (
    <div className="mx-auto max-w-3xl text-center mb-8 md:mb-10 space-y-2 md:space-y-4">
      <span className="text-sm md:text-lg font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
      <p className="text-xs md:text-xl text-muted-foreground leading-relaxed">{subtitle}</p>
    </div>
  )
}
