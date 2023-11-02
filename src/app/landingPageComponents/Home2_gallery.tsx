import {
    motion,
    useScroll,
    useTransform,
    useAnimate
} from "framer-motion";

// bg-[url('/images/gallery/splat1.png')]

const Home2_gallery = () => {

    return (
        <div className="relative w-[100h%] h-[100vh]">
            <object type="image/svg+xml" data="images/colored_dots.svg" className="absolute -top-[10%] left-0 w-full h-auto -z-9"></object>
            <div className=" mb-10 text-white text-center">
                <p
                    className="font-serif text-8xl font-bold mb-4"
                >
                    Our Work
                </p>
                <p className="text-2xl">Maybe some copy about your past work here?</p>
            </div>

            {/* <div className="absolute top-[5%] left-[5%]">
                <motion.div
                    className="relative w-[100px] h-[100px] rounded-xl cursor-pointer"
                    initial={{ scale: .6, rotate: 5 }}
                    animate={{ scale: .8, rotate: -5}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            <div className="absolute top-[75%] left-[75%]">
                <motion.div
                    className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                    initial={{ scale: .8, rotate: 45 }}
                    animate={{ scale: .9, rotate: 65}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            <div className="absolute top-[65%] left-[15%]">
                <motion.div
                    className="relative w-[100px] h-[100px] rounded-xl cursor-pointer"
                    initial={{ scale: .6, rotate: 25 }}
                    animate={{ scale: .8, rotate: 45}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            <div className="absolute top-[60%] left-[40%]">
                <motion.div
                    className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                    initial={{ scale: .7, rotate: 35 }}
                    animate={{ scale: .9, rotate: 15}}
                    transition={{ type: "spring", duration: 3, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            <div className="absolute top-[15%] left-[85%]">
                <motion.div
                    className="relative w-[100px] h-[100px] rounded-xl cursor-pointer"
                    initial={{ scale: .6, rotate: 25 }}
                    animate={{ scale: .8, rotate: 45}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            <div className="absolute top-[25%] left-[55%]">
                <motion.div
                    className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                    initial={{ scale: .85, rotate: 65 }}
                    animate={{ scale: .9, rotate: 95}}
                    transition={{ type: "spring", duration: 2.5, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .8 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div> */}
            

            <div className="absolute top-[10%] left-[10%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src='images/animeImgs/anime5.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            
            <div className="absolute bottom-[25%] right-[14%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src='images/animeImgs/anime10.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            
            <div className="absolute top-[60%] left-[25%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 3,
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
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src='images/heroImgs/heroImg3.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            
            <div className="absolute bottom-[35%] right-[30%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src='images/heroImgs/heroImg8.png' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            
            <div className="absolute bottom-[50%] left-[40%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 3,
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
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src='images/heroImgs/heroImg16.jpg' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>

            <div className="absolute top-[5%] right-[15%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl cursor-pointer"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src='images/heroImgs/heroImg19.png' 
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

export default Home2_gallery