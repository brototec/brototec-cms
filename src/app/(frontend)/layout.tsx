import { getPayload } from 'payload'
import config from '@payload-config'
import Navbar from '@/components/layout/Navbar'
// import Footer from '@/components/layout/Footer'
import './styles.css'
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  
  // Busca os dados globais do CMS
  const headerData = await payload.findGlobal({ slug: 'header' })
  const footerData = await payload.findGlobal({ slug: 'footer' })

  return (
    <html lang="pt-br">
      <body className="antialiased bg-[#f5f0e8]">
        <Navbar data={headerData} />
        <main className="pt-16">
          {children}
        </main>
        {/* <Footer data={footerData} /> */}
      </body>
    </html>
  )
}