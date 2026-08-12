import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'

const links = [
  { label: 'Story', target: 'story' },
  { label: 'Philosophy', target: 'freshness' },
  { label: 'Craft', target: 'craft' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [isPassedFrames, setIsPassedFrames] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleScroll = () => {
      const topElem = document.getElementById('top')
      if (!topElem) return
      const rect = topElem.getBoundingClientRect()
      // The scrolling frames sequence completes when the bottom of #top section reaches top area of viewport
      const passed = rect.bottom <= window.innerHeight + 40
      setIsPassedFrames(passed)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (target) => {
    setOpen(false)
    const storyId = window.innerWidth >= 1024 ? 'story-desktop' : 'story'
    const node = document.getElementById(target === 'story' ? storyId : target)
    if (node) lenis?.scrollTo(node, { offset: -60, duration: 1.15 })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 h-14 text-white transition-all duration-500 ease-out md:h-16 ${
          isPassedFrames
            ? 'border-b border-white/12 bg-brand-forest/90 shadow-lg backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div className="section-wrap flex h-full items-center justify-between gap-4">
          <button onClick={() => goTo('top')} className="focus-ring flex items-center gap-2.5 active:opacity-70" aria-label="Ambot365 home">
            <span className="grid size-7 place-items-center rounded-full border border-gold/70 md:size-8">
              <span className="size-1.5 rounded-full bg-gold md:size-2" />
            </span>
            <span className="font-display text-sm font-semibold tracking-[0.22em] md:text-[16px]">AMBOT365</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <button key={link.target} onClick={() => goTo(link.target)} className="focus-ring min-h-9 px-4 text-xs tracking-wide text-white/75 transition-colors hover:text-white active:opacity-70">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => goTo('contact')} className="focus-ring min-h-9 rounded-full bg-parchment px-4 font-display text-xs font-medium text-brand-forest transition-transform hover:bg-white active:scale-95 sm:px-5">
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Explore Story</span>
            </button>
            <button onClick={() => setOpen((value) => !value)} className="focus-ring grid size-9 place-items-center rounded-full border border-white/20 active:scale-95 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }} className="fixed inset-0 z-70 bg-brand-forest px-4 pt-20 text-white md:hidden">
            <nav className="mx-auto flex max-w-xl flex-col border-t border-white/15" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <motion.button key={link.target} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} onClick={() => goTo(link.target)} className="focus-ring flex min-h-16 items-center justify-between border-b border-white/15 text-left font-serif text-[28px] active:opacity-70">
                  {link.label}<span className="font-mono text-[10px] text-gold">0{index + 1}</span>
                </motion.button>
              ))}
            </nav>
            <p className="label mx-auto mt-6 max-w-xl text-white/45">Objects for a considered life</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
