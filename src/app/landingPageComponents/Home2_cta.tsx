import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './categories/styles.css'
import { ModeProps } from "./Home1";

const Home1_cta = ({ setMode, mode }: ModeProps) => {
    const type1 = [
            '/images/photoImgs/photo1.png',
            '/images/photoImgs/photo2.png',
            '/images/photoImgs/photo3.png',
            '/images/photoImgs/photo4.jpg',
            '/images/photoImgs/photo5.jpg',
            '/images/photoImgs/photo6.jpg',
            '/images/photoImgs/photo7.jpg',
            '/images/photoImgs/photo8.png',
            '/images/photoImgs/photo9.jpg',
        ]
    const type2 =  [
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
        ]

    return (
        <div id='cta' className="relative h-full pt-8 mb-60 bg-black">
            {/* <img src="/images/cta/cta3.png" className="absolute -top-3 left-0 z-10"/> */}
            <object type="image/svg+xml" data="images/cta/cta_1.svg" className="absolute top-0 left-0 w-[75%] z-20"></object> 

            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-0 -left-[10%] w-[120%] h-[110vh]"></object>  
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-[35%] -left-[10%] w-[110%] h-[120vh]"></object>    
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-[73%] -left-[10%] w-[110%] h-[110vh]"></object>          
           
            <div className="flex flex-col">
                <div className="mt-[15%] w-7/12 self-center ml-[30%] z-10">
                    <p className="font-serif text-8xl font-bold mb-8 text-gradient-to-r from-[#4DFF90] to-[#4da0ff]">Choose Your Style</p>
                    <p className="w-11/12 mt-8 text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nulla, laoreet vitae sollicitudin eget, condimentum id magna. Aenean rhoncus viverra massa, eu placerat ex rutrum nec. Etiam lobortis nisl vel justo porttitor sollicitudin. Ut et ligula at sapien efficitur consequat. Suspendisse ullamcorper malesuada quam, non fermentum metus fermentum accumsan. </p>
                </div>

                <div className="relative w-10/12 mt-32 self-end flex justify-around items-center">

                    <div className="w-[450px] h-[500px] object-cover rounded-xl z-5">
                        
                        <Carousel
                            showArrows={true} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel "
                        >
                            {type1.map((el, i) => {
                                    return (
                                        <img key={i} src={`${el}`} className="w-[450px] h-[500px] object-cover object-top rounded-xl"/>
                                        // <div key={i} className='relative w-[450px] h-[500px] object-cover mx-auto rounded-xl'>
                                        //     <Image
                                        //         className="" 
                                        //         src={`${el}`} 
                                        //         alt="photorealistic image in carousel" 
                                        //         width={450}
                                        //         height={500}
                                        //         sizes='(max-width: 450px) 100vw, (max-width: 500px) 50vw, 33vw'
                                        //         priority={false}  
                                        //     />
                                        // </div>
                                )})
                            }
                        </Carousel>
                    </div>

                    <div className="w-1/2 z-50">
                        <p className="font-serif mt-4 text-4xl font-bold">Photorealistic</p>
                        <p className="w-10/12 text-xl font-light mt-8">Welcome to a world where art isn&lsquo;t just seen, but deeply felt. Where the lines blur between reality and canvas. Our bespoke photorealistic portraits aren&lsquo;t just images, they&lsquo;re narratives, crafted with skill and heart, capturing the essence of your story with breath-taking accuracy and depth.</p>
                        <div
                            className='w-1/3 mt-8 py-2 px-4 bg-gradient-to-r from-[#4DFF90] to-[#4da0ff] rounded-xl text-black text-center text-2xl cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            onClick={() => setMode('Photorealistic')}
                        >
                            Customize
                        </div>
                    </div>
                </div>

                <div className="relative w-10/12 mt-32 ml-20 self-start flex justify-around items-center">
                 
                    <div className="w-1/2">
                        <p className="font-serif text-4xl font-bold">Anime</p>
                        <p className="text-xl font-light mt-8">Ever dreamed of stepping into your favorite anime world, becoming a part of its vibrant colors, intricate lines, and ethereal aesthetics? We can help bring this dream to life! Our gifted artists will transform your image into a custom anime-style portrait that is unique, vibrant, and truly yours. Let us capture your essence in a style that resonates with your love for the world of anime. Whether it&lsquo;s your favorite character or something completely original, let&lsquo;s turn the ordinary into extraordinary!</p>
                        <div
                            className='w-1/3 mt-8 py-2 px-4 bg-gradient-to-r from-[#4DFF90] to-[#4da0ff] rounded-xl text-black text-center text-2xl cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            onClick={() => setMode('Anime')}
                        >
                            Customize
                        </div>
                    </div>
                    
                    <div className="w-[450px] max-h-[500px] rounded-xl">
                        <Carousel
                            showArrows={true} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel rounded-xl"
                        >
                            {type2.map((el, i) => {
                                    return (
                                        <img key={i} src={`${el}`} className="w-[450px] h-[500px] object-cover object-top rounded-xl "/>
                                        // <div key={i} className='relative w-[450px] h-[500px] mx-auto object-cover rounded-xl'>
                                        //     <Image
                                        //         className="rounded-xl" 
                                        //         src={`${el}`} 
                                        //         alt="anime image in carousel" 
                                        //         width={450}
                                        //         height={500}
                                        //         sizes='(max-width: 450px) 100vw, (max-width: 500px) 50vw, 33vw'
                                        //         priority={false}  
                                        //     />
                                        // </div>
                                )})
                            }
                        </Carousel>
                    </div>
                 
                </div>

                <div className="relative w-10/12 mt-32 mr-20 self-end flex justify-around items-center">
                    <div className="w-full">
                        <img src="/images/cta/nsfw.png" />
                        <div
                            className='absolute bottom-[23%] left-[43.5%] w-1/6 mt-8 py-2 px-4 rounded-xl text-black text-center text-2xl bg-gradient-to-r from-[#4DFF90] to-[#4da0ff] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            onClick={() => setMode('NSFW')}
                        >
                            Customize
                        </div>
                    </div>
                </div>

            </div>        
        </div>
    )
}

export default Home1_cta