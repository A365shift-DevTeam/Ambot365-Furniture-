import { ArrowDownRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const stats = [
  ['27', 'Hand-finished parts'],
  ['08', 'Master craftspeople'],
  ['30yr', 'Structural promise'],
]

export function StorySection({ compact = false }) {
  return (
    <section id={compact ? undefined : 'story-desktop'} className={`${compact ? 'bg-surface py-12' : 'hidden bg-surface py-14 sm:py-16 md:py-20 lg:block lg:py-24'}`}>
      <div className="section-wrap">
        <div className="grid grid-adaptive-2 items-center gap-8 sm:gap-10 lg:gap-16">
          <Reveal className={compact ? '' : 'lg:pr-8'}>
            <div className="mb-7 flex items-center gap-4 text-accent">
              <span className="h-px w-10 bg-current" /><span className="label">The object · No. 01</span>
            </div>
            <h1 className="display-heading max-w-2xl text-ink">
              Quiet in presence.<br /><em className="font-medium text-accent">Resolute</em> in purpose.
            </h1>
            <p className="mt-6 max-w-xl text-[14px] font-light leading-relaxed text-ink/65 sm:text-[15px]">
              Ambot365 is built around a simple conviction: the things closest to us should get better with time. Every plane, joint, and curve is resolved for daily life—never for the showroom alone.
            </p>
            <a href="#craft" className="focus-ring mt-7 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 font-display text-xs font-medium uppercase tracking-[0.16em] active:opacity-70">
              Read the making <ArrowDownRight size={16} />
            </a>
          </Reveal>

          {!compact && (
            <Reveal delay={0.08} className="relative overflow-hidden rounded-xl bg-parchment sm:rounded-2xl md:rounded-3xl">
              <img src="/frames/frame-0120.webp" alt="Ambot365 lounge chair in a considered interior" className="aspect-[4/3] w-full object-cover md:aspect-[4/5]" loading="lazy" />
              <div className="absolute bottom-4 left-4 rounded-full bg-surface/90 px-4 py-3 backdrop-blur sm:bottom-6 sm:left-6">
                <span className="label text-ink/60">Oak · Saddle leather</span>
              </div>
            </Reveal>
          )}
        </div>

        <div className={`${compact ? 'mt-10' : 'mt-12 lg:mt-16'} grid grid-adaptive-3 border-y border-border`}>
          {stats.map(([value, label], index) => (
            <div key={label} className={`min-h-28 py-5 sm:px-6 ${index > 0 ? 'border-t border-border sm:border-l sm:border-t-0' : ''} ${index === 2 ? 'sm:col-span-2 sm:border-l-0 sm:border-t lg:col-span-1 lg:border-l lg:border-t-0' : ''}`}>
              <p className="font-mono text-[28px] tabular-nums text-ink sm:text-[32px]">{value}</p>
              <p className="mt-2 text-xs font-light text-ink/55">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
