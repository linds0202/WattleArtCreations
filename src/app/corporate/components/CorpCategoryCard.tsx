import React from 'react'
import { motion } from 'framer-motion'
import { ModeProps } from './CorpHome'

const CorpCategoryCard = ({ setMode, mode }: ModeProps) => {
  return (
    <div className='w-2/12'>
        <h3 className='text-center mb-4 font-bold'>{mode}</h3>
        <motion.button 
            className="text-xl mb-4 border-2 border-black w-full rounded-md px-4 py-2 hover:bg-black hover:text-white transition" onClick={() => setMode(mode)} 
            whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
            whileTap={{ scale: 1.05 }}
        >
            Start
        </motion.button>
    </div>
    
)
}

export default CorpCategoryCard