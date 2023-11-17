import {
    motion
} from "framer-motion";
import { scrollIntoTheView } from "./Home1";


const Home2_hero = () => {
    return (
        <div className="relative w-[100%] h-[120vh] bg-gradient-to-b from-black from-80% via-[#282828] via-85% to-black to-90% flex justify-center pt-44"> 
            
            <object type="image/svg+xml" data="images/white_dots.svg" className="absolute -top-[15%] left-0 w-[100%] h-auto"></object>
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute -top-[20%] left-0 w-[100%] h-auto"></object>
            <object type="image/svg+xml" data="images/heroImgs/hero_comp2.svg" className="absolute -top-[20px] left-0 w-full h-auto"></object>
                        
            <div className="w-1/2 justify-center z-50">
                <h1 className="text-8xl font-serif text-center font-bold [text-shadow:_-4px_2px_8px_rgb(109_176_254_/_60%)]">Epic Custom Creations</h1>
                <p className="text-2xl text-center mt-8">Tagline about what Wattle can do for you</p>
                <div 
                    className='w-1/2 mx-auto mt-8 py-2 px-4 rounded-xl text-black text-center text-4xl bg-gradient-to-r from-[#4DFF90] to-[#4da0ff] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                    onClick={() => scrollIntoTheView('cta')}
                >
                    <p>Start Customizing</p>
                </div>    
            </div>
            

        </div>
    )
}

export default Home2_hero