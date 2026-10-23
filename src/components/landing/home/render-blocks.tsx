import { CurriculumSection } from './curriculum-section'
import { FeaturesSection } from './features-section'
import { HeroSection } from './hero-section'
import { InstructureBlock } from './instructure-section'

export function RenderBlocks({ layout }: { layout: any[] }) {
  return (
    <>
      {layout.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={block.id ?? index} {...block} />

          case 'features':
            return <FeaturesSection key={block.id ?? index} {...block} />

          case 'curriculum':
            return <CurriculumSection key={block.id ?? index} {...block} />

          case 'instructure':
            return <InstructureBlock key={block.id ?? index} {...block} />

          default:
            return null
        }
      })}
    </>
  )
}
