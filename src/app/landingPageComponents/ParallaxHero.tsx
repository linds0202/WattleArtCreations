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
    const dripY = useTransform(scrollYProgress, [0, .8, 1], [-1200, 0, 300]);
    const dripOpacity = useTransform(scrollYProgress, [0, .15], [0, 1]);
    const titleOpacity = useTransform(scrollYProgress, [.5, .9], [0, 1]);
    const titleScale = useTransform(scrollYProgress, [.5, .8, .9], [0, 1, 1.1]);




    return (
        <section ref={ref} className='relative hero w-full h-[350vh] flex flex-col justify-start' >
            <motion.img 
                src='./images/drips/parallax_bg3.png' 
                className={`absolute top-0 left-0 w-[100%] object-contain`}   
          
                style={{
                    y: dripY,
                }}
            />
            <motion.img 
                src={'./images/heroImgs/hero_bg4.png' }
                className={`absolute top-0 left-0 w-[100%] h-auto`}   
            />
            {/* <div className={`absolute top-0 left-0 w-[100%] h-[100%] border-2 border-red-600`}  >
                <div className='relative top-0 left-0 w-[100%] h-[100%] object-cover'>
                    <Image 
                        src={Hero} 
                        alt="small Wattle Art Creations logo" 
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority={true}  
                    />
                </div>

            </div> */}
            
            <motion.img 
                src='./images/drips/hero_drip_alt3.png' 
                className={`sticky top-10 left-0 w-[100%]`}   
                initial={{y: -40, opacity: 0}}
                animate={{
                    y: -10,
                    opacity: 1,
                    transition: {delay: .5, duration: 1.5},
                }}
            />
            
            <motion.h2
                className='cursor-default absolute top-[55%] left-[20%] w-[60%] h-auto text-7xl font-extrabold text-black border-4 border-[#282828] rounded-full p-8' 
                style={{ 
                    y: y,
                    opacity: titleOpacity,
                    scale: titleScale,
                    backgroundColor: 'rgba(255,255,255, .8)'
                }}
            >
                <span className='hover:text-[#FF0000]'>W</span>
                <span className='hover:text-[#FF7F00]'>a</span>
                <span className='hover:text-[#FFFF00]'>t</span>
                <span className='hover:text-[#00FF00]'>t</span>
                <span className='hover:text-[#0000FF]'>l</span>
                <span className='hover:text-[#4B0082]'>e</span>
                &ensp;
                <span className='hover:text-[#9400D3]'>A</span>
                <span className='hover:text-[#FF0000]'>r</span>
                <span className='hover:text-[#FF7F00]'>t</span>
                &ensp;
                <span className='hover:text-[#FFFF00]'>C</span>
                <span className='hover:text-[#00FF00]'>r</span>
                <span className='hover:text-[#0000FF]'>e</span>
                <span className='hover:text-[#4B0082]'>a</span>
                <span className='hover:text-[#9400D3]'>t</span>
                <span className='hover:text-[#FF0000]'>i</span>
                <span className='hover:text-[#FF7F00]'>o</span>
                <span className='hover:text-[#FFFF00]'>n</span>
                <span className='hover:text-[#00FF00]'>s</span>
            </motion.h2>
        </section>
    );
}

export default ParallaxHero

