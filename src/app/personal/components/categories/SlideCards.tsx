'use client'
import { motion, MotionProps } from "framer-motion";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"


import "./styles.css";

import Router, { useRouter } from "next/navigation";

export default function SlideCards({ setMode }) {

    const photorealisticImgs = [
        './photoImgs/photo1.png',
        './photoImgs/photo2.png',
        './photoImgs/photo3.png',
        './photoImgs/photo4.jpg',
        './photoImgs/photo5.jpg',
        './photoImgs/photo6.jpg',
        './photoImgs/photo7.jpg',
        './photoImgs/photo8.png',
        './photoImgs/photo9.jpg',
    ]
    const animeImgs = [
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
    ]
    const nsfwImgs = [
        './nsfwImgs/nsfw1.jpg',
        './nsfwImgs/nsfw2.jpg',
        './nsfwImgs/nsfw3.jpg',
        './nsfwImgs/nsfw4.png',
        './nsfwImgs/nsfw5.png',
        './nsfwImgs/nsfw6.png',
        './nsfwImgs/nsfw7.png',
        
    ]

  return (
    <div className="space-y-[150px] flex flex-col items-center">
        <div className="flex justify-start w-full  ">
            <div className="flex px-4 py-8 justify-between ">
                <div className="w-[49%]">
                    <Carousel
                        showArrows={false} 
                        showThumbs={false} 
                        autoPlay={true} 
                        showStatus={false}
                        infiniteLoop 
                        className="portrait-carousel-root portrait-carousel"
                    >
                        {photorealisticImgs.map(el => {
                                return (
                                <img key={el} src={`${el}`} className="caro-img h-full object-contain"/>  
                            )})
                        }
                    </Carousel>
                </div>
                <div className="w-[45%] flex flex-col pt-14 pr-[5%] justify-center">
                    <p className="font-bold text-4xl mb-10">Photorealistic</p>
                    <p className="text-xl mb-10">Create your own photorealistic art piece or portrait for a pixel perfect
                        masterpiece that you&#39;re sure to love. So what are you waiting for? Click the button 
                        below and
                    </p>
                    <div className="flex justify-center">
                        <motion.button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition" onClick={() => setMode('Photorealistic')} whileHover={{ scale: 1.1, transition: {duration: 0.1} }} whileTap={{ scale: 1.05 }}>Start Customizing</motion.button>
                    </div>
                    
                    <div className="h-[2px] bg-white"/>
                </div>
            </div>
        </div>
        <div className="flex justify-start w-full  ">
            <div className="flex px-4 py-8 justify-between ">
                <div className="w-[45%] flex flex-col pt-14 pl-[5%] justify-center">
                    <p className="font-bold text-4xl mb-10">Anime</p>
                    <p className="text-xl mb-10">
                        With our custom anime commission, you can build the ultimate
                        anime portrait or piece that&#39;s sure to impress.
                        There&#39;s just one thing left to do: click the button below and
                    </p>
                    <div className="flex justify-center">
                        <motion.button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition" onClick={() => setMode('Anime')} whileHover={{ scale: 1.1, transition: {duration: 0.1} }} whileTap={{ scale: 1.05 }}>Start Customizing</motion.button>
                    </div>
                    
                    <div className="h-[2px] bg-white"/>
                </div>
                <div className="w-[49%]">
                    <Carousel
                        showArrows={false} 
                        showThumbs={false} 
                        autoPlay={true} 
                        showStatus={false}
                        infiniteLoop 
                        className="portrait-carousel-root portrait-carousel"
                    >
                        {animeImgs.map(el => {
                                return (
                                <img key={el} src={`${el}`} className="caro-img h-full object-contain"/>  
                            )})
                        }
                    </Carousel>
                </div>
            </div>
        </div>
        <div className="flex justify-start w-full  ">
            <div className="flex px-4 py-8 justify-between ">
                <div className="w-[49%]">
                    <Carousel
                        showArrows={false} 
                        showThumbs={false} 
                        autoPlay={true} 
                        showStatus={false}
                        infiniteLoop 
                        className="portrait-carousel-root portrait-carousel"
                    >
                        {nsfwImgs.map(el => {
                                return (
                                <img key={el} src={`${el}`} className="caro-img h-full object-contain"/>  
                            )})
                        }
                    </Carousel>
                </div>
                <div className="w-[45%] flex flex-col pt-14 pr-[5%] justify-center">
                    <p className="font-bold text-4xl mb-10">NSFW</p>
                    <p className="text-xl mb-10">
                        At wattle Art Creations, we create whatever your heart desires.
                        With our team, anything goes. <span className="border-b pb-px">ANYTHING. </span>
                        Unlock your ultimate fantasy and
                    </p>
                    <div className="flex justify-center">
                        <motion.button className="mb-4 border-2 border-black w-[50%] rounded-md hover:bg-black hover:text-white transition" onClick={() => setMode('NSFW')} whileHover={{ scale: 1.1, transition: {duration: 0.1} }} whileTap={{ scale: 1.05 }}>Start Customizing</motion.button>
                    </div>
                    
                    <div className="h-[2px] bg-white"/>
                </div>
            </div>
        </div>
    </div>
  );
}