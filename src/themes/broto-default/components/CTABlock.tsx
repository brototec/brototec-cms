import React from 'react'

export const CTABlockComponent = ({ heading, description, button }: any) => {
  const variants: any = {
    primary: 'bg-green-500 text-neutral-900 hover:bg-green-600',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    outline: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
  }

  return (
    <section className="py-20 px-6 bg-neutral-100 dark:bg-neutral-900 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">{heading}</h2>
        {description && (
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {button?.label && (
          <a
            href={button.href}
            className={`inline-block font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg shadow-lg hover:scale-105 ${variants[button.variant || 'primary']}`}
          >
            {button.label}
          </a>
        )}
      </div>
    </section>
  )
}