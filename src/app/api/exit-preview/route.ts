import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const draft = await draftMode()
  draft.disable() // ainda chamamos para seguir o padrão Next.js

  const url = new URL('/', req.url)
  const response = NextResponse.redirect(url)

  // Remove o cookie que mantém o Draft Mode ativo
  response.cookies.set('__prerender_bypass', '', {
    maxAge: 0,   // expira imediatamente
    path: '/',
  })

  return response
}