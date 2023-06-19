'use client'

import Link from 'next/link';
import "./globals.css";
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from './firebase/auth';

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

export default function Home() {
  const { isLoading } = useAuth();

  const [isOn, setIsOn] = useState(true);
  const [rotater, setRotater] = useState(0)
  
  const toggleSwitch = () => {
    setIsOn(!isOn)
    isOn ? setRotater(360) : setRotater(0)
  }; 


  
  return ((isLoading) ? 
  <></>
  :
    <main className={`h-[90vh] p-24 flex flex-col justify-center items-center ${isOn ? 'bg-white' : 'bg-[#282828]'}`}>
        <div 
          className={`home-layout flex items-center w-11/12 m-auto text-3xl ${isOn ? 'text-black' : 'text-white'}`}
          data-ison={isOn}
        >
          <motion.div
            layout 
            transition={{
              spring,
              layout: { duration: 1 }
            }}
          >
            <Link 
              href={isOn ? '/personal' : '/corporate'}
              className={` block w-5/12 text-6xl font-bold`}
            >
              {isOn ? 'Personal' : 'Corporate'}
            </Link>
          </motion.div>
          
          <motion.img 
            layout 
            initial={{
              rotateY: 0,
            }}
            animate={{
              rotateY: rotater,
            }}
            transition={{
              layout: { duration: 1 },
              type: 'tween',
              ease: 'easeInOut',
              repeat: 0,
              duration: 1,
            }}
            src='./Logo_Full_ups.png' 
            className='w-5/12'
          />
        </div>
        
        
      {/* </div> */}
      <div className="switch border-2 border-black" data-ison={isOn} onClick={toggleSwitch}>
          <motion.div className="handle" layout transition={spring} />
      </div>
    </main>
  )
}
