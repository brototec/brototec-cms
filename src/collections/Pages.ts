import type { CollectionConfig } from 'payload'
// Caminho real baseado na sua árvore de arquivos:
import { HeroBlock } from '../components/blocks/HeroBlock'
import { ContentBlock } from '../components/blocks/ContentBlock'
import { CTABlock } from '../components/blocks/CTABlock'
import { DifferentiationBlock } from '../components/blocks/Differentiation'
import { ConceptBlock } from '../components/blocks/Concept'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'], // Use _status para drafts
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      // Adicionamos os novos blocos da Brototec aqui
      blocks: [
        HeroBlock, 
        ContentBlock, 
        CTABlock, 
        DifferentiationBlock, 
        ConceptBlock
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}