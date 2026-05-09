import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../components/blocks/HeroBlock'
import { ContentBlock } from '../components/blocks/ContentBlock'
import { CTABlock } from '../components/blocks/CTABlock'
import { DifferentiationBlock } from '../components/blocks/Differentiation'
import { ConceptBlock } from '../components/blocks/Concept'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true, // Essencial para o Preview funcionar
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc, { locale, token }) => {
      const slug = doc?.slug || 'home'
      const secret = process.env.PAYLOAD_PREVIEW_SECRET || ''
      
      // Monta a URL do endpoint de preview com todos os parâmetros necessários
      // encodeURIComponent garante que o secret não quebre a query string
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/preview?secret=${encodeURIComponent(secret)}&slug=${slug}&locale=${locale ?? 'pt'}&token=${token}`
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
      blocks: [
        HeroBlock,
        ContentBlock,
        CTABlock,
        DifferentiationBlock,
        ConceptBlock,
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