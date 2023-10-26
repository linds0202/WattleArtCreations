'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { scrollIntoTheView } from './Home1'


const Home1_hiw = () => {

    const words = 'How It Works';
    const letters = words.split('');

    const FADE_IN_ANIMATION_VARIANTS = {
        initial: { y: 200, opacity: 0 },
        animate: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.1 } }),
    };



  return (
    <div className='relative w-full flex flex-col items-center text-white bg-gradient-to-b from-black from-40% to-[#282828] to-90%'>
        <div className="absolute -top-[5%] right-[18%]">
            <motion.div
                className="relative w-[50px] h-[50px] rounded-xl cursor-pointer"
                initial={{ scale: .7, rotate: 5 }}
                animate={{ scale: .85, rotate: -15}}
                transition={{ type: "spring", duration: 1, repeatType: "reverse", repeat: Infinity }}
            >
                <motion.img 
                    className="absolute top-0 left-0 w-[50px] h-[50px] rounded-xl"
                    src='images/gallery/splat1.png' 
                    initial={{ opacity: .8 }}
                    whileHover={{ 
                        opacity: 1,
                        transition: { duration: .3}
                    }}
                />
            </motion.div>
        </div>

        <div className="absolute -top-[15%] right-[35%]">
            <motion.div
                className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                initial={{ scale: .7, rotate: 45 }}
                animate={{ scale: .8, rotate: 65}}
                transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
            >
                <motion.img 
                    className="absolute top-0 left-0 w-[75px] h-[75px] rounded-xl"
                    src='images/gallery/splat1.png' 
                    initial={{ opacity: .7 }}
                    whileHover={{ 
                        opacity: .9,
                        transition: { duration: .3}
                    }}
                />
            </motion.div>
        </div>

        <div className="absolute -top-[10%] right-[25%] z-[20]">
            <motion.div
                className="relative w-[150px] h-[150px] rounded-xl cursor-pointer"
                whileHover={{
                    scale: 2.5,
                    rotate: 360,
                    transition: { duration: .3},
                }}
            >
                <motion.img 
                    className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                    src='images/gallery/splat2.png' 
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
    
        <div className="absolute top-0 right-[3%] z-[20]">
            <motion.div
                className="relative w-[200px] h-[200px] rounded-xl cursor-pointer"
                whileHover={{
                    scale: 1.4,
                    rotate: 360,
                    transition: { duration: .3},
                }}
            >
                <motion.img 
                    className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                    src='images/gallery/splat1.png' 
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


        <div className='w-full px-10 flex justify-around items-center'>
            <div className='w-3/12 p-2'>
                <motion.img 
                    src='/images/HIWIcons/hiw.png' 
                    alt='icon for how it works' 
                    className='p-8'
                    animate={{ rotate: [0,360]}}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 1],
                        repeat: Infinity,
                    }}
                />
            </div>
            
            <div className='text-white w-1/2'>
                <div className='flex'>
                    {letters.map((letter, i) => (
                        <motion.p
                            key={i}
                            variants={FADE_IN_ANIMATION_VARIANTS}
                            initial="initial"
                            whileInView='animate'
                            custom={i}
                            viewport={{amount: 0.4, once: true}}
                            className="font-serif text-white text-center font-display text-6xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[5rem]"
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
        
        <div className='w-full px-8 flex justify-around items-stretch mb-[10px]'>
            <div
                className='w-1/4 mx-2  p-8 rounded-xl hover:bg-gradient-to-t from-[#74ffe8]/25 to-[#0075FF]/25 hover:bg-opacity-25'
            >
                <h4 className='text-5xl text-[#0075FF] font-bold'>1.</h4>
                <h3 className='font-serif text-3xl font-bold mt-4'>Design Character(s)</h3>
                <p className='mt-8 text-lg'>Provide details about your desired artwork, including size, medium, subject matter, and any reference images or inspiration. The more information you provide, the better we can tailor the artwork to your vision.</p>
            </div>

            <div
                className='w-1/4 mx-2  p-8 rounded-xl hover:bg-gradient-to-t from-[#74ffe8]/25 to-[#0075FF]/25 hover:bg-opacity-25'
            >
                <h4 className='text-5xl text-[#0075FF] font-bold'>2.</h4>
                <h3 className='font-serif text-3xl font-bold mt-4'>Custom Quote</h3>
                <p className='mt-8 text-lg'>Based on your project specifications, we&apos;ll provide a custom quote for your art commission. Our transparent pricing ensures no surprises along the way.</p>
            </div>

            <div
                className='w-1/4 mx-2  p-8 rounded-xl hover:bg-gradient-to-t from-[#74ffe8]/25 to-[#0075FF]/25 hover:bg-opacity-25'
            >
                <h4 className='text-5xl text-[#0075FF] font-bold'>3.</h4>
                <h3 className='font-serif text-3xl font-bold mt-4'>Collaborate</h3>
                <p className='mt-8 text-lg'>Once you&apos;re happy with the quote, we will reserve a payment and connect you with the artist to begin the creative process. Collaborate directly with the artist to refine your vision and watch your artwork come to life.</p>
            </div>

            <div
                className='w-1/4 mx-2  p-8 rounded-xl hover:bg-gradient-to-t from-[#74ffe8]/25 to-[#0075FF]/25 hover:bg-opacity-25'
            >
                <h4 className='text-5xl text-[#0075FF] font-bold'>4.</h4>
                <h3 className='font-serif text-3xl font-bold mt-4'>Custom Artwork</h3>
                <p className='mt-8 text-lg'>Upon completion, you&apos;ll recieve your stunning custom art piece, ready to display and enjoy for years to come. Once you&apos;re happy, you can choose when to release the reserved payment directly to the artist!</p>
            </div>
        </div>

        <div 
            className='w-1/4 mt-8 py-2 px-4 border-2 border-[#0075FF] rounded-xl text-white text-center text-4xl bg-[#0075FF]/50 cursor-pointer hover:bg-[#0075FF] hover:scale-105'
            onClick={() => scrollIntoTheView('cta')} 
        >
            <p>Start Customizing</p>
        </div>
        
    </div>
  )
}

export default Home1_hiw