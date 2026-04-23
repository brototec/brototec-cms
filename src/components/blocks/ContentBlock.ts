import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Conteúdo', plural: 'Conteúdos' },
  fields: [
    { name: 'content', type: 'richText', required: true },
  ],
}