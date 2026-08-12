import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useIsMobile } from '../hooks/useIsMobile'

const FRAME_COUNT = 120
const MILESTONE_STEP = 10 // Load every 10th frame in priority phase
const frameUrl = (index) => `/frames/frame-${String(index + 1).padStart(4, '0')}.webp`
const HERO_DEFAULT_IMAGE = '/hero-default.jpeg'

export function ProductPackScroll({ mobileContent }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const heroDefaultRef = useRef(null)
  const loadedMapRef = useRef(new Uint8Array(FRAME_COUNT))
  const currentFrameRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  // Find closest loaded frame if target frame isn't ready yet
  const getClosestLoadedFrame = useCallback((targetIndex) => {
    if (loadedMapRef.current[targetIndex]) return targetIndex
    
    // Search outwards from targetIndex
    for (let delta = 1; delta < FRAME_COUNT; delta++) {
      const prev = targetIndex - delta
      if (prev >= 0 && loadedMapRef.current[prev]) return prev
      const next = targetIndex + delta
      if (next < FRAME_COUNT && loadedMapRef.current[next]) return next
    }
    return 0 // Fallback to initial frame
  }, [])

  // Optimized Canvas Drawing Loop
  const draw = useCallback((requestedIndex = currentFrameRef.current) => {
    const canvas = canvasRef.current
    if (!canvas) return

    // If at index 0 (initial rest position) and hero default image is ready, render default hero view
    let image
    if (requestedIndex === 0 && heroDefaultRef.current && heroDefaultRef.current.complete) {
      image = heroDefaultRef.current
    } else {
      const actualIndex = getClosestLoadedFrame(requestedIndex)
      image = imagesRef.current[actualIndex]
    }

    if (!image || !image.complete) return

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
    context.fillStyle = '#faf7f2'
    context.fillRect(0, 0, bounds.width, bounds.height)

    const scale = isMobile
      ? Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      : Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
    const drawWidth = image.naturalWidth * scale
    const drawHeight = image.naturalHeight * scale
    const x = (bounds.width - drawWidth) / 2
    const y = isMobile ? 0 : (bounds.height - drawHeight) / 2
    context.drawImage(image, x, y, drawWidth, drawHeight)
  }, [isMobile, getClosestLoadedFrame])

  // 3-Stage Smart Preloading Engine + Hero Default View
  useEffect(() => {
    let active = true
    let totalLoaded = 0
    imagesRef.current = new Array(FRAME_COUNT)

    // Load Default Hero Showcase Image
    const defaultHeroImg = new Image()
    defaultHeroImg.decoding = 'async'
    if ('fetchPriority' in defaultHeroImg) defaultHeroImg.fetchPriority = 'high'
    defaultHeroImg.src = HERO_DEFAULT_IMAGE
    defaultHeroImg.onload = () => {
      if (!active) return
      heroDefaultRef.current = defaultHeroImg
      if (currentFrameRef.current === 0) {
        draw(0)
        setReady(true)
      }
    }

    const handleImageLoad = (index) => {
      if (!active) return
      loadedMapRef.current[index] = 1
      totalLoaded += 1
      setProgress(Math.round((totalLoaded / FRAME_COUNT) * 100))

      // Stage 1 Complete: First frame loaded -> Draw & unlock UI
      if (index === 0) {
        if (!heroDefaultRef.current) draw(0)
        setReady(true)
      }

      if (index === currentFrameRef.current) {
        draw(index)
      }
    }

    // Helper to create & load a single image
    const loadImage = (index, priority = 'auto') => {
      if (imagesRef.current[index]) return imagesRef.current[index]
      const img = new Image()
      img.decoding = 'async'
      if ('fetchPriority' in img) img.fetchPriority = priority
      img.src = frameUrl(index)
      img.onload = () => handleImageLoad(index)
      imagesRef.current[index] = img
      return img
    }

    // Stage 1: Load Hero Frame 0 IMMEDIATELY with high priority
    loadImage(0, 'high')

    // Stage 2: Load Key Milestone Frames (0, 10, 20, 30...)
    const milestoneIndices = []
    for (let i = 0; i < FRAME_COUNT; i += MILESTONE_STEP) {
      if (i !== 0) milestoneIndices.push(i)
    }

    milestoneIndices.forEach((idx) => loadImage(idx, 'high'))

    // Stage 3: Batch load remaining intermediate frames asynchronously
    const remainingIndices = []
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (i % MILESTONE_STEP !== 0) remainingIndices.push(i)
    }

    let batchOffset = 0
    const BATCH_SIZE = 8

    const loadNextBatch = () => {
      if (!active || batchOffset >= remainingIndices.length) return
      const batch = remainingIndices.slice(batchOffset, batchOffset + BATCH_SIZE)
      batch.forEach((idx) => loadImage(idx, 'low'))
      batchOffset += BATCH_SIZE

      if (batchOffset < remainingIndices.length) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 250 })
        } else {
          setTimeout(loadNextBatch, 50)
        }
      }
    }

    // Start background batching after milestones initiated
    setTimeout(loadNextBatch, 100)

    return () => { active = false }
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const observer = new ResizeObserver(() => draw())
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextFrame = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT))
    if (nextFrame !== currentFrameRef.current) {
      currentFrameRef.current = nextFrame
      requestAnimationFrame(() => draw(nextFrame))
    }
  })

  return (
    <section id="top" ref={containerRef} className="relative h-[550vh] bg-surface lg:h-[500vh]" aria-label="Ambot365 chair in motion">
      <div className="sticky top-0 h-[100dvh]">
        <div className="relative w-full bg-surface lg:h-full">
          <canvas ref={canvasRef} className="block aspect-video w-full touch-none lg:h-full lg:aspect-auto" />
          
          {/* Smooth Fade Preloader Overlay */}
          <motion.div
            animate={{ opacity: ready ? 0 : 1, pointerEvents: ready ? 'none' : 'auto' }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 grid place-items-center bg-surface text-ink z-30"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="size-9 animate-spin rounded-full border-2 border-ink/20 border-t-accent" />
              <span className="label text-ink/70">CURATING STUDIO COLLECTION · AMBOT365 · {progress}%</span>
            </div>
          </motion.div>
        </div>
        <div id="story" className="lg:hidden">{mobileContent}</div>
      </div>
    </section>
  )
}
