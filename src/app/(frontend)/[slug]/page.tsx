import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { theme } from '@/themes/broto-default/theme.config'
import React from 'react'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Extrai o slug do params (await necessário no Next 15/16)
  const { slug } = await params
  
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
  })

  const page = result.docs[0]

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
  })

  
  return pages.docs.map((page) => ({ slug: page.slug }))
}