import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { cancelFrame, frame } from 'motion/react'

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const update = ({ timestamp }) => lenisRef.current?.lenis?.raf(timestamp)
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, duration: 1.05, smoothWheel: true, touchMultiplier: 1.5 }}
    >
      {children}
    </ReactLenis>
  )
}
