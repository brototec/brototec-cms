import { draftMode } from 'next/headers'
import { ExitPreviewButton } from './ExitPreviewButton'

export async function PreviewBanner() {
  const { isEnabled } = await draftMode()

  if (!isEnabled) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-sm py-2 px-4 flex items-center justify-between h-10">
      <span>🔍 Você está visualizando rascunhos. As alterações não estão publicadas.</span>
      <ExitPreviewButton />
    </div>
  )
}