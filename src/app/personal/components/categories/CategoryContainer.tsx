import React from 'react'

import { FadeHeader } from './FadeHeader'
import SlideCards from './SlideCards'

const CategoryContainer = () => {
  return (
    <div className='w-full'>
        <FadeHeader />
        <div className="flex justify-center">
            <SlideCards />
        </div>
    </div>
  )
}

export default CategoryContainer