import { cookies, draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getPageBySlug(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config })

  // Se não estiver em modo draft, busca normalmente (apenas publicados)
  if (!isDraft) {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      draft: false,
    })
    return result.docs[0] || null
  }

  // Em draft: obtém o token do cookie e faz chamada REST autenticada
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    // Sem token, não pode acessar rascunhos - retorna página publicada ou null
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      draft: false,
    })
    return result.docs[0] || null
  }

  // Busca via REST API com draft=true e o token no cookie
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const res = await fetch(
    `${baseUrl}/api/pages?where[slug][equals]=${slug}&depth=2&draft=true`,
    {
      headers: { Cookie: `payload-token=${token}` },
      // Opcional: cache com tag para futura revalidação
      next: { tags: ['pages'] },
    }
  )

  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}