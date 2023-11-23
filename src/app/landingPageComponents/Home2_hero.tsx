import {
    motion
} from "framer-motion";
import { scrollIntoTheView } from "./Home1";
// bg-gradient-to-r from-[#03568c] to-[#43b4e4]

const Home2_hero = () => {
    return (
        <div className="relative w-[100%] h-[120vh] bg-gradient-to-b from-black from-80% via-[#282828] via-85% to-black to-90% flex justify-center pt-32"> 
            
            <object type="image/svg+xml" data="images/white_dots.svg" className="absolute -top-[15%] left-0 w-[100%] h-auto"/>
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute -top-[20%] left-0 w-[100%] h-auto"/>
            <object type="image/svg+xml" data="images/heroImgs/castle.svg" className="absolute top-15 left-5 w-[50%] h-auto"/> 
            <object type="image/svg+xml" data="images/heroImgs/hero_comp2.svg" className="absolute -top-[20px] left-0 w-full h-auto"/>
            {/* <object type="image/svg+xml" data="images/heroImgs/hero_dragon.svg" className="absolute -top-[20px] left-0 w-full h-auto"/> */}
            

            <div className="w-1/2 ml-44 justify-center z-50">
                <h1 className="text-8xl font-serif text-center font-bold [text-shadow:_-4px_2px_8px_rgb(109_176_254_/_60%)]">Epic Custom Creations</h1>
                <p className="text-2xl text-center mt-8">Tagline about what Wattle can do for you</p>
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