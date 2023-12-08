import {
    motion
} from "framer-motion";
import { useCategoriesContext } from "../context/CategoriesContext";

export const scrollIntoTheView = (id: string) => {
    let element = document.getElementById(id) as HTMLElement;
    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};
// bg-gradient-to-b from-black from-80% via-[#282828] via-85% to-black to-90%

const Home2_hero = () => {
    const { categories } = useCategoriesContext()

    return (
        <div className="relative w-[100%] h-[120vh] bg-black flex justify-center pt-24"> 
            
            {/* <object type="image/svg+xml" data="images/white_dots.svg" className="absolute -top-[15%] left-0 w-[100%] h-auto"/>
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute -top-[20%] left-0 w-[100%] h-auto"/>
            <object type="image/svg+xml" data="images/heroImgs/castle.svg" className="absolute top-15 left-5 w-[50%] h-auto"/> 
            <object type="image/svg+xml" data="images/heroImgs/hero_comp2.svg" className="absolute -top-[20px] left-0 w-full h-auto"/> */}
            <object type="image/svg+xml" data="images/heroImgs/hero_dragon.svg" className="absolute -top-[20px] left-0 w-full h-auto"/>
            

            <div className="w-1/2 pl-12 flex flex-col items-center z-50">
                <h1 className="text-8xl font-serif text-center font-bold [text-shadow:_-4px_2px_8px_rgb(109_176_254_/_60%)]">
                    {categories.home.title}
                </h1>
                <p className="text-2xl text-center mt-4">{categories.home.tagline}</p>
                <div 
                    className='w-1/2 mx-auto mt-8 py-2 px-4 rounded-xl text-white text-center text-4xl shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)] bg-[#03568c] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                    onClick={() => scrollIntoTheView('cta')}
                >
                    <p>Start Customizing</p>
                </div>    
            </div>
            

        </div>
    )
}

export default Home2_hero