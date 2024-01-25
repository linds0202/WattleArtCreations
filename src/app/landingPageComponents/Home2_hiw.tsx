'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { scrollIntoTheView } from './Home1'
import { useCategoriesContext } from '../context/CategoriesContext'


const Home2_hiw = () => {
    const { categories } = useCategoriesContext()
    
    const words = 'How It Works';
    const letters = words.split('');

    const FADE_IN_ANIMATION_VARIANTS = {
        initial: { y: 200, opacity: 0 },
        animate: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
    };


  return (
    <div className='relative w-full lg:mt-32 pb-10 flex flex-col items-center text-white bg-gradient-to-b from-black from-40% to-[#282828] to-90%'>
        
        <object type="image/svg+xml" data="images/HIWIcons/b_w_bricks.svg" className="absolute top-0 left-0 w-[100%] h-[100%]"/>
        
        <div className='w-full z-10'>

            <div className="absolute -top-36 right-[70%] md:-top-[17%] md:right-[65%] lg:-top-[40%] lg:right-[60%] xl:top-0 xl:right-[10%]">
                <motion.div
                    className="relative w-[75px] h-[75px] md:w-[150px] md:h-[150px] rounded-xl"
                    whileHover={{
                        scale: 2.5,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg" 
                        className="absolute top-0 left-0 w-[75px] h-[75px] md:w-[150px] md:h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />        
                
                    <motion.img 
                        className="absolute top-0 left-0 w-[75px] h-[75px] md:w-[150px] md:h-[150px] object-cover rounded-xl"
                        src={`${categories.home.splatters[0]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
        
            <div className="absolute -top-28 right-[15%] md:-top-[15%] md:right-[15%] lg:-top-[30%] lg:right-[20%] xl:top-[10%] xl:right-[3%]">
                <motion.div
                    className="relative w-[125px] h-[125px] md:w-[200px] md:h-[200px] rounded-xl"
                    whileHover={{
                        scale: 1.4,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[125px] h-[125px] md:w-[200px] md:h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[125px] h-[125px] md:w-[200px] md:h-[200px] object-cover rounded-xl"
                        src={`${categories.home.splatters[1]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>


            <div className='w-full px-10 flex flex-col md:flex-row items-center'>
                <div className='w-10/12 lg:w-1/3 xl:w-3/12 p-2 lg:ml-10'>
                    <motion.img 
                        src='/images/HIWIcons/hiw.png' 
                        alt='icon for how it works' 
                        className='lg:ml-8 p-8'
                        animate={{ rotate: [0,360]}}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            times: [0, 1],
                            repeat: Infinity,
                        }}
                    />
                </div>
                
                <div className='text-white w-10/12 mx-auto lg:w-7/12 xl:w-5/12 lg:mr-0 lg:ml-[4%] xl:ml-[7%]'>
                    <div className='flex justify-center lg:justify-start'>
                        {letters.map((letter, i) => (
                            <motion.p
                                key={i}
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                initial="initial"
                                whileInView='animate'
                                custom={i}
                                viewport={{amount: 0.4, once: true}}
                                className="font-serif text-white text-center font-display text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
                            >
                                {letter === ' ' ? <span>&nbsp;</span> : letter}
                            </motion.p>
                        ))}
                    </div>

                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 2}}
                        className='text-center md:text-left text-2xl mt-8 mb-8 md:mb-0'
                    >
                        Some thing here describing the process. It can be a sentence or two about whatever you want the customers to know.
                    </motion.p>

                </div>
                
            </div>
            
            <div className='w-full lg:pl-12 lg:pr-10 flex flex-wrap lg:flex-nowrap justify-around items-stretch mb-[10px]'>
                <div
                    className='w-10/12 md:w-[45%] lg:w-1/4 mx-2 p-8 lg:p-4 xl:p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>1.</h4>
                    <h3 className='font-serif text-3xl md:text-2xl xl:text-3xl font-bold mt-4'>Design Character(s)</h3>
                    <p className='mt-8 lg:mt-4 xl:mt-8 text-lg lg:text-base xl:text-lg'>Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</p>
                </div>

                <div
                    className='w-10/12 md:w-[45%] lg:w-1/4 mx-2 p-8 lg:p-4 xl:p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>2.</h4>
                    <h3 className='font-serif text-3xl md:text-2xl xl:text-3xl font-bold mt-4'>Custom Quote</h3>
                    <p className='mt-8 lg:mt-4 xl:mt-8 text-lg lg:text-base xl:text-lg'>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</p>
                </div>

                <div
                    className='w-10/12 md:w-[40%] lg:w-1/4 mx-2 p-8 lg:p-4 xl:p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>3.</h4>
                    <h3 className='font-serif text-3xl md:text-2xl xl:text-3xl font-bold mt-4'>Collaborate</h3>
                    <p className='mt-8 lg:mt-4 xl:mt-8 text-lg lg:text-base xl:text-lg'>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</p>
                </div>

                <div
                    className='w-10/12 md:w-[40%] lg:w-1/4 mx-2 p-8 lg:p-4 xl:p-8 border border-transparent rounded-xl hover:bg-[#43b4e4] hover:bg-opacity-20 hover:border-[#43b4e4]/30'
                >
                    <h4 className='text-5xl text-[#43b4e4] font-bold [text-shadow:_3px_2px_4px_rgb(109_176_254_/_40%)]'>4.</h4>
                    <h3 className='font-serif text-3xl md:text-2xl xl:text-3xl font-bold mt-4'>Custom Artwork</h3>
                    <p className='mt-8 lg:mt-4 xl:mt-8 text-lg lg:text-base xl:text-lg'>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</p>
                </div>
            </div>
            
            <div 
                    className='w-10/12 md:w-3/4 lg:w-1/2 mx-auto mt-10 md:mt-8 py-2 px-4 rounded-xl text-white text-center text-4xl md:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)] bg-[#03568c] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                    onClick={() => scrollIntoTheView('cta')}
                >
                    Start Customizing
            </div>   
        </div>
    </div>
  )
}

export default Home2_hiw