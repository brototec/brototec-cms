import React from 'react'
// Pega o componente visual do tema (.tsx)
import { HeroBlockComponent } from './HeroBlock'
import { ConceptBlockComponent } from '@/themes/broto-default/components/Concept' 
import { DifferentiationBlockComponent } from '@/themes/broto-default/components/Differentiation'

const blockComponents: any = {
  hero: HeroBlockComponent,
  concept: ConceptBlockComponent,
  differentiation: DifferentiationBlockComponent,
}

export const RenderBlocks = ({ layout }: { layout: any[] }) => {
  if (!layout || !Array.isArray(layout)) return null

  return (
    <>
      {layout.map((block, index) => {
        const Block = blockComponents[block.blockType]
        if (Block) {
          // Passamos o bloco inteiro como prop
          return <Block key={index} {...block} />
        }
        return (
          <div key={index} className="p-4 bg-red-100 text-red-600 border border-red-200">
            Bloco não mapeado: <strong>{block.blockType}</strong>
          </div>
        )
      })}
    </>
  )
}