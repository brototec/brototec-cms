import { getPayload } from 'payload'
import config from '@/payload.config'
import { theme } from '@/themes/broto-default/theme.config'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  // Busca a página que você criou com o slug 'home'
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    // No Payload v3, se o draft estiver ON e você não estiver logado,
    // ele só retorna se o status for 'published'.
    draft: false, 
  })

  const page = result.docs[0]

  // Se seu sócio deletar a página ou mudar o slug, cai no 404
  if (!page) notFound()

  return (
    <main>
      {page.layout?.map((block: any, index: number) => {
        // Usa o casting que resolvemos antes para o TypeScript não reclamar
        const blockType = block.blockType as keyof typeof theme.blocks
        const BlockComponent = theme.blocks[blockType]
        
        if (!BlockComponent) return null

        return <BlockComponent key={block.id || index} {...block} />
      })}
    </main>
  )
}