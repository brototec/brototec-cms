import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const token = searchParams.get('token')
  const locale = searchParams.get('locale') || 'pt'

  // Validação do segredo de preview
  if (secret !== process.env.PAYLOAD_PREVIEW_SECRET || !slug) {
    return new NextResponse('Token de preview inválido', { status: 401 })
  }

  // Habilita o Draft Mode no Next.js (cookie __prerender_bypass)
  const draft = await draftMode()
  draft.enable()

  // Constrói a URL de destino (adapte conforme sua estrutura de rotas; 
  // por enquanto, considerando apenas slug, sem locale)
  const redirectUrl = new URL(`/${slug}`, req.url) 
  // Se já tiver i18n, use: `/${locale}/${slug}`

  // Cria uma resposta de redirecionamento que permite manipular cookies
  const response = NextResponse.redirect(redirectUrl)

  if (token) {
    // Armazena o token do Payload em cookie seguro para acesso a rascunhos
    response.cookies.set('payload-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  return response
}