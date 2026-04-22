import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
        {
          name: 'variant',
          type: 'select',
          options: ['primary', 'secondary', 'outline'],
          defaultValue: 'primary',
        },
      ],
    },
  ],
}