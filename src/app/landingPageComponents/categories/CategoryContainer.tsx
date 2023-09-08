import {  useState } from 'react'
import { ModeProps } from '../Home'
import { FadeHeader } from './FadeHeader'
import { motion, AnimatePresence } from 'framer-motion'
import SlideCard from './SlideCard'

const CategoryContainer = ({ setMode, mode }: ModeProps) => {

  const categories = ['Photorealistic', 'Anime', 'NSFW']
  const [selectedCat, setSelectedCat] = useState(mode === 'Home' ? categories[0] : categories[categories.indexOf(mode)]);

  return (
    <div className='w-full h-[100vh] mt-[50px] mb-[125px]'>
      <FadeHeader />
        
      <nav className='w-11/12 mx-auto border-2 border-[#282828] rounded-t-xl pl-2 pt-2 pr-2'>
        <ul className='flex rounded-t-xl'>
          {categories.map((item, i) => (
            <li
              key={i}
              className={`category-li ${item === selectedCat ? "selected" : ""}`}
              onClick={() => setSelectedCat(item)}
            >
              <p className='text-2xl py-2'>{item}</p>
              {item === selectedCat ? (
                // add into motion.div class - layoutId="underline"
                <motion.div className="underline relative" > 
                  <img src="./drips/f_hero_drip_b.png" className="w-full absolute top-[100%] left-0 right-0" />
                </motion.div>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className='w-11/12 mx-auto border-4 border-[#282828] rounded-b-3xl'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedCat ? selectedCat : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='relative'
          >
            {selectedCat ? <SlideCard mode={selectedCat} setMode={setMode} /> : "😋"}
            <img src="./drips/personal_underHang.png" className="w-full absolute top-[98%] left-0 right-0" />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default CategoryContainer