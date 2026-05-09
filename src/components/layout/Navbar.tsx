'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar({ data, isDraft }: { data: any, isDraft?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed left-0 right-0 z-40 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 transition-[top] ${
        isDraft ? 'top-10' : 'top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
          broto<span className="text-green-500 italic">tec</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {data?.navItems?.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-green-600' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={data?.ctaHref || '/contato'}
            className="text-sm font-bold uppercase tracking-widest bg-green-500 text-white px-6 py-2.5 rounded-full hover:bg-green-600 transition-all"
          >
            {data?.ctaLabel}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-neutral-900 dark:text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu (se houver) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-950 px-6 py-4 flex flex-col gap-4 border-t border-neutral-100 dark:border-neutral-800"
          >
            {data?.navItems?.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={data?.ctaHref || '/contato'}
              onClick={() => setOpen(false)}
              className="text-sm font-bold uppercase tracking-widest bg-green-500 text-white px-6 py-2.5 rounded-full text-center"
            >
              {data?.ctaLabel}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}