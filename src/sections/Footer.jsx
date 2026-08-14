import { useState, useEffect } from 'react'
import { ArrowRight, Instagram, Linkedin, Clock, CheckCircle2, X, Box } from 'lucide-react'

const STUDIOS = [
  { city: 'London', zone: 'Europe/London', address: '48 Foundry Lane, EC1' },
  { city: 'Milan', zone: 'Europe/Rome', address: 'Via Solferino 12, Brera' },
  { city: 'Tokyo', zone: 'Asia/Tokyo', address: '5-7-2 Minamiaoyama, Minato' },
  { city: 'New York', zone: 'America/New_York', address: '142 Greene St, SoHo' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showSampleModal, setShowSampleModal] = useState(false)
  const [sampleSuccess, setSampleSuccess] = useState(false)
  const [times, setTimes] = useState({})

  useEffect(() => {
    const updateWorldClocks = () => {
      const newTimes = {}
      STUDIOS.forEach(({ city, zone }) => {
        try {
          newTimes[city] = new Date().toLocaleTimeString('en-US', {
            timeZone: zone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        } catch {
          newTimes[city] = '12:00'
        }
      })
      setTimes(newTimes)
    }

    updateWorldClocks()
    const timer = setInterval(updateWorldClocks, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 5000)
      setEmail('')
    }
  }

  const handleSampleSubmit = (e) => {
    e.preventDefault()
    setSampleSuccess(true)
    setTimeout(() => {
      setSampleSuccess(false)
      setShowSampleModal(false)
    }, 3000)
  }

  return (
    <footer id="contact" className="bg-surface-warm py-16 text-ink sm:py-20 md:py-24 lg:py-32 relative overflow-hidden border-t border-border">
      <div className="section-wrap relative z-10">
        {/* Main 4-Grid Footer Top */}
        <div className="grid grid-adaptive-4 gap-10 border-b border-ink/15 pb-16">
          {/* Brand Info & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-12">
            <div className="flex items-center gap-3">
              <img src="/ambot-logo.webp" width="96" height="96" alt="Ambot365 Logo" className="h-8 w-auto object-contain" loading="lazy" decoding="async" />
              <span className="font-display text-xl font-semibold tracking-[0.25em] text-ink">AMBOT365</span>
            </div>

            <h2 className="mt-8 font-serif text-[36px] leading-[1.05] tracking-tight sm:text-[48px] md:text-[56px] text-ink">
              Live with things<br />
              <em className="text-accent italic font-normal">worth keeping.</em>
            </h2>

            <p className="mt-4 max-w-md text-xs font-light text-ink/70 leading-relaxed">
              Subscribe to studio journals, limited timber batch announcements, and private collection preview access.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md border-b border-ink/30 transition-colors focus-within:border-accent">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for studio notes"
                className="min-h-12 min-w-0 flex-1 bg-transparent text-xs font-light outline-none placeholder:text-ink/40 text-ink"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="focus-ring grid size-12 shrink-0 place-items-center text-accent transition-transform active:scale-95 hover:text-ink"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 flex items-center gap-2 font-mono text-xs text-accent animate-in fade-in">
                <CheckCircle2 size={14} />
                <span>You have been subscribed to studio notes.</span>
              </p>
            )}


          </div>

          {/* World Clocks & Studios */}
          <div>
            <p className="label text-accent">Studio Network & Local Times</p>
            <div className="mt-6 space-y-4 font-mono text-xs">
              {STUDIOS.map(({ city, address }) => (
                <div key={city} className="border-b border-ink/10 pb-3">
                  <div className="flex items-center justify-between text-ink">
                    <span className="font-semibold">{city}</span>
                    <span className="text-accent flex items-center gap-1.5 font-medium">
                      <Clock size={12} />
                      {times[city] || '12:00'}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink/50 font-sans mt-0.5">{address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Concierge Inquiries */}
          <div>
            <p className="label text-accent">Concierge & Press</p>
            <div className="mt-6 flex flex-col space-y-3 font-sans text-xs font-light text-ink/75">
              <div>
                <p className="font-mono text-[10px] text-ink/40 uppercase">Bespoke Commissions</p>
                <a className="focus-ring flex min-h-9 items-center hover:text-accent transition-colors text-sm font-normal text-ink mt-1" href="mailto:concierge@ambot365.com">
                  info@ambot365.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink/40 uppercase">London Studio Phone</p>
                <a className="focus-ring flex min-h-9 items-center hover:text-accent transition-colors text-sm font-normal text-ink mt-1" href="tel:+442079460128">
                  +44 (0)20 7946 0128
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] text-ink/40 uppercase">Press & Trade Accounts</p>
                <a className="focus-ring flex min-h-9 items-center hover:text-accent transition-colors" href="mailto:press@ambot365.com">
                  press@ambot365.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Legal Bar */}
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
              © 2026 AMBOT365 STUDIO · BUILT FOR A LONGER NOW
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#instagram"
              aria-label="Instagram"
              className="focus-ring grid size-10 place-items-center rounded-full border border-ink/20 bg-surface transition-colors hover:border-accent hover:text-accent active:scale-95 shadow-sm"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="focus-ring grid size-10 place-items-center rounded-full border border-ink/20 bg-surface transition-colors hover:border-accent hover:text-accent active:scale-95 shadow-sm"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Swatch Sample Box Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 z-100 grid place-items-center bg-black/50 backdrop-blur-md p-4 text-ink">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 text-accent">
                <Box size={20} />
                <span className="font-display text-sm font-semibold tracking-wider">TACTILE SWATCH KIT</span>
              </div>
              <button
                onClick={() => setShowSampleModal(false)}
                className="focus-ring grid size-8 place-items-center rounded-full border border-ink/20 text-ink/60 hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            {sampleSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-ink">Sample Box Reserved</h3>
                <p className="font-sans text-xs text-ink/70 max-w-xs mx-auto">
                  Our London studio team is preparing your custom timber & leather swatch kit. Dispatch details will follow shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSampleSubmit} className="mt-6 space-y-4">
                <p className="font-sans text-xs text-ink/70 leading-relaxed">
                  Receive a curated studio box containing physical samples of European Natural Oak, Smoked Walnut, Bleached Ash, and vegetable-tanned leather swatches.
                </p>

                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="block font-mono text-[10px] text-ink/60 uppercase mb-1">Full Name</label>
                    <input required type="text" placeholder="Lord / Lady / Architect Name" className="w-full rounded-xl border border-border bg-parchment/60 p-3 outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-ink/60 uppercase mb-1">Delivery Address</label>
                    <input required type="text" placeholder="Street, City, Postal Code" className="w-full rounded-xl border border-border bg-parchment/60 p-3 outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-ink/60 uppercase mb-1">Email Address</label>
                    <input required type="email" placeholder="concierge@architecture-firm.com" className="w-full rounded-xl border border-border bg-parchment/60 p-3 outline-none focus:border-accent" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 rounded-xl bg-ink py-3.5 font-display text-xs font-semibold uppercase tracking-wider text-surface transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Dispatch Swatch Box
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
