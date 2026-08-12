import { CircleGauge, Fingerprint, Recycle, Trees } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const parameters = [
  ['01', 'Forest', 'FSC-certified European oak'],
  ['02', 'Finish', 'Hand-rubbed natural oil'],
  ['03', 'Assembly', 'Repairable mechanical joints'],
]

const features = [
  [Trees, 'Regenerative source'],
  [Fingerprint, 'Individually traced'],
  [Recycle, 'Designed for return'],
  [CircleGauge, 'Lifetime service'],
]

export function CraftSection() {
  return (
    <section id="craft" className="grain relative overflow-hidden bg-brand-forest py-14 text-white sm:py-16 md:py-20 lg:py-24">
      <div className="section-wrap relative">
        <div className="mb-10 flex items-end justify-between border-b border-white/15 pb-7 sm:mb-14">
          <div><span className="label text-gold">The making · 03</span><h2 className="display-heading mt-4 max-w-3xl">Precision you can <em className="text-gold">feel.</em></h2></div>
          <span className="hidden font-mono text-xs text-white/35 sm:block">± 0.2 MM</span>
        </div>

        <div className="grid grid-adaptive-2 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
              <img src="/frames/frame-0060.webp" alt="Detailed view of Ambot365 chair during its assembly sequence" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
            <p className="mt-5 max-w-2xl text-[14px] font-light leading-relaxed text-white/60 sm:text-[15px]">Digital tolerances meet human judgment. Our makers read the grain, tune every joint, and finish each surface until the structure feels inevitable.</p>
          </Reveal>

          <Reveal delay={0.08} className="grid grid-adaptive-sidebar content-start gap-3">
            {features.map(([Icon, title], index) => (
              <div key={title} className="flex min-h-20 items-center gap-4 rounded-xl border border-white/12 bg-white/[0.035] p-4 sm:rounded-2xl">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold"><Icon size={18} strokeWidth={1.5} /></span>
                <div><span className="font-mono text-[10px] text-white/35">0{index + 1}</span><p className="mt-1 text-sm font-light">{title}</p></div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid grid-adaptive-3 gap-3 sm:mt-16">
          {parameters.map(([number, title, detail]) => (
            <Reveal key={title} className="min-h-36 rounded-xl border border-white/15 p-5 sm:rounded-2xl sm:p-6">
              <div className="flex items-center justify-between"><span className="label text-gold">{title}</span><span className="font-mono text-[10px] text-white/30">{number}</span></div>
              <p className="mt-10 text-sm font-light text-white/70">{detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
