import {
    motion,
    MotionProps,
    useTransform,
    useScroll
} from "framer-motion";
import Image from "next/image";
import { throttle } from "throttle-debounce-ts";
import { useEffect, useRef, useState } from "react";
  
function useElementViewportPosition(ref: React.RefObject<HTMLElement>) {
    const [position, setPosition] = useState<[number, number]>([0, 0]);
  
    useEffect(() => {
      if (!ref || !ref.current) return;
  
      const pageHeight = document.body.scrollHeight;
      const start = ref.current.offsetTop + 600;
      const end = start + ref.current.offsetHeight - 600;
  
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

    const photoArr = ["/images/photoImgs/photo8.png", "/images/animeImgs/anime1.png", "/images/photoImgs/photo5.jpg", "/images/photoImgs/photo2.png","/images/animeImgs/anime8.png","/images/animeImgs/anime10.png","/images/photoImgs/photo3.png", "/images/animeImgs/anime3.png" ]

  
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
      <div className="mt-4">
        
        <section className='flex flex-col' >
          
          <div className="galleryContainer" style={{ height: "300vh" }} ref={ref}>
          
            <div className="sticky-wrapper">
              <h2 className="text-6xl font-bold text-center w-full my-10">
                Gallery
              </h2>
              <motion.div ref={carouselRef} className="gallery-carousel" style={{ x }}>
                {photoArr.map((i) => (
                  <motion.div
                    {...slideAnimation}
                    key={i}
                    className="carousel__slide"
                  >
                    <div className='relative w-[300px] h-[300px] object-cover rounded-xl'>
                      <Image 
                        className="rounded-xl"
                        src={`${i}`} 
                        alt="art gallery image" 
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority={false}  
                      />
                    </div>
                    {/* <img className="w-[300px] h-[300px] object-cover rounded-xl" src={`${i}`} alt='gallery image'/> */}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
}