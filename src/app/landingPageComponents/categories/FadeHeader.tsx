'use client'

import React from 'react'
import Image from 'next/image';
import LeftSplash from '../../../../public/images/drips/side_splashL.png'
import RightSplash from '../../../../public/images/drips/side_splashR.png'
import { motion } from 'framer-motion'

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { type: "spring" } },
};

export const FadeHeader = () => {
  return (
    <motion.div
      className='w-10/12 h-1/5 mx-auto mb-10 flex justify-between items-center'
      key='category'
      initial="hidden"
      whileInView='show'
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: .5,
            // staggerChildren: .25,
          },
        },
      }}
    >
      <motion.div
        className="w-1/3 h-[100%] mx-auto"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className='relative w-full h-full object-contain'>
            <Image 
              src={LeftSplash} 
              alt="Left black paint splash" 
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={true}  
            />
          </div>
        {/* <img src="./images/drips/side_splashL.png" className="w-full" alt='black paint drip accent'/> */}
      </motion.div>
      <motion.h1
        className="mx-8 text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0, transition: { delay: 1, type: "spring" } }}
        viewport={{ once: true }}
      >
        Categories
      </motion.h1>
      <motion.div
        className="w-1/3 h-[100%] mx-auto"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className='relative w-full h-full object-contain'>
            <Image 
              src={RightSplash} 
              alt="Left black paint splash" 
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={true}  
            />
          </div>
        {/* <img src="./images/drips/side_splashL.png" className="w-full" alt='black paint drip accent'/> */}
      </motion.div>
      {/* <motion.div
        className="mx-auto"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <img src="./images/drips/side_splashR.png" className="w-full" alt='black paint drip accent'/>
      </motion.div> */}
    </motion.div>
    
    
  )
}

{/* <div className='flex justify-center mb-8'>
        <div className='w-[50%] flex flex-col items-center'>
            <motion.h2 
              className='text-6xl font-bold mb-4' 
              initial={{opacity: 0, y: 100}} 
              whileInView={{opacity: 1, y: 0}} 
              transition={{once: true, ease: 'easeInOut'}}
            >
              Categories:
            </motion.h2>
            <motion.div 
              className='h-[2px] bg-[#282828] pl-2' 
              initial={{opacity: 0, left: 0, width: 0, y:100}} 
              whileInView={{opacity: 1, width: '35%', y:0}} 
              transition={{once: true, ease: 'easeInOut'}}
            />
        </div>
        
    </div> */}