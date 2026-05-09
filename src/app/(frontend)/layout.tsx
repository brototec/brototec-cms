import { getPayload } from 'payload'
import config from '@/payload.config'
import Navbar from '@/components/layout/Navbar'
import { PreviewBanner } from '@/components/layout/PreviewBanner'
import { draftMode } from 'next/headers'
import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: await config })
  const { isEnabled: isDraft } = await draftMode()

  const [headerData, footerData] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <html lang="pt-br">
      <body className="antialiased bg-[#f5f0e8] text-slate-900">
        <PreviewBanner />
        <Navbar data={headerData} isDraft={isDraft} />
        {/* pt-16 + (height do banner = 2.5rem ~ 40px) = pt-20 no modo draft, caso contrário pt-16 */}
        <main className={`min-h-screen ${isDraft ? 'pt-20' : 'pt-16'}`}>
          {children}
        </main>
      </body>
    </html>
  )
}