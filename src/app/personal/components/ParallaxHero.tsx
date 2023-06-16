import { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";



const ParallaxHero = () => {
    const ref = useRef(null);
    
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [-900, 735]);
    const dripY = useTransform(scrollYProgress, [0, .2, .4, .7, 1], ["-10%", "50%", "90%", "150%", "210%"]);
    const dripOpacity = useTransform(scrollYProgress, [0, .15], [0, 1]);
    const titleOpacity = useTransform(scrollYProgress, [.5, .8], [0, 1]);
    const titleScale = useTransform(scrollYProgress, [.5, .8, .9], [0, 1, 1.1]);


    return (
        <section ref={ref} className='relative hero w-full h-[350vh]' >
            
            <motion.img 
                src='./drips/hero_drip_alt3.png' 
                className='absolute top-0 left-0 w-[100%] h-[1/3]'
                style={{ 
                    y: dripY,
                    opacity: dripOpacity
                }}
            />
            <motion.h2
                className='absolute top-[50%] left-[20%] w-[60%] h-auto text-7xl font-extrabold text-black rounded-full p-8' 
                style={{ 
                    y: y,
                    opacity: titleOpacity,
                    scale: titleScale,
                    backgroundColor: 'rgba(255,255,255, .8)'
                }}
            >
                Wattle Art Creations
            </motion.h2>
        </section>
    );
}

export default ParallaxHero

// const y = useTransform(scrollYProgress, [0, 1], [-400, 400]);
//     const dripY = useTransform(scrollYProgress, [0, 0.2, .6, 1], ["-10%", "10%", "60%", "110%"]);
//     const dripOpacity = useTransform(scrollYProgress, [.05, .35], [0, 1]);
//     const titleOpacity = useTransform(scrollYProgress, [.3, .5], [0, 1]);


{/* <section ref={ref} className='relative hero w-full h-[200vh] max-h-[200vh]' >
            <motion.img 
                src='./drips/hero_drip_alt2.png' 
                className='absolute top-0 left-0 w-[100%] h-[50%]'
                style={{ 
                    y: dripY,
                    opacity: dripOpacity
                }}
            />
            <motion.h2
                className='absolute top-[50%] w-[100%] h-[100%] text-7xl font-extrabold text-white' 
                style={{ 
                    y: y,
                    opacity: titleOpacity
                }}
            >
                Wattle Art Creations
            </motion.h2>
        </section> */}


        // const y = useTransform(scrollYProgress, [0, 1], [-600, 800]);
        // const dripY = useTransform(scrollYProgress, [0, .25, .5, 1], ["-10%", "50%", "90%", "160%"]);
        // const dripOpacity = useTransform(scrollYProgress, [0, .15], [0, 1]);
        // const titleOpacity = useTransform(scrollYProgress, [.2, .4], [0, 1]);
        // const titleScale = useTransform(scrollYProgress, [.8, 1], [1, 1.2]);