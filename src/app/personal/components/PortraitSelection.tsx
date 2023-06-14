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
            splashImg: './splashArt/PR.png',
            testimonials: [{author: 'Bob', body: 'good job'}, {author: 'Jodie', body: 'wonderful artwork'}, {author: 'Alex', body: 'u get awesome art'}],
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
    const imgSrc = options[`${mode}`].splashImg
    console.log('imgSrc is: ', imgSrc)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const container = {
        hidden: {},
        show: {
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.4,
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
            {mode === 'Photorealistic' && 
                <motion.div style={{backgroundImage: `url(${imgSrc})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="h-[600px] flex flex-start pl-[10%]" initial={{opacity: 0, y:200}} animate={{opacity: 1, y:0}} transition={{duration: 1, delay:.3}}>
                    <div className="w-[40%] flex flex-col justify-center">
                        <h2 className='font-bold text-4xl mb-10 text-left'>Create a <span className="text-orange-500">{options[`${mode}`].title}</span> Portrait</h2>
                        <p className="text-xl mb-[5%]">Design your own piece of art that&apos;s sure to enhance any setting</p>
                    </div>
                
                    
                </motion.div>
            } 
            <div className="flex justify-around bg-black my-[50px] py-[100px] text-white" >
                <motion.div className="w-[40%]" initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{type:'spring', duration: 1, delay:.5}} viewport={{once: true}}>
                    <Carousel showArrows={false} showThumbs={false} autoPlay={true} infiniteLoop className="portrait-carousel-root portrait-carousel">
                        {options[`${mode}`].imgs.map((img:string, i:number) => (<img key={i} src={`${img}`} alt="caro-img" />))}
                    </Carousel>
                </motion.div>
                
                <motion.div className="w-[35%] border-2 border-black" initial={{x: 500, opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{type:'spring', duration: 1, delay:.5}} viewport={{once: true}}>
                    <p className="font-bold text-4xl mb-10">Insert Heading Here</p>
                    <p className="font-semibold text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium congue lectus a ornare. Vestibulum nec nisi accumsan, varius leo sit amet, fringilla magna.</p>
                </motion.div>
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
            <div className="flex flex-col items-center py-[100px]">
                <h2 className="text-4xl font-bold mb-4">Ready to start your own masterpiece?</h2>
                <p className="text-2xl font-semibold mb-8">Head on over to the portrait builder and </p>
                <motion.button whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}>
                <Link href={{
                        pathname: '/portraits',
                        query: {selection: mode},
                        }} 
                    className="text-2xl no-underline text-center border-2 border-black py-2 px-4 rounded-lg mb-10"
                >
                    Start Customizing
                </Link>
                </motion.button>
                
            </div>
            <button onClick={() => setMode('Home')} className="text-center py-[50px]">Back to Home</button>
        </div>
    )
}

export default PortraitSelection