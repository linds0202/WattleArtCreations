import {
    motion,
    useScroll,
    useTransform,
    useAnimate
} from "framer-motion";
import { useCategoriesContext } from '../context/CategoriesContext'


const Home2_gallery = () => {
    const { categories } = useCategoriesContext()
    return (
        <div className="relative w-[100h%] h-[100vh]">
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-0 left-0 w-full h-[110vh] -z-9"/>
            <div className=" mb-10 text-white text-center">
                <p
                    className="font-serif text-8xl font-bold mb-4"
                >
                    Our Work
                </p>
                <p className="text-2xl">Maybe some copy about your past work here?</p>
            </div>

            <div className="absolute top-[10%] left-[10%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src={`${categories.home.gallery[0]}`} 
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
                    className="relative w-[150px] h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[1]}`} 
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
                    className="relative w-[150px] h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[2]}`} 
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
                    className="relative w-[200px] h-[200px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src={`${categories.home.gallery[3]}`} 
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
                    className="relative w-[150px] h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[4]}`} 
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
                    className="relative w-[200px] h-[200px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[200px] h-[200px] object-cover rounded-xl"
                        src={`${categories.home.gallery[5]}`} 
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