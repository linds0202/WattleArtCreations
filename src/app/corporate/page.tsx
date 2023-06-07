'use client' 

import Link from "next/link"
import { useRef } from 'react'
import { useScroll, motion, useTransform } from "framer-motion"

const animateOrder = {
  initial: 0,
  titleIn: 0.2,
  titleOut: 0.4,
  linkOneStart: 0.4,
  linkOneEnd: 0.6,
  linkTwoStart: 0.5,
  linkTwoEnd: 0.7,
  linkThreeStart: 0.6,
  linkThreeEnd: 0.8,
  linkFourStart: 0.7,
  linkFourEnd: 0.9,

}

export default function Corporate() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const titleTranslate = useTransform(
    scrollYProgress,
    [animateOrder.initial, animateOrder.titleIn, animateOrder.titleOut],
    [-20, 50, 120]
  )

  const titleOpacity = useTransform(
    scrollYProgress,
    [animateOrder.titleIn, animateOrder.titleOut],
    [0, 1]
  )

  const linkOneX = useTransform(
    scrollYProgress,
    [animateOrder.linkOneStart, animateOrder.linkOneEnd],
    ["-100vw", "80vw"]
  )

  const linkOneRotate = useTransform(
    scrollYProgress,
    [animateOrder.linkOneStart, animateOrder.linkOneEnd],
    ["-360deg", "360deg"]
  )

  const linkTwoX = useTransform(
    scrollYProgress,
    [animateOrder.linkTwoStart, animateOrder.linkTwoEnd],
    ["-100vw", "55vw"]
  )

  const linkTwoRotate = useTransform(
    scrollYProgress,
    [animateOrder.linkTwoStart, animateOrder.linkTwoEnd],
    ["-360deg", "360deg"]
  )
  
  const linkThreeX = useTransform(
    scrollYProgress,
    [animateOrder.linkThreeStart, animateOrder.linkThreeEnd],
    ["-100vw", "30vw"]
  )
  
  const linkThreeRotate = useTransform(
    scrollYProgress,
    [animateOrder.linkThreeStart, animateOrder.linkThreeEnd],
    ["-360deg", "360deg"]
  )

  const linkFourX = useTransform(
    scrollYProgress,
    [animateOrder.linkFourStart, animateOrder.linkFourEnd],
    ["-100vw", "5vw"]
  )

  const linkFourRotate = useTransform(
    scrollYProgress,
    [animateOrder.linkFourStart, animateOrder.linkFourEnd],
    ["-360deg", "360deg"]
  )

    return (
        <main ref={targetRef} >
          <div className="relative h-[600vh]">
            <motion.div
              className="fixed -top-[10%] w-full flex justify-center items-center"
              style={{
                translateY: titleTranslate
              }}
            >
              <img className="w-full" src="./full-divider-drip.png" />
            </motion.div>
            <motion.div 
              className="fixed top-[20%] left-[45%] w-[300px] h-[150px] text-black flex flex-col justify-center items-center"
              style={{
                opacity: titleOpacity
              }}
            >
              <p className="text-6xl">Title</p>
              <p className="text-xl mt-4">Small tagline of things to say</p>
            </motion.div>
            <motion.div 
              className="fixed top-[55%] w-[200px] h-[200px] rounded-full text-black bg-white shadow-2xl underline flex justify-center items-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
              style={{
                translateX: linkOneX,
                rotate: linkOneRotate
              }}
            >
              <Link href={{
                pathname: '/corporate/orders',
                query: {productChoice: 'Video Game Assets'},
                }} 
                className="text-2xl no-underline text-center"
              >
                <motion.img 
                  className="w-full absolute top-4 left-0" 
                  src="./drips/circle_drip_frame.png"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scaleY: 1.15,
                    transition: { duration: 0.5 },
                  }}
                />
                <p>Video Game Assets</p>
              </Link>
            </motion.div>
            <motion.div 
              className="fixed top-[55%] w-[200px] h-[200px] rounded-full text-black bg-white shadow-2xl underline flex justify-center items-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
              style={{
                translateX: linkTwoX,
                rotate: linkTwoRotate
              }}
            >
              <Link href={{
                pathname: '/corporate/orders',
                query: {productChoice: 'Table Top Illustrations'},
                }} 
                className="text-2xl no-underline text-center"
              >
                <motion.img 
                  className="w-full absolute top-4 left-0" 
                  src="./drips/circle_drip_frame.png"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scaleY: 1.15,
                    transition: { duration: 0.3 },
                  }}
                />
                <p>Table Top Illustrations</p>
              </Link>
            </motion.div>
            <motion.div 
              className="fixed top-[55%] w-[200px] h-[200px] rounded-full text-black bg-white shadow-2xl flex justify-center items-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              style={{
                translateX: linkThreeX,
                rotate: linkThreeRotate
              }}
            >
              <Link href={{
                pathname: '/corporate/orders',
                query: {productChoice: 'Story Or Book Illustrations'},
                }} 
                className="text-2xl no-underline text-center"
              >
                <motion.img 
                  className="w-full absolute top-4 left-0" 
                  src="./drips/circle_drip_frame.png"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scaleY: 1.15,
                    transition: { duration: 0.3 },
                  }}
                />
                <p>Story / Book Illustrations</p>
              </Link>
            </motion.div>
            <motion.div 
              className="fixed top-[55%] w-[200px] h-[200px] rounded-full text-black bg-white shadow-2xl flex justify-center items-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              style={{
                translateX: linkFourX,
                rotate: linkFourRotate
              }}
            >
              <Link href={{
                pathname: '/corporate/orders',
                query: {productChoice: 'Advertising'},
                }} 
                className="text-2xl no-underline text-center"
              >
                <motion.img 
                  className="w-full absolute top-4 left-0" 
                  src="./drips/circle_drip_frame.png"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scaleY: 1.15,
                    transition: { duration: 0.5 },
                  }}
                />
                <p>Advertising</p>
              </Link> 
            </motion.div>
          </div>
        </main>

             
    )
}

