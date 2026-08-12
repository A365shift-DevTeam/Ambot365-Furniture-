import { useEffect, useState } from 'react'

export const MOBILE_MAX = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.innerWidth < MOBILE_MAX,
  )

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX - 1}px)`)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}
