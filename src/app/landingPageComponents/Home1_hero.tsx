import {
    motion
} from "framer-motion";
import { scrollIntoTheView } from "./Home1";

const Home1_hero = () => {
    return (
        <div className="relative h-[110vh] bg-gradient-to-b from-[#474747] from-10% via-[#282828] via-80% to-black to-95% flex justify-end"> 
            {/* <div className="absolute top-[10%] -left-[10%] w-5/12">
                    <img src='./images/Logo_Full_ups.png' />
            </div> */}
            
            <div className="z-50 w-6/12 mt-32 mx-auto pl-36 text-white">
                {/* <motion.div
                    initial={{ opacity: 0, scale: .4 }}
                    animate={{ opacity: 1, scale: 1}}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                > */}
                    <motion.h1
                        className='font-serif text-8xl font-bold p-0 text-left'
                    >
                        Epic Custom Creations
                    </motion.h1>
                    <motion.h2
                        className='mt-4 text-3xl font-light p-0 text-left'
                    >
                        A cool tagline describing what Wattle Art Creations can do for you. Then there might be some other info in this space
                    </motion.h2>
                    
                        <div 
                            className='w-1/2 mt-8 py-2 px-4 border-2 border-[#0075FF] rounded-xl text-white text-center text-4xl bg-[#0075FF]/50 cursor-pointer hover:bg-[#0075FF] hover:scale-105'
                            onClick={() => scrollIntoTheView('cta')}
                        >
                            <p>Start Customizing</p>
                        </div>
                {/* </motion.div> */}
                               
                
            </div>
            
            
            
            <motion.img 
                src='./images/landingPage/puddle1.png' 
                className={`absolute bottom-[3%] left-[20%] w-[100%] object-contain`}   
                initial={{ scale: .90}}
                animate={{ scale: .98}}
                transition={{ type: "linear", duration: 4, repeatType: "reverse", repeat: Infinity }}
            />

            <img 
                src='./images/landingPage/ground.png' 
                className={`absolute bottom-[5%] left-[0%] w-[100%] object-contain`}   
            />

            <motion.img 
                src='./images/landingPage/hero2.png' 
                className={`absolute top-0 left-0 w-[100%] object-contain`}   
                initial={{ y: -7}}
                animate={{ y: -1}}
                transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
            />


            <div className="absolute top-[90%] left-[18%]">
                <motion.div
                    className="relative w-[50px] h-[50px] rounded-xl cursor-pointer"
                    initial={{ scale: .7, rotate: 5 }}
                    animate={{ scale: .85, rotate: -15}}
                    transition={{ type: "spring", duration: 1, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[50px] h-[50px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            
            <div className="absolute top-[75%] left-[5%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl z-[30]"
                        src='images/photoImgs/photo8.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            

        </div>
    )
}

export default Home1_hero