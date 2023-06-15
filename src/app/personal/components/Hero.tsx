import React from 'react'
import { motion } from 'framer-motion'

const container = {
  show: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.5,
      },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};



const Hero = () => {
  return (
    <div className='relative w-full h-screen '>
      <motion.div
          variants={container}
          initial="hidden"
          animate="show" 
          className="relative h-screen -z-1"
      >
        
          <motion.img 
            src='./heroImgs/heroImg1.png'
            variants={item}
            className='absolute top-[12%] left-[27%] object-cover w-[450px] h-[450px]' 
          />

          <motion.div
            variants={item}
          >
            <motion.img 
              src='./heroImgs/heroImg9.jpg'
              className='absolute top-[10%] left-[5%] object-cover w-[250px] h-[200px]' 
            />

            <motion.img 
              src='./heroImgs/heroImg19.png'
              className='absolute top-[30%] left-[65%] object-cover w-[250px] h-[250px]' 
            />

          </motion.div>

          <motion.div
            variants={item}
          >
            <motion.img 
              src='./heroImgs/heroImg17.png'
              className='absolute top-[42%] left-[5%] object-cover object-left-top w-[250px] h-[200px]' 
            />

            <motion.img 
              src='./heroImgs/heroImg3.png'
              className='absolute top-[70%] left-[65%] object-cover w-[250px] h-[250px]' 
            />

          </motion.div>

          <motion.div
            variants={item}
          >
          <motion.img 
              src='./heroImgs/heroImg15.png'
              className='absolute top-[74%] left-[5%] object-cover w-[250px] h-[200px]' 
          />

          <motion.img 
              src='./heroImgs/heroImg6.JPG'
              className='absolute top-[82%] left-[27%] object-cover object-left-top w-[200px] h-[200px]' 
            />

          <motion.img 
              src='./heroImgs/heroImg21.png'
              className='absolute top-[82%] left-[45%] object-cover object-left-top w-[200px] h-[200px]' 
            />

          </motion.div>

        </motion.div>



        <motion.img 
          className="absolute -top-2 left-0 z-10" 
          src='./drips/hero_drip_alt2.png'
          initial= {{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
          className='z-20 absolute top-5 right-20'
        >
            <h1 className="text-orange-500 font-bold text-5xl">Wattle Art Creations</h1>
        </motion.div>


    </div>
  )
}

export default Hero