import { useState, useEffect } from 'react'
import { MapPin, Clock, Hammer, ShieldCheck, Compass, Sparkles } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const ARTISANS = [
  {
    name: 'Henrik Lindqvist',
    role: 'Master Timber Joiner',
    experience: '24 Years',
    specialty: 'Hand-scraped dovetails & grain alignment',
    quote: 'Wood moves. A master joiner works with the grain, never against its natural tension.',
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Leather Craftswoman',
    experience: '18 Years',
    specialty: 'Double-needle saddle stitching & vegetable tanning',
    quote: 'Full-grain leather is a living material. Every stitch honors the natural hide.',
  },
  {
    name: 'Marcus Vance',
    role: 'Precision Finisher',
    experience: '15 Years',
    specialty: '14-coat natural oil application & thermal curing',
    quote: 'You feel a finish before you see it. Natural oils breathe with the wood.',
  },
]

export function AtelierSection() {
  const [activeArtisan, setActiveArtisan] = useState(0)
  const [londonTime, setLondonTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setLondonTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="atelier" className="bg-surface-warm py-16 sm:py-20 md:py-24 lg:py-32 border-y border-border">
      <div className="section-wrap">
        {/* Section Header */}
        <Reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 text-accent mb-3">
              <Compass size={18} />
              <span className="label">The Studio & Atelier · London EC1</span>
            </div>
            <h2 className="display-heading text-ink">
              Where digital precision meets <em className="text-accent italic font-normal">human mastery.</em>
            </h2>
          </div>

          {/* London Studio Status Badge */}
          <div className="rounded-2xl border border-ink/15 bg-surface/90 p-4 backdrop-blur-md flex items-center gap-4">
            <span className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-emerald-500" />
            </span>
            <div>
              <p className="font-mono text-[10px] text-ink/50 uppercase tracking-widest">London Studio · Open Now</p>
              <p className="font-mono text-sm font-semibold text-ink flex items-center gap-2 mt-0.5">
                <Clock size={14} className="text-accent" />
                <span>{londonTime || '14:30:00 GMT'}</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Artisans Showcase Grid */}
        <div className="grid grid-adaptive-2 gap-8 lg:gap-14 items-center">
          {/* Artisan Tabs Selector */}
          <Reveal className="space-y-4">
            <span className="label text-accent">Meet the Master Artisans</span>
            <div className="space-y-3">
              {ARTISANS.map((artisan, index) => {
                const isActive = activeArtisan === index
                return (
                  <button
                    key={artisan.name}
                    onClick={() => setActiveArtisan(index)}
                    className={`focus-ring w-full text-left rounded-2xl border p-5 transition-all duration-300 ${
                      isActive
                        ? 'border-accent bg-surface shadow-md ring-1 ring-accent'
                        : 'border-border bg-surface/60 hover:border-ink/30 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-base font-semibold text-ink">{artisan.name}</h3>
                        <p className="font-mono text-xs text-accent mt-0.5">{artisan.role}</p>
                      </div>
                      <span className="font-mono text-xs text-ink/40 bg-parchment px-3 py-1 rounded-full">
                        {artisan.experience} Exp
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Active Artisan Profile Spotlight Card */}
          <Reveal delay={0.08} className="rounded-2xl border border-ink/15 bg-surface p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="label text-ink">Artisan Spotlight</span>
              <span className="font-mono text-xs text-accent font-semibold">STUDIO NO. {activeArtisan + 1}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-serif text-3xl font-medium text-ink">{ARTISANS[activeArtisan].name}</h3>
              <p className="font-mono text-xs text-accent mt-1">{ARTISANS[activeArtisan].role} · {ARTISANS[activeArtisan].experience}</p>

              <blockquote className="mt-6 border-l-2 border-accent pl-4 font-serif italic text-lg text-ink/80 leading-relaxed">
                "{ARTISANS[activeArtisan].quote}"
              </blockquote>

              <div className="mt-6 rounded-xl bg-parchment/60 p-4 space-y-1.5 font-sans text-xs">
                <p className="font-medium text-ink">Primary Mastery Focus:</p>
                <p className="text-ink/75 leading-relaxed">{ARTISANS[activeArtisan].specialty}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-ink/60">
                <MapPin size={16} className="text-accent" />
                <span>Foundry Lane Studio, London EC1</span>
              </div>
              <span className="font-mono text-[10px] text-ink/40 uppercase">Serialized Guild Member</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
