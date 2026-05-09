import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { theme } from '@/themes/broto-default/theme.config'
import React from 'react'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // CRUCIAL: Se o slug for 'home', mandamos para o 404 nesta rota específica,
  // pois a Home já é tratada pelo arquivo da raiz (page.tsx).
  if (slug === 'home') notFound()

  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug }, // Aqui ele busca o slug dinâmico (ex: 'contato')
    },
  })

  const page = result.docs[0]

  // Se a página (ex: contato) foi deletada no Payload, aqui ele dará o 404 correto.
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
  const payload = await getPayload({ config: await config })
  
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    where: {
      slug: { not_equals: 'home' }, // Não gera a rota /home no build
    },
  })

  return pages.docs.map((page) => ({ slug: page.slug }))
}