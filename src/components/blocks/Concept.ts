import { Block } from 'payload'

export const ConceptBlock: Block = {
  slug: 'concept',
  fields: [
    { name: 'tagline', type: 'text', defaultValue: 'Para quem é' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'num', type: 'text', label: 'Número (ex: 01)' },
        { name: 'text', type: 'textarea', label: 'Descrição' },
      ],
    },
  ],
}