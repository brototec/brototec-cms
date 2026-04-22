import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { theme } from '@/themes/broto-default/theme.config'
import React from 'react'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })
  
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
  })

  const page = result.docs[0]

  if (!page) notFound()

  return (
    <main>
      {/* Loop de Renderização Dinâmica de Blocos */}
      {page.layout?.map((block: any, index: number) => {
        // Criamos uma referência tipada para as chaves do nosso objeto de blocos
        const blockType = block.blockType as keyof typeof theme.blocks
        
        // Agora o TS sabe que 'blockType' é uma chave válida ('hero' | 'content' | 'cta')
        const BlockComponent = theme.blocks[blockType]
        
        if (!BlockComponent) {
            console.warn(`Bloco "${block.blockType}" não mapeado no tema.`)
            return null
        }

        return <BlockComponent key={block.id || index} {...block} />
      })}
    </main>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: await config })
  const pages = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 100,
  })

  return pages.docs.map((page) => ({ slug: page.slug }))
}