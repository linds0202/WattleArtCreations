import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from 'react'
import Testimonial from "./Testimonial"

interface Props {
    mode: string,
    setMode: Function
}

const PortraitSelection = ({ mode, setMode }: Props) => {
    const options = {
        Photorealistic: {
            title: mode,
            imgs: ["./heroImgs/heroImg2.png"],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            imgs: ["./heroImgs/heroImg3.png"],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            imgs: ["./heroImgs/heroImg4.png"],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        }
    }
    const imgSrc = options[`${mode}`].imgs[0]
    console.log('imgSrc is: ', imgSrc)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    console.log(options[`${mode}`].testimonials)
  
    return (
        <div className="py-20"> 
            <h2 className='font-bold text-5xl'>Create a {options[`${mode}`].title} Portrait</h2>
            <img src={imgSrc} className="w-[300px] h-[300px] object-cover"/>
            <div className='py-20'>
                <motion.div className='flex justify-around py-20' variants={container} initial='hidden' 
                whileInView='show'>
                    {options[`${mode}`].testimonials.map((el:object, i:number) => {
                        return <Testimonial key={i} testimonial={{author: el.author, body:el.body }} animate={true} varients={testimonialVarient} modifier={i}/>
                    })}
                </motion.div>
                <button onClick={() => setMode('Home')}>Back to Home</button>
            </div>
            <Link href={{
                    pathname: '/portraits',
                    query: {selection: mode},
                    }} 
                className="text-2xl no-underline text-center border-2 border-black py-2 px-4 rounded-lg"
            >
                Start Customizing
            </Link>
        </div>
    )
}

export default PortraitSelection