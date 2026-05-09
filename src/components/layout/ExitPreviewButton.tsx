'use client'

export function ExitPreviewButton() {
  return (
    <button
      onClick={() => {
        // Força uma navegação completa para a rota de saída
        window.location.href = '/api/exit-preview'
      }}
      className="underline hover:no-underline ml-4"
    >
      Sair do Preview
    </button>
  )
}