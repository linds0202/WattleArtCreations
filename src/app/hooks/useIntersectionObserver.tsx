import { useEffect, useState, useMemo } from "react"

export default function useOnScreen(ref: RefObject<HTMLElement>) {


  console.log(ref)

  const options = {
    root: ref.current,
    rootMargin: '0px',
    threshold: [1]
  }

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), options), [ref])


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}