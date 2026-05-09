import { getPayload } from 'payload'
import config from '@/payload.config' // Verifique se o alias está correto como nos outros arquivos
import Navbar from '@/components/layout/Navbar'
// import Footer from '@/components/layout/Footer'
import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: await config })
  
  // Busca os dados globais em paralelo para maior performance
  const [headerData, footerData] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <html lang="pt-br">
      {/* A cor bg-[#f5f0e8] sustenta o design editorial tech inspirado em marcas como Linear e Vercel */}
      <body className="antialiased bg-[#f5f0e8] text-slate-900">
        <Navbar data={headerData} />
        {/* O padding-top 16 garante que o conteúdo não fique escondido sob a Navbar fixa */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        {/* <Footer data={footerData} /> */}
      </body>
    </html>
  )
}