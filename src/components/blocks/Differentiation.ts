import { Block } from 'payload'

export const DifferentiationBlock: Block = {
  slug: 'differentiation',
  labels: { singular: 'Diferencial/Estrutura', plural: 'Diferenciais' },
  fields: [
    { name: 'tagline', type: 'text' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'num', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ]
    }
  ],
}