'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { scrollIntoTheView } from './Home1'


const Home2_hiw = () => {

    const words = 'How It Works';
    const letters = words.split('');

    const FADE_IN_ANIMATION_VARIANTS = {
        initial: { y: 200, opacity: 0 },
        animate: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
    };



  return (
    <div className='relative w-full mt-32 pb-10 flex flex-col items-center text-white bg-gradient-to-b from-black from-40% to-[#282828] to-90%'>
        <object type="image/svg+xml" data="images/HIWIcons/b_w_bricks.svg" className="absolute top-0 left-0 w-[100%] h-[100%]"/>
        <div className='z-10'>

            <div className="absolute -top-[10%] right-[15%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl"
                    whileHover={{
                        scale: 2.5,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg" 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />        
                
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src='images/animeImgs/anime8.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
        
            <div className="absolute top-[10%] right-[3%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl"
                    whileHover={{
                        scale: 1.4,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src='images/photoImgs/photo5.jpg' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>


            <div className='w-full px-10 flex items-center'>
                <div className='w-3/12 p-2 ml-10'>
                    <motion.img 
                        src='/images/HIWIcons/hiw.png' 
                        alt='icon for how it works' 
                        className='ml-8 p-8'
                        animate={{ rotate: [0,360]}}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            times: [0, 1],
                            repeat: Infinity,
                        }}
                    />
                </div>
                
                <div className='text-white w-5/12 ml-[7%]'>
                    <div className='flex'>
                        {letters.map((letter, i) => (
                            <motion.p
                                key={i}
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                initial="initial"
                                whileInView='animate'
                                custom={i}
                                viewport={{amount: 0.4, once: true}}
                                className="font-serif text-white text-center font-display text-6xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                            >
                                {letter === ' ' ? <span>&nbsp;</span> : letter}
                            </motion.p>
                        ))}
                    </div>

                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 2}}
                        className='text-2xl mt-8'
                    >
                        Some thing here describing the process. It can be a sentence or two about whatever you want the customers to know.
                    </motion.p>

                </div>
                
            </div>
            
            <div className='w-full pl-12 pr-10 flex justify-around items-stretch mb-[10px]'>
                <div
                    className='w-1/4 mx-2 p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>1.</h4>
                    <h3 className='font-serif text-3xl font-bold mt-4'>Design Character(s)</h3>
                    <p className='mt-8 text-lg'>Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</p>
                </div>

                <div
                    className='w-1/4 mx-2 p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>2.</h4>
                    <h3 className='font-serif text-3xl font-bold mt-4'>Custom Quote</h3>
                    <p className='mt-8 text-lg'>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</p>
                </div>

                <div
                    className='w-1/4 mx-2 p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>3.</h4>
                    <h3 className='font-serif text-3xl font-bold mt-4'>Collaborate</h3>
                    <p className='mt-8 text-lg'>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</p>
                </div>

                <div
                    className='w-1/4 mx-2 p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>4.</h4>
                    <h3 className='font-serif text-3xl font-bold mt-4'>Custom Artwork</h3>
                    <p className='mt-8 text-lg'>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</p>
                </div>
            </div>

            <div 
                className='w-1/4 mx-auto mt-8 py-2 px-4 rounded-xl text-black text-center text-4xl bg-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => scrollIntoTheView('cta')} 
            >
                <p>Start Customizing</p>
            </div>
        </div>
    </div>
  )
}

export default Home2_hiw