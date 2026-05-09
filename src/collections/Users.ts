import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Habilita autenticação
  admin: { useAsTitle: 'email' },
  access: {
    read: () => true,
    // Apenas usuários logados podem criar/editar/deletar
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [],
}