'use client'

import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./styles.css";
import { ModeProps } from "../Home"


export default function SlideCard({ setMode, mode }: ModeProps) {

    const category = {
        Photorealistic: {
            imgs: [
                './photoImgs/photo1.png',
                './photoImgs/photo2.png',
                './photoImgs/photo3.png',
                './photoImgs/photo4.jpg',
                './photoImgs/photo5.jpg',
                './photoImgs/photo6.jpg',
                './photoImgs/photo7.jpg',
                './photoImgs/photo8.png',
                './photoImgs/photo9.jpg',
            ],
            text: "Welcome to a world where art isn't just seen, but deeply felt. Where the lines blur between reality and canvas. Our bespoke photorealistic portraits aren't just images, they're narratives, crafted with skill and heart, capturing the essence of your story with breath-taking accuracy and depth."
        },
        Anime: {
            imgs: [
                './animeImgs/anime1.png',
                './animeImgs/anime2.jpg',
                './animeImgs/anime3.png',
                './animeImgs/anime4.png',
                './animeImgs/anime5.png',
                './animeImgs/anime6.png',
                './animeImgs/anime7.png',
                './animeImgs/anime8.png',
                './animeImgs/anime9.png',
                './animeImgs/anime10.png',
            ],
            text: "Ever dreamed of stepping into your favorite anime world, becoming a part of its vibrant colors, intricate lines, and ethereal aesthetics? We can help bring this dream to life! Our gifted artists will transform your image into a custom anime-style portrait that is unique, vibrant, and truly yours. Let us capture your essence in a style that resonates with your love for the world of anime. Whether it’s your favorite character or something completely original, let's turn the ordinary into extraordinary!"
        },
        NSFW: {
            imgs: [
                './nsfwImgs/nsfw1.jpg',
                './nsfwImgs/nsfw2.jpg',
                './nsfwImgs/nsfw3.jpg',
                './nsfwImgs/nsfw4.png',
                './nsfwImgs/nsfw5.png',
                './nsfwImgs/nsfw6.png',
                './nsfwImgs/nsfw7.png',
            ],
            text: "Step into a realm where art meets sensuality, where daring is celebrated and inhibition is a forgotten concept. Our curated selection of NSFW portraits pays tribute to the human form in its raw, honest, and enticing beauty. Commission your personalized NSFW portrait, and transform your deepest desires into a piece of art that's as provocative as it is personal. Navigate through our unique collection, and let's embark on a journey of artistic liberation."
        }
    }
    

    return (
        <div className="flex justify-start w-full">
            <div className="flex px-4 py-8 justify-between ">
                <div className="w-[49%]">
                    { (mode === "Photorealistic" || mode === 'Anime') &&
                        <Carousel
                            showArrows={false} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel"
                        >
                            {category[mode].imgs.map(el => {
                                    return (
                                    <img key={el} src={`${el}`} className="caro-img h-full object-contain" alt='default mode image'/>  
                                )})
                            }
                        </Carousel>
                    }

                    {mode === 'NSFW' && 
                        <img className='w-[80%] h-auto object-contain' src="./nsfwImgs/nsfw1.jpg" alt='category image'/>
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