import { draftMode, cookies } from 'next/headers' // Importe cookies aqui
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const token = searchParams.get('token')

  // 1. Valida o segredo configurado no seu .env.local
  if (secret !== process.env.PAYLOAD_PREVIEW_SECRET || !slug) {
    return new Response('Token de preview inválido', { status: 401 })
  }

  // 2. Habilita o Draft Mode
  const draft = await draftMode()
  draft.enable()

  // 3. Configura o cookie do Payload ANTES do redirect
  if (token) {
    const cookieStore = await cookies()
    cookieStore.set('payload-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  // 4. Determina o caminho final (ajustado para sua lógica de home na raiz)
  const path = slug === 'home' ? '/' : `/${slug}`

  // 5. Redireciona por último
  redirect(path)
}