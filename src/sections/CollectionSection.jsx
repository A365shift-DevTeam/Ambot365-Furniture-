import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const pieces = [
  ['Lounge 01', 'Rest / Read', 'frame-0024.webp'],
  ['Dining 02', 'Gather / Share', 'frame-0048.webp'],
  ['Studio 03', 'Focus / Make', 'frame-0078.webp'],
  ['Low 04', 'Pause / Reset', 'frame-0104.webp'],
]

export function CollectionSection() {
  return (
    <section className="bg-surface py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="section-wrap">
        <Reveal className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
          <div><span className="label text-accent">One form · Many rituals</span><h2 className="display-heading mt-4">Made around <em className="text-accent">your day.</em></h2></div>
          <ArrowUpRight className="hidden text-ink/35 sm:block" size={30} strokeWidth={1.2} />
        </Reveal>
        <div className="grid grid-adaptive-4 gap-4">
          {pieces.map(([name, use, image], index) => (
            <Reveal key={name} delay={index * 0.04} className="group overflow-hidden rounded-xl border border-border bg-white/35 sm:rounded-2xl md:rounded-3xl">
              <div className="overflow-hidden"><img src={`/frames/${image}`} alt={`${name} view of the Ambot365 chair`} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" /></div>
              <div className="flex min-h-20 items-center justify-between px-5"><div><p className="font-display text-sm font-medium">{name}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45">{use}</p></div><span className="font-mono text-[10px] text-ink/30">0{index + 1}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
