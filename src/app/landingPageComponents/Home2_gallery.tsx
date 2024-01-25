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
        <div className="relative w-[100%] h-[150vh] md:h-[70vh] lg:h-[50vh] xl:h-[100vh]">
            <object type="image/svg+xml" data="images/colored_dots_final.svg" className="absolute top-0 -left-[25%] lg:left-0 w-[400%] md:w-[150%] lg:w-full h-[200vh] md:h-[200%] lg:h-full xl:h-[110vh] object-cover -z-9"/>
            <div className="mb-10 text-white text-center">
                <p
                    className="font-serif text-8xl font-bold mb-4"
                >
                    Our Work
                </p>
                <p className="w-11/12 mx-auto text-2xl">Maybe some copy about your past work here?</p>
            </div>

            {/* #1 */}
            <div className="absolute top-[23%] left-[15%] md:top-[25%] md:left-[7%] lg:top-[15%] lg:left-[7%] xl:top-[10%] xl:left-[10%]">
                <motion.div
                    className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] object-cover rounded-xl"
                        src={`${categories.home.gallery[0]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            {/* #2 */}
            <div className="absolute bottom-[10%] right-[15%] md:bottom-[5%] md:right-[10%] lg:bottom-[15%] lg:right-[14%] xl:bottom-[25%] xl:right-[14%]">
                <motion.div
                    className="relative w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[1]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            {/* #3 */}
            <div className="absolute top-[75%] left-[20%] md:top-[75%] md:left-[15%] xl:top-[60%] xl:left-[25%]">
                <motion.div
                    className="relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[2]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            {/* #4 */}
            <div className="absolute bottom-[30%] right-[20%] md:bottom-[20%] md:right-[25%] lg:bottom-[30%] lg:right-[30%] xl:bottom-[35%] xl:right-[30%]">
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
            {/* #5 */}
            <div className="absolute bottom-[50%] left-[25%] md:bottom-[45%] md:left-[35%] lg:bottom-[45%] lg:left-[35%] xl:bottom-[50%] xl:left-[40%]">
                <motion.div
                    className="relative w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] rounded-xl"
                    whileHover={{
                        scale: 3,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[125px] h-[125px] lg:w-[150px] lg:h-[150px] object-cover rounded-xl"
                        src={`${categories.home.gallery[4]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
            {/* #6 */}
            <div className="absolute top-[30%] right-[10%] lg:top-[10%] lg:right-[7%] xl:top-[5%] xl:right-[15%]">
                <motion.div
                    className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    />
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] object-cover rounded-xl"
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