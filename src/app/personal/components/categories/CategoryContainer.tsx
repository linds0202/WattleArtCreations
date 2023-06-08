import React from 'react'

import { FadeHeader } from './FadeHeader'
import SlideCards from './SlideCards'

const CategoryContainer = ({ setMode }) => {

  return (
    <div className='w-full py-[50px] mt-20'>
        <FadeHeader />
        <div className="flex justify-center">
            <SlideCards setMode={setMode} />
        </div>
    </div>
  )
}

export default CategoryContainer