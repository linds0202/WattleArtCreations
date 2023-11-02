import {
    motion
} from "framer-motion";
import { scrollIntoTheView } from "./Home1";

const Home2_hero = () => {
    return (
        <div className="relative w-[100%] h-[120vh] bg-gradient-to-b from-[#474747] from-10% via-[#282828] via-50% to-black to-85% flex justify-center items-center"> 
            <object type="image/svg+xml" data="images/colored_dots.svg" className="absolute top-0 left-0 w-[100%] h-[100vh]"></object>
            <object type="image/svg+xml" data="images/hero_comp.svg" className="absolute -top-[20px] left-0 w-full h-auto"></object>
            
            <div 
                className='z-10 w-1/4 mt-32 py-2 px-4 rounded-xl text-black text-center text-4xl bg-gradient-to-r from-[#4DFF90] to-[#4da0ff] cursor-pointer hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => scrollIntoTheView('cta')}
            >
                <p>Start Customizing</p>
            </div>    

        </div>
    )
}

export default Home2_hero