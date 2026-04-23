import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    { name: 'tagline', type: 'text', label: 'Tagline' },
    { name: 'title', type: 'text', required: true, label: 'Título Principal' },
    { name: 'highlightedText', type: 'text', label: 'Texto em Destaque (Itálico)' },
    { name: 'description', type: 'textarea', label: 'Descrição/Subtítulo' },
    {
      name: 'links',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'appearance', type: 'select', options: [{ label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }], defaultValue: 'primary' }
      ]
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Imagem/SVG do Hero' },
  ],
}