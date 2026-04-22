import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: params.slug },
      status: { equals: 'published' },
    },
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <main>
      <h1>{page.title}</h1>
      {/* blocos serão renderizados aqui na Etapa 4 */}
    </main>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: await config })
  const pages = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 100,
  })
  return pages.docs.map((page) => ({ slug: page.slug }))
}