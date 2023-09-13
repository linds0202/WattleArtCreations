import { useEffect, useState, useMemo, RefObject } from "react"

export default function useOnScreen(ref: RefObject<HTMLElement>) {

  const options = {
    root: ref.current,
    rootMargin: '0px',
    threshold: [1]
  }

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), options), [ref])


  useEffect(() => {
    if (ref){
      observer.observe(ref.current!)
    }
    
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}