import React from 'react'
import Image from 'next/image'

export const HeroBlockComponent = ({ heading, subheading, cta, image }: any) => {
  return (
    <section className="relative bg-neutral-900 text-white py-20 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {heading}
          </h1>
          {subheading && (
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
              {subheading}
            </p>
          )}
          {cta?.label && (
            <a
              href={cta.href}
              className="inline-block bg-green-500 hover:bg-green-600 text-neutral-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              {cta.label}
            </a>
          )}
        </div>
        
        {image && typeof image === 'object' && (
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={image.url}
              alt={image.alt || heading}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}