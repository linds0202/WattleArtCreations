import {  useState } from 'react'
import { ModeProps } from '../Home'
import { FadeHeader } from './FadeHeader'
import { motion, AnimatePresence } from 'framer-motion'
import SlideCard from './SlideCard'

const CategoryContainer = ({ setMode, mode }: ModeProps) => {

  const categories = ['Photorealistic', 'Anime', 'NSFW']
  const [selectedCat, setSelectedCat] = useState(categories[0]);

  return (
    <div className='w-full h-[100vh] mt-[75px] mb-[125px]'>
      <FadeHeader />
      {/* <div className="flex justify-center">
          <SlideCards setMode={setMode} />
      </div> */}

      
      <nav className='w-11/12 mx-auto border-2 border-[#eeeeee] rounded-t-xl pl-2 pt-2 pr-2'>
        <ul className='flex rounded-t-xl'>
          {categories.map((item, i) => (
            <li
              key={i}
              className={`category-li ${item === selectedCat ? "selected" : ""}`}
              onClick={() => setSelectedCat(item)}
            >
              <p className='text-xl py-2'>{item}</p>
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
      <main className='w-11/12 mx-auto border-2 border-[#eeeeee]'>
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
            <img src="./drips/personal_underHang.png" className="w-full absolute top[100%] left-0 right-0" />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default CategoryContainer