// Troque heading por title, e subheading por description para bater com o seu Schema .ts
export const HeroBlockComponent = ({ title, tagline, description, links, image }: any) => {
  return (
    <section className="relative bg-neutral-900 text-white py-20 px-6 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <span className="text-green-500 font-bold uppercase mb-4 block tracking-widest">{tagline}</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex gap-4">
            {links?.map((link: any, i: number) => (
              <a key={i} href={link.href} className="bg-green-500 p-4 rounded-lg text-neutral-900 font-bold">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* ... resto do código da imagem ... */}
      </div>
    </section>
  )
}