import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Soluções digitais sob medida, da estrutura à autonomia operacional.',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    // Adicione colunas de links e informações de contato conforme o seu JSX original
  ],
}