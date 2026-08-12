import { ArrowRight, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-forest py-14 text-white sm:py-16 md:py-20 lg:py-24">
      <div className="section-wrap">
        <div className="grid grid-adaptive-4 gap-10 border-b border-white/15 pb-12 sm:gap-8 md:pb-16">
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-20">
            <div className="flex items-center gap-3">
              <img src="/ambot-logo.png" alt="Ambot365 Logo" className="h-7 w-auto object-contain" />
              <span className="font-display text-xl font-semibold tracking-[0.22em]">AMBOT365</span>
            </div>
            <h2 className="mt-8 font-serif text-[34px] leading-[1.08] tracking-tight sm:text-[46px] md:text-[58px]">Live with things<br /><em className="text-gold">worth keeping.</em></h2>
            <form onSubmit={(event) => event.preventDefault()} className="mt-8 flex max-w-lg border-b border-white/30">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" type="email" placeholder="Email for studio notes" className="min-h-12 min-w-0 flex-1 bg-transparent text-sm font-light outline-none placeholder:text-white/35" />
              <button type="submit" aria-label="Subscribe" className="focus-ring grid size-12 shrink-0 place-items-center text-gold active:scale-95"><ArrowRight size={19} /></button>
            </form>
          </div>
          <div>
            <p className="label text-gold">Visit</p>
            <address className="mt-6 text-sm font-light not-italic leading-7 text-white/60">48 Foundry Lane<br />London EC1<br />United Kingdom</address>
          </div>
          <div>
            <p className="label text-gold">Inquiries</p>
            <div className="mt-6 flex flex-col text-sm font-light text-white/60">
              <a className="focus-ring flex min-h-11 items-center hover:text-white active:opacity-70" href="mailto:concierge@ambot365.com">concierge@ambot365.com</a>
              <a className="focus-ring flex min-h-11 items-center hover:text-white active:opacity-70" href="tel:+442079460128">+44 (0)20 7946 0128</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">© 2026 Ambot365 Studio · Built for a longer now</p>
          <div className="flex gap-2">
            <a href="#instagram" aria-label="Instagram" className="focus-ring grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold active:scale-95"><Instagram size={17} /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="focus-ring grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold active:scale-95"><Linkedin size={17} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
