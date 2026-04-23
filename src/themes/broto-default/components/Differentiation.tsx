import React from 'react'
import { motion } from "framer-motion"

// O nome aqui PRECISA ser igual ao do import no RenderBlocks
export const DifferentiationBlockComponent = ({ tagline, title, steps }: any) => {
  return (
    <section className="py-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-xs font-medium text-green-600 tracking-[0.2em] uppercase">
          {tagline}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-3 max-w-sm leading-snug">
          {title}
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
          {steps?.map((s: any, i: number) => (
            <div key={i} className="p-6 bg-white hover:bg-green-50 transition-colors duration-300">
              <span className="text-xs font-medium text-green-600 block mb-3">{s.num}</span>
              <h3 className="text-sm font-semibold mb-2">{s.title}</h3>
              <p className="text-xs text-neutral-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}