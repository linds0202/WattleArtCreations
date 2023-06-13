'use client'

import { Variants, motion } from "framer-motion"

interface Props {
  testimonial: {
    author: String,
    body: String
  },
  animate: boolean
  varients: Variants | undefined,
  modifier: number
}

const Testimonial = ({ testimonial, animate, varients, modifier }: Props) => {

  const delayMod = modifier + 1 / 3.5
  const conDelayMod = modifier + 1

  return (
    <div className="w-3/12" >
      {animate ? 
        (
          <motion.div className="text-black p-4 border-b-2 border-black" variants={varients} initial='hidden' whileInView='show' transition={{ delay: delayMod, duration: .5, type: 'spring' }}>
            <p>&ldquo;{testimonial.body}&ldquo;</p>
            <p className=' text-base font-bold text-right pr-10'>-{testimonial.author}</p>
          </motion.div>
        )
      : (
        <div className="text-black p-4">
          <p>&ldquo;{testimonial.body}&ldquo;</p>
          <p className=' text-base font-bold text-right pr-10'>-{testimonial.author}</p>
        </div>
      )
}
    </div>
    )
}

export default Testimonial