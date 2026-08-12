import { Leaf, MoveUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'

export function FreshnessSection() {
  return (
    <section id="freshness" className="bg-parchment py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="section-wrap">
        <div className="grid grid-adaptive-2 gap-8 sm:gap-10 lg:gap-16">
          <Reveal className="flex flex-col justify-between rounded-xl border border-ink/15 p-6 sm:rounded-2xl sm:p-8 md:rounded-3xl lg:min-h-[440px] lg:p-10">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-full bg-brand-forest text-parchment"><Leaf size={20} strokeWidth={1.5} /></span>
              <span className="label text-ink/45">Material intelligence</span>
            </div>
            <div className="mt-16 sm:mt-24">
              <p className="font-serif text-2xl leading-tight sm:text-3xl">Designed to belong.<br />Made to return.</p>
              <p className="mt-4 max-w-sm text-[14px] font-light leading-relaxed text-ink/60 sm:text-[15px]">Every component can be repaired, renewed, or separated into a clean material stream.</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center lg:px-8">
            <span className="label text-accent">A fresher standard</span>
            <h2 className="display-heading mt-5">Not less impact.<br /><em className="text-accent">More lasting value.</em></h2>
            <p className="mt-6 max-w-lg text-[14px] font-light leading-relaxed text-ink/65 sm:text-[15px]">We source slow-grown timber from regenerative forests, finish with plant-based oils, and design every joint for disassembly. It is a complete system—not a sustainability footnote.</p>
            <a href="#craft" className="focus-ring mt-8 inline-flex min-h-12 w-fit items-center gap-4 rounded-full border border-ink/20 px-5 font-display text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-surface active:scale-95">
              Our materials <MoveUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
