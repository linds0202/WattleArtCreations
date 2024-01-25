import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import './categories/styles.css'
import { ModeProps } from "./Home1";
import { useCategoriesContext } from '../context/CategoriesContext'
import Link from "next/link";


const Home1_cta = ({ setMode, mode }: ModeProps) => {
    const { categories } = useCategoriesContext()

    return (
        <div id='cta' className="relative h-full pt-8 mb-60 bg-black">
            <object type="image/svg+xml" data="images/cta/cta_1.svg" className="absolute top-0 left-0 w-[75%] z-10"></object> 

            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-0 -left-[10%] w-[120%] h-[110vh]"></object>  
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-[35%] -left-[10%] w-[110%] h-[120vh]"></object>    
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-[73%] -left-[10%] w-[110%] h-[110vh]"></object>          
           
            <div className="flex flex-col">
                <div className="mt-[15%] w-11/12 lg:w-7/12 self-end lg:self-center lg:ml-[30%] z-10">
                    <p className="w-7/12 md:w-1/2 lg:w-full mx-auto font-serif text-5xl text-right lg:text-left lg:text-8xl font-bold mb-8">Choose Your Style</p>
                    <p className="w-11/12 md:w-2/3 lg:w-11/12 md:ml[15%] lg:ml-0 mt-8 md:mt-20 lg:mt-8 text-xl text-center lg:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat nulla, laoreet vitae sollicitudin eget, condimentum id magna. Aenean rhoncus viverra massa, eu placerat ex rutrum nec. Etiam lobortis nisl vel justo porttitor sollicitudin. Ut et ligula at sapien efficitur consequat. Suspendisse ullamcorper malesuada quam, non fermentum metus fermentum accumsan. </p>
                </div>

                <div className="relative w-11/12 mx-auto mt-8 lg:w-10/12 lg:mt-32 lg:self-end flex flex-col lg:flex-row justify-around items-center">

                    <div className="w-[100%] h-[60%] md:max-w-[500px] md:max-h-[600px] lg:w-[450px] lg:h-[500px] object-cover rounded-xl z-5">
                        
                        <Carousel
                            showArrows={true} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel "
                        >
                            {categories.cat1.pics.homeCarousel.map((el: string, i: number) => {
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

                    <div className="w-11/12 lg:w-1/2 lg:pl-4 xl:pl-0 z-50">
                        <p className="font-serif mt-4 text-4xl font-bold">{categories.cat1.type}</p>
                        <p className="w-full xl:w-10/12 text-xl font-light mt-4 lg:mt-8">{categories.cat1.copy.homeBlurb}</p>
                        <Link href={{
                            pathname: '/',
                            query: {selection: 'cat1'},
                            }} 
                            className='block w-full lg:w-full xl:w-1/3 mt-8 py-2 px-4 font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center text-2xl no-underline cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                        >
                            Customize
                        </Link>
                    </div>
                </div>

                <div className="relative w-11/12 mx-auto mt-20 lg:w-10/12 lg:mt-32 lg:ml-20 lg:self-start flex flex-col-reverse lg:flex-row justify-around items-center">
                 
                    <div className="w-11/12 lg:w-1/2 lg:pr-4">
                        <p className="font-serif mt-4 text-4xl font-bold">{categories.cat2.type}</p>
                        <p className="text-xl font-light mt-4 lg:mt-8">{categories.cat2.copy.homeBlurb}</p>
                        <Link href={{
                            pathname: '/',
                            query: {selection: 'cat2'},
                            }} 
                            className='block w-full lg:w-full xl:w-1/3 mt-8 py-2 px-4 font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center text-2xl no-underline cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            // className="text-xl no-underline text-center hover:text-cyan-600"
                        >
                            Customize
                        </Link>
                    </div>
                    
                    <div className="w-[100%] h-[60%] md:max-w-[500px] md:max-h-[600px] lg:w-[450px] lg:h-[500px] rounded-xl">
                        <Carousel
                            showArrows={true} 
                            showThumbs={false} 
                            autoPlay={true} 
                            showStatus={false}
                            infiniteLoop 
                            className="portrait-carousel-root portrait-carousel rounded-xl"
                        >
                            {categories.cat2.pics.homeCarousel.map((el: string, i: number) => {
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

                <div className="relative w-11/12 mx-auto mt-20 lg:w-10/12 lg:mt-32 lg:mr-20 lg:self-end flex flex-col lg:flex-row justify-around items-center">
                    {/* <div className="w-full"> */}
                        <picture>
                            <source srcSet={`${categories.cat3.pics.homeCarousel}`}
                                    media="(min-width: 1024px)"/>
                            <source srcSet={`${categories.cat3.pics.homeCarouselMedium}`}
                                    media="(min-width: 768px)"/>
                            <img src={`${categories.cat3.pics.homeCarouselMobile}`} alt="" />
                        </picture>
                        {/* <img src={`${categories.cat3.pics.homeCarousel}`} className=""  /> */}
                        {/* <div
                            className='absolute bottom-[23%] left-[43.5%] w-1/6 mt-8 py-2 px-4 rounded-xl text-black text-center text-2xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            onClick={() => setMode(`cat3`)}
                        >
                            Customize
                        </div> */}
                        <Link href={{
                            pathname: '/',
                            query: {selection: 'cat3'},
                            }} 
                            className='lg:absolute lg:bottom-[23%] lg:left-[43.5%] w-full lg:w-1/6 mt-8 py-2 px-4 rounded-xl text-black text-center text-2xl font-bold no-underline bg-gradient-to-r from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                            // className="text-xl no-underline text-center hover:text-cyan-600"
                        >
                            Customize
                        </Link>
                    {/* </div> */}
                </div>

            </div>        
        </div>
    )
}

export default Home1_cta