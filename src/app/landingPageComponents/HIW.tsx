'use client'

import React from 'react'

import { motion } from 'framer-motion'

const HIW = () => {

    const list = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.5,
            }
        }

    }

    const listItemVarient = {
        hidden: {
            opacity: 0,
            x: 200,
            transition: {
                duration: 0
            }
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                duration: .3
            }
        }
    }

const words = 'How It Works';
const letters = words.split('');

const FADE_IN_ANIMATION_VARIANTS = {
    initial: { y: 200, opacity: 0 },
    animate: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
  };



  return (
    <div className='w-full flex flex-col items-center pt-[100px] mb-[100px] text-black'>
        <div className='w-6/12 mx-auto mb-[50px] flex justify-center'>
            {/* <div className='w-[50%] flex flex-col items-start'> */}
            {letters.map((letter, i) => (
                <motion.p
                    key={i}
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="initial"
                    whileInView='animate'
                    custom={i}
                    viewport={{amount: 0.4, once: true}}
                    className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                >
                    {letter === ' ' ? <span>&nbsp;</span> : letter}
                </motion.p>
                ))}
                {/* <motion.h2 
                    className='text-6xl font-bold mb-2' 
                    initial={{opacity: 0, x: -200}} 
                    whileInView={{opacity: 1, x: 0}} 
                    transition={{ease: 'easeInOut', duration: .5}}
                    viewport={{amount: 0.4, once: true}}
                >
                    How it works:
                </motion.h2> */}
                {/* <motion.div 
                className='h-[2px] bg-black pl-2' 
                initial={{opacity: 0, left: 0, width: 0, x:200}} 
                whileInView={{opacity: 1, width: '45%', x:35}} 
                transition={{ease: 'easeInOut', duration: .5}}
                viewport={{amount: 0.4, once: true}}
            /> */}
            {/* </div> */}
        </div>
        
        <motion.ul 
            className='w-full px-[5%] flex justify-around items-center' 
            variants={list} 
            initial='hidden' 
            whileInView='show' 
            viewport={{amount: 0.4, once: true}}
        >       
            <motion.li className='text-lg' variants={listItemVarient}>
                <div className='relative w-[275px] h-[250px] py-8 px-4 bg-white flex flex-col justify-center items-center border-2 border-black rounded-xl box-shadow-md '>
                    <motion.img
                        className='w-[96px] h-[96px]' src='./HIWIcons/customize.png' />
                    <motion.p 
                        className='text-black text-center font-bold pt-4 text-lg'
                    >
                        Design Character(s)
                    </motion.p>
                    <motion.div 
                        initial={{opacity: 0}}
                        whileHover={{opacity: 1}}
                        className='absolute top-0 left-0 w-[275px] h-[250px] border-2 border-white rounded-xl bg-[#282828] p-4 text-center'
                    >
                        <h4 className='text-white text-lg font-bold pb-4'>Step 1</h4>
                        <p className='text-white text-base'>Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</p>
                    </motion.div>
                </div>
                
            </motion.li>
            <motion.li className='text-lg' variants={listItemVarient}>
                <div className='relative w-[275px] h-[250px] py-8 px-4 flex flex-col justify-center items-center border-2 border-black rounded-xl box-shadow-md '>
                    <motion.img
                        className='w-[96px] h-[96px]' src='./HIWIcons/quote.png' />
                    <motion.p 
                        className='text-black text-center font-bold pt-4 text-lg'
                    >
                        Custom Quote
                    </motion.p>
                    <motion.div 
                        initial={{opacity: 0}}
                        whileHover={{opacity: 1}}
                        className='absolute top-0 left-0 w-[275px] h-[250px] border-2 border-[#282828] rounded-xl bg-[#282828] p-4 text-center'
                    >
                        <h4 className='text-white text-lg font-bold pb-4'>Step 2</h4>
                        <p className='text-white text-base'>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</p>
                    </motion.div>
                </div>
            </motion.li>
            <motion.li className='text-lg' variants={listItemVarient}>
                <div className='relative w-[275px] h-[250px] py-8 px-4 flex flex-col justify-center items-center border-2 border-black rounded-xl box-shadow-md '>
                    <motion.img
                        className='w-[96px] h-[96px]' src='./HIWIcons/conversation.png' />
                    <motion.p 
                        className='text-black text-center font-bold pt-4 text-lg'
                    >
                        Collaborate
                    </motion.p>
                    <motion.div 
                        initial={{opacity: 0}}
                        whileHover={{opacity: 1}}
                        className='absolute top-0 left-0 w-[275px] h-[250px] border-2 border-[#282828] rounded-xl bg-[#282828] p-4 text-center'
                    >
                        <h4 className='text-white text-lg font-bold pb-4'>Step 3</h4>
                        <p className='text-white text-base'>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</p>
                    </motion.div>
                </div>
            </motion.li>
            <motion.li className='text-lg' variants={listItemVarient}>
                <div className='relative w-[275px] h-[250px] py-8 px-4 flex flex-col justify-center items-center border-2 border-black rounded-xl box-shadow-md '>
                    <motion.img
                        className='w-[96px] h-[96px]' src='./HIWIcons/artwork2.png' />
                    <motion.p 
                        className='text-black text-center font-bold pt-4 text-lg'
                    >
                        Custom Artwork
                    </motion.p>
                    <motion.div 
                        initial={{opacity: 0}}
                        whileHover={{opacity: 1}}
                        className='absolute top-0 left-0 w-[275px] h-[250px] border-2 border-[#282828] rounded-xl bg-[#282828] p-4 text-center'
                    >
                        <h4 className='text-white text-lg font-bold pb-4'>Step 4</h4>
                        <p className='text-white text-base'>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</p>
                    </motion.div>
                </div>
            </motion.li>
        </motion.ul>
    </div>
  )
}

export default HIW


{/* <motion.li className='w-10/12 text-lg'  variants={listItemVarient}>
    <span className='font-bold text-xl mr-2'>1. </span>Design your character(s): Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.
</motion.li>
<motion.li className=' w-10/12 text-lg' variants={listItemVarient} ><span className='font-bold text-xl mr-2'>2. 
    </span>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.
</motion.li>
<motion.li className=' w-8/12 text-lg' variants={listItemVarient}>
    <span className='font-bold text-xl mr-2'>3. </span>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.
</motion.li>
<motion.li className=' w-10/12 text-lg' variants={listItemVarient}>
    <span className='font-bold text-xl mr-2'>4. </span>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!
</motion.li> */}