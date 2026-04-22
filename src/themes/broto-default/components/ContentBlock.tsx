import React from 'react'

export const ContentBlockComponent = ({ content }: any) => {
  if (!content) return null

  return (
    <section className="py-16 px-6 bg-white dark:bg-neutral-950">
      <div className="container mx-auto max-w-3xl prose prose-neutral md:prose-xl dark:prose-invert prose-green">
        {/* Aqui você pode usar um renderizador de Lexical ou apenas mapear o JSON se for simples */}
        <div className="rich-text">
          {/* Implementação básica: o Payload v3 usa serializadores para Lexical */}
          {/* Se estiver usando o RichText do @payloadcms/richtext-lexical, certifique-se de configurar o renderizador adequado aqui */}
          <p className="text-lg leading-7">O conteúdo do editor Lexical aparecerá aqui formatado.</p>
        </div>
      </div>
    </section>
  )
}