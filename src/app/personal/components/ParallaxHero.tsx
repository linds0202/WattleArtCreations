import { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";



const ParallaxHero = () => {
    const ref = useRef(null);
    
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [-400, 400]);
    const dripY = useTransform(scrollYProgress, [0, 0.25, 1], ["-10%", "0%", "100%"]);
    // const dripOpacity = useTransform(scrollYProgress, [0, .25], [0, 1]);
    // className='border-2 border-red-800 w-full h-[200vh] flex justify-center items-center relative'

    return (
        <section ref={ref} className='relative hero w-full h-[200vh] max-h-[200vh] border-2 border-red-800' >
            <motion.img 
                src='./drips/hero_drip_alt2.png' 
                className='absolute top-0 left-0 w-[100%] h-[50%]'
                style={{ 
                    y: dripY,
                    // opacity: dripOpacity
                }}
            />
            <motion.h2
                className='absolute top-[50%] w-[100%] h-[100%] text-7xl text-white' 
                style={{ y: y }}
            >
                Wattle Art Creations
            </motion.h2>
        </section>
    );
}

export default ParallaxHero