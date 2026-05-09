import { cookies, draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configLoader from '@/payload.config'

export async function getPageBySlug(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  const config = await configLoader
  const payload = await getPayload({ config })

  if (!isDraft) {
    const result = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
        ],
      },
      draft: false,
    })
  return result.docs[0] || null
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      draft: false,
    })
    return result.docs[0] || null
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const res = await fetch(
    `${baseUrl}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&draft=true`,
    {
      headers: { Cookie: `payload-token=${token}` },
      next: { tags: ['pages'] },
    }
  )

  if (!res.ok) return null
  const data = await res.json()
  return data.docs[0] || null
}