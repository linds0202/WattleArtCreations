import {
    motion,
    MotionProps,
    useTransform,
    useScroll
} from "framer-motion";

import { throttle } from "throttle-debounce-ts";
import { useEffect, useRef, useState } from "react";
  
function useElementViewportPosition(ref: React.RefObject<HTMLElement>) {
    const [position, setPosition] = useState<[number, number]>([0, 0]);
  
    useEffect(() => {
      if (!ref || !ref.current) return;
  
      const pageHeight = document.body.scrollHeight;
      const start = ref.current.offsetTop;
      const end = start + ref.current.offsetHeight;
  
      setPosition([start / pageHeight, end / pageHeight]);
    }, []);
  
    return { position };
}
  
const slideAnimation: MotionProps = {
    variants: {
      full: { backgroundColor: "#663399" },
      partial: { backgroundColor: "#808080" }
    },
    initial: "partial",
    whileInView: "full",
    viewport: { amount: 1, once: true }
};
  
export default function Gallery() {
    const ref = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const { position } = useElementViewportPosition(ref);
    const [carouselEndPosition, setCarouselEndPosition] = useState(0);
    const { scrollYProgress, scrollY } = useScroll();
    const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);
  
    useEffect(() => {
      window.addEventListener("scroll", () =>
        console.log({ scrollYProgress: scrollYProgress, scrollY })
      );
    }, []);
  
    useEffect(() => {
      if (!carouselRef || !carouselRef.current) return;
      const parent = carouselRef.current.parentElement;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
  
      const resetCarouselEndPosition = () => {
        if (carouselRef && carouselRef.current) {
          const newPosition =
            carouselRef.current.clientWidth -
            window.innerWidth +
            scrollbarWidth +
            (parent as HTMLElement).offsetLeft * 2;
  
          setCarouselEndPosition(-newPosition);
        }
      };
  
      resetCarouselEndPosition();
      const handleResize = throttle(10, resetCarouselEndPosition);
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return (
      <div className="mt-40">
        <section className='flex flex-col' ref={ref}>
          <h2 className="text-6xl font-bold text-center">
              Gallery
          </h2>
          <div className="galleryContainer" style={{ height: "300vh" }}>
            <div className="sticky-wrapper">
              <motion.div ref={carouselRef} className="gallery-carousel" style={{ x }}>
                {Array.from(Array(8).keys()).map((i) => (
                  <motion.div
                    {...slideAnimation}
                    key={i}
                    className="carousel__slide"
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-8/12 mx-auto flex flex-col justify-center items-center mb-0">
            <h2 className="text-4xl border-2 border-black rounded-xl px-4 py-2 mb-4">Start Customizing</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              autem est vitae magni alias, delectus atque repudiandae maiores
              molestiae fuga error a, laboriosam velit voluptas odio inventore
              modi libero, ratione quas neque. Corporis, nam?
            </p>
        </section>
      </div>
    );
}