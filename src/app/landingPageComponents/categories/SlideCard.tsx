'use client'

import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./styles.css";
import { ModeProps } from "../Home"
import Image from "next/image";


export default function SlideCard({ setMode, mode }: ModeProps) {

    const category = {
        Photorealistic: {
            imgs: [
                '/images/photoImgs/photo1.png',
                '/images/photoImgs/photo2.png',
                '/images/photoImgs/photo3.png',
                '/images/photoImgs/photo4.jpg',
                '/images/photoImgs/photo5.jpg',
                '/images/photoImgs/photo6.jpg',
                '/images/photoImgs/photo7.jpg',
                '/images/photoImgs/photo8.png',
                '/images/photoImgs/photo9.jpg',
            ],
            text: "Welcome to a world where art isn't just seen, but deeply felt. Where the lines blur between reality and canvas. Our bespoke photorealistic portraits aren't just images, they're narratives, crafted with skill and heart, capturing the essence of your story with breath-taking accuracy and depth."
        },
        Anime: {
            imgs: [
                '/images/animeImgs/anime1.png',
                '/images/animeImgs/anime2.jpg',
                '/images/animeImgs/anime3.png',
                '/images/animeImgs/anime4.png',
                '/images/animeImgs/anime5.png',
                '/images/animeImgs/anime6.png',
                '/images/animeImgs/anime7.png',
                '/images/animeImgs/anime8.png',
                '/images/animeImgs/anime9.png',
                '/images/animeImgs/anime10.png',
            ],
            text: "Ever dreamed of stepping into your favorite anime world, becoming a part of its vibrant colors, intricate lines, and ethereal aesthetics? We can help bring this dream to life! Our gifted artists will transform your image into a custom anime-style portrait that is unique, vibrant, and truly yours. Let us capture your essence in a style that resonates with your love for the world of anime. Whether it’s your favorite character or something completely original, let's turn the ordinary into extraordinary!"
        },
        NSFW: {
            imgs: [
                '/images/nsfwImgs/nsfw1.jpg',
                '/images/nsfwImgs/nsfw2.jpg',
                '/images/nsfwImgs/nsfw3.jpg',
                '/images/nsfwImgs/nsfw4.png',
                '/images/nsfwImgs/nsfw5.png',
                '/images/nsfwImgs/nsfw6.png',
                '/images/nsfwImgs/nsfw7.png',
            ],
            text: "Step into a realm where art meets sensuality, where daring is celebrated and inhibition is a forgotten concept. Our curated selection of NSFW portraits pays tribute to the human form in its raw, honest, and enticing beauty. Commission your personalized NSFW portrait, and transform your deepest desires into a piece of art that's as provocative as it is personal. Navigate through our unique collection, and let's embark on a journey of artistic liberation."
        }
    }
    

    return (
        <div className="flex justify-start w-full">
            <div className="w-full flex px-4 py-8 justify-between ">
                <div className="w-[49%]">
                    { (mode === "Photorealistic" || mode === 'Anime') &&
                        <Carousel
                            showArrows={false} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel "
                        >
                            {category[mode].imgs.map((el, i) => {
                                    return (
                                        <div key={i} className='relative w-[550px] h-[525px] mx-auto object-cover'>
                                            <Image 
                                                src={`${el}`} 
                                                alt="small Wattle Art Creations logo" 
                                                width={550}
                                                height={525}
                                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                priority={false}  
                                            />
                                        </div>
                                    // <img key={el} src={`${el}`} className="caro-img h-full object-contain" alt='default mode image'/>  
                                )})
                            }
                        </Carousel>
                    }

                    {mode === 'NSFW' && 
                    <div className='relative w-[550px] h-[525px] mx-auto object-cover'>
                        <Image 
                            src='/images/nsfwImgs/nsfw1.jpg'
                            alt="category image cover" 
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            priority={false}  
                        />
                        {/* // <img className='w-[80%] h-auto object-contain' src="./nsfwImgs/nsfw1.jpg" alt='category image'/> */}
                    </div>
                    }
                </div>
                <div className="w-[45%] flex flex-col pt-14 pr-[5%] justify-center">
                    { (mode === "Photorealistic" || mode === 'Anime') &&
                        <>
                            <p className="font-bold text-4xl mb-10">{mode} Portrait</p>
                            <p className="text-xl mb-10">{category[mode].text}</p>
                        </>

                    }
                    <div className="flex justify-center">
                        <motion.button 
                            className="text-xl mb-4 border-2 border-black w-[50%] rounded-md px-4 py-2 hover:bg-black hover:text-white transition"
                            onClick={() => setMode(mode)} 
                            whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
                            whileTap={{ scale: 1.05 }}
                            >
                                Start Customizing
                        </motion.button> 
                    </div>
                </div>
            </div>
            
        </div>
    )
}