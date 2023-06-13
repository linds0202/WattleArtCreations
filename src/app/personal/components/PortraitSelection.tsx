import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from 'react'
import Testimonial from "./Testimonial"
import { Carousel } from "react-responsive-carousel"

interface Props {
    mode: string,
    setMode: Function
}

const PortraitSelection = ({ mode, setMode }: Props) => {
    const options = {
        Photorealistic: {
            title: mode,
            imgs: ["./heroImgs/heroImg2.png", "./heroImgs/heroImg3.png", "./heroImgs/heroImg4.png", "./heroImgs/heroImg5.png", "./heroImgs/heroImg6.JPG"],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            imgs: ["./heroImgs/heroImg2.png", "./heroImgs/heroImg3.png", "./heroImgs/heroImg4.png", "./heroImgs/heroImg5.png", "./heroImgs/heroImg6.JPG"],
            testimonials: [{author: 'Bob', body: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            imgs: ["./heroImgs/heroImg2.png", "./heroImgs/heroImg3.png", "./heroImgs/heroImg4.png", "./heroImgs/heroImg5.png", "./heroImgs/heroImg6.JPG"],
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
            <h2 className='font-bold text-5xl mb-20'>Create a {options[`${mode}`].title} Portrait</h2>
            <div className="flex justify-center">
                <img src={imgSrc} className="w-[300px] h-[300px] object-cover"/>
            </div>
            <div className="flex justify-around bg-slate-500 my-[50px]">
            
                <Carousel showArrows={false} showThumbs={false} autoPlay={true} infiniteLoop className="portrait-carousel-root portrait-carousel">
                    {options[`${mode}`].imgs.map((img:string, i:number) => (<img key={i} src={`${img}`} alt="caro-img" />))}
                </Carousel>
                <div className="w-[30%] border-2 border-black">
                    <p className="font-bold text-2xl mb-10 underline">Insert Heading Here</p>
                    <p className="font-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium congue lectus a ornare. Vestibulum nec nisi accumsan, varius leo sit amet, fringilla magna.</p>
                </div>
            </div>
            <div className='py-[150px] flex flex-col items-start'>
                <h2 className="font-bold text-4xl pl-[10%]">Testimonials: </h2>
                <motion.div className='flex justify-around py-20 w-full' variants={container} initial='hidden' 
                whileInView='show'>
                    {options[`${mode}`].testimonials.map((el:object, i:number) => {
                        return <Testimonial key={i} testimonial={{author: el.author, body:el.body }} animate={true} varients={testimonialVarient} modifier={i}/>
                    })}
                </motion.div>
                
            </div>
            <div className="flex flex-col items-center">
                <Link href={{
                        pathname: '/portraits',
                        query: {selection: mode},
                        }} 
                    className="text-2xl no-underline text-center border-2 border-black py-2 px-4 rounded-lg"
                >
                    Start Customizing
                </Link>
                <button onClick={() => setMode('Home')}>Back to Home</button>
            </div>
        </div>
    )
}

export default PortraitSelection