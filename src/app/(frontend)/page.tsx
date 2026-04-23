import { getPayload } from 'payload'
import config from '@/payload.config'
import { theme } from '@/themes/broto-default/theme.config'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const payload = await getPayload({ config: await config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    draft: false, 
  })

  const page = result.docs[0]

  if (!page) notFound()

  return (
    <>
      {page.layout?.map((block: any, index: number) => {
        const blockType = block.blockType as keyof typeof theme.blocks
        const BlockComponent = theme.blocks[blockType]
        
        if (!BlockComponent) return null

        return <BlockComponent key={block.id || index} {...block} />
      })}
    </>
  )
}