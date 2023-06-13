import { useEffect } from 'react'
import Testimonial from './Testimonial'

import { delay, motion } from 'framer-motion'

interface Props {
    mode: String,
    setMode: Function
}

const PortraitCustomizer = ({ mode, setMode }: Props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const options = {
        Photorealistic: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', body: 'good job'}, {author: 'Troy', body: 'u did a great job'}, {author: 'Jodie', body: 'Super cool art'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        }
    }

    const container = {
        hidden: {},
        show: {
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.75,
        }
        }
    }

    const testimonialVarient = {
    hidden: {
        opacity: 0,
        y: 200
    },
    show: {
        opacity: 1,
        y: 0
    }
    }
  
    return (
    <div className='py-20'>
        <h2 className='font-bold text-5xl'>Create a {options[`${mode}`].title} Portrait</h2>
        <motion.div className='flex justify-around py-20' variants={container} initial='hidden' 
        whileInView='show'>
            {options[`${mode}`].testimonials.map((el:object, i:number) => {
                return <Testimonial key={i} testimonial={el} animate={true} varients={testimonialVarient} modifier={i}/>
            })}
        </motion.div>
        <button onClick={() => setMode('Home')}>Back to Home</button>
    </div>
  )
}

export default PortraitCustomizer