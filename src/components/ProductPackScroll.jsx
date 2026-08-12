import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useIsMobile } from '../hooks/useIsMobile'

const FRAME_COUNT = 120
const frameUrl = (index, isMobile) =>
  `/${isMobile ? 'frames' : 'frames-hd'}/frame-${String(index + 1).padStart(4, '0')}.webp`

export function ProductPackScroll({ mobileContent }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const draw = useCallback((index = currentFrameRef.current) => {
    const canvas = canvasRef.current
    const image = imagesRef.current[index]
    if (!canvas || !image?.complete) return
    const context = canvas.getContext('2d', { alpha: false })
    const bounds = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, Math.round(bounds.width * dpr))
    const height = Math.max(1, Math.round(bounds.height * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.fillStyle = '#0f1211'
    context.fillRect(0, 0, bounds.width, bounds.height)

    const scale = isMobile
      ? Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      : Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
    const drawWidth = image.naturalWidth * scale
    const drawHeight = image.naturalHeight * scale
    const x = (bounds.width - drawWidth) / 2
    const y = isMobile ? 0 : (bounds.height - drawHeight) / 2
    context.drawImage(image, x, y, drawWidth, drawHeight)
  }, [isMobile])

  useEffect(() => {
    let active = true
    let loaded = 0
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = frameUrl(index, isMobile)
      image.onload = () => {
        if (!active) return
        loaded += 1
        setProgress(Math.round((loaded / FRAME_COUNT) * 100))
        if (index === 0) draw(0)
        if (loaded === FRAME_COUNT) {
          setReady(true)
          draw(currentFrameRef.current)
        }
      }
      return image
    })
    return () => { active = false }
  }, [draw, isMobile])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const observer = new ResizeObserver(() => draw())
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw, isMobile])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextFrame = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT))
    if (nextFrame !== currentFrameRef.current) {
      currentFrameRef.current = nextFrame
      requestAnimationFrame(() => draw(nextFrame))
    }
  })

  return (
    <section id="top" ref={containerRef} className="relative h-[550vh] bg-brand-forest lg:h-[500vh]" aria-label="Ambot365 chair in motion">
      <div className="sticky top-0 h-[100dvh]">
        <div className="relative w-full bg-brand-forest lg:h-full">
          <canvas ref={canvasRef} className="block aspect-video w-full touch-none lg:h-full lg:aspect-auto" />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-black/20 via-transparent to-brand-forest/35 lg:block" />
          <motion.div animate={{ opacity: ready ? 0 : 1 }} transition={{ duration: 0.35 }} className="absolute inset-0 grid place-items-center bg-brand-forest text-parchment" aria-live="polite">
            <div className="flex flex-col items-center gap-4">
              <span className="size-9 animate-spin rounded-full border border-white/20 border-t-gold" />
              <span className="label">Preparing form Â· Ambot365 Â· {progress}%</span>
            </div>
          </motion.div>
        </div>
        <div id="story" className="lg:hidden">{mobileContent}</div>
      </div>
    </section>
  )
}



