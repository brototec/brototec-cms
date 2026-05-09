import { notFound } from 'next/navigation'
import { theme } from '@/themes/broto-default/theme.config'
import React from 'react'
import { getPageBySlug } from '@/lib/getPageBySlug'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // A home é tratada em rota separada, então redireciona para 404
  if (slug === 'home') notFound()

  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return (
    <main>
      {page.layout?.map((block: any, index: number) => {
        const blockType = block.blockType as keyof typeof theme.blocks
        const BlockComponent = theme.blocks[blockType]

        if (!BlockComponent) return null

        return <BlockComponent key={block.id || index} {...block} />
      })}
    </main>
  )
}

export async function generateStaticParams() {
  // Para build estático, buscamos apenas páginas publicadas e que não sejam 'home'
  const { getPayload } = await import('payload')
  const config = (await import('@/payload.config')).default
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    where: {
      slug: { not_equals: 'home' },
    },
    draft: false, // garantir que não gere parâmetros para rascunhos
  })

  return pages.docs.map((page) => ({ slug: page.slug }))
}