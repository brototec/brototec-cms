import { HeroBlockComponent } from './components/HeroBlock'
import { ContentBlockComponent } from './components/ContentBlock'
import { CTABlockComponent } from './components/CTABlock'

export const theme = {
  name: 'broto-default',
  blocks: {
    hero: HeroBlockComponent,
    content: ContentBlockComponent,
    cta: CTABlockComponent,
  },
}