import { useState } from "react"
import { motion } from "framer-motion"
import { useCategoriesContext } from "../context/CategoriesContext"
import { TestimonialType } from "../context/CategoriesContext"

const Home2_testimonials = () => {
    const { categories } = useCategoriesContext()
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const testimonials: Array<TestimonialType> = categories.home.testimonials
    const featuredTestimonials = testimonials.filter(test => test.featuredHome)

    console.log('featuredTestimonials.length: ', featuredTestimonials)
    
    
    const handleNext = () => {
        console.log('currentTestimonial: ', currentTestimonial)
        if(currentTestimonial < featuredTestimonials.length - 1) {
            setCurrentTestimonial(currentTestimonial + 1)
        } else {
            setCurrentTestimonial(0)
        }  
    }

    const handlePrev = () => {
        console.log('currentTestimonial: ', currentTestimonial)
        if(currentTestimonial === 0) {
            setCurrentTestimonial(featuredTestimonials.length - 1)
        } else {
            setCurrentTestimonial(currentTestimonial - 1)
        }  
    }

    return (
        <div className="relative w-full h-[125vh] mt-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#282828] from-20% via-[#282828] via-35% to-black to-60% pt-28">
            <img src="/images/drips/personal_underHang.png" className="absolute -top-10 left-0"/>
       
            <object type="image/svg+xml" data="images/past_commissions.svg" className="w-2/3 mx-auto mt-10"></object>
        
            <div className="w-full mt-20 flex justify-around items-center">
                <div 
                    className="w-1/6 object-cover hover:scale-110 cursor-pointer flex justify-end"
                    onClick={handlePrev}
                >
                    <img src="/images/testimonials/next_left.png"/>
                </div>

               <div className="w-2/3 flex justify-between items-center">
                <img src={featuredTestimonials[currentTestimonial]?.imgUrl} className="w-[350px] h-[400px] object-cover rounded-xl"/>


                <div className="w-8/12 p-4">
                    <p className="text-2xl font-thin"><span className="font-serif font-bold mr-8">&ldquo;</span>{featuredTestimonials[currentTestimonial]?.text}<span className="text-right font-serif font-bold ml-8">&rdquo;</span></p>                
                    <p className="text-right text-4xl font-semibold"><span className="font-serif font-bold mr-4">-</span>{featuredTestimonials[currentTestimonial]?.customerDisplayName}</p>
                </div>
               </div>
                

                <div 
                    className="w-1/6 object-cover hover:scale-110 cursor-pointer"
                    onClick={handleNext}
                >
                    <img src="/images/testimonials/next_right.png"/>
                </div>
            </div>



            {/* <div className="absolute bottom-[35%] right-[5%]">
                <motion.div
                    className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                    initial={{ scale: .7, rotate: 45 }}
                    animate={{ scale: .8, rotate: 65}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[75px] h-[75px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .7 }}
                        whileHover={{ 
                            opacity: .9,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>

            <div className="absolute bottom-[5%] right-[18%]">
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

            <div className="absolute bottom-[15%] right-[25%]">
                <motion.div
                    className="relative w-[75px] h-[75px] rounded-xl cursor-pointer"
                    initial={{ scale: .7, rotate: 45 }}
                    animate={{ scale: .8, rotate: 65}}
                    transition={{ type: "spring", duration: 2, repeatType: "reverse", repeat: Infinity }}
                >
                    <motion.img 
                        className="absolute top-0 left-0 w-[75px] h-[75px] rounded-xl"
                        src='images/gallery/splat1.png' 
                        initial={{ opacity: .7 }}
                        whileHover={{ 
                            opacity: .9,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div> */}

            <div className="absolute bottom-0 right-[20%]">
                <motion.div
                    className="relative w-[175px] h-[175px] rounded-xl z-[20]"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[175px] h-[175px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    >
                    </motion.object>
                    {/* <motion.img 
                        className="absolute top-0 left-0 w-[175px] h-[175px] rounded-xl"
                        src='images/gallery/splat2.png' 
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    /> */}
                    <motion.img 
                        className="absolute top-0 left-0 w-[175px] h-[175px] object-cover rounded-xl"
                        src={`${categories.home.splatters[2]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
        
            <div className="absolute bottom-[15%] right-[5%]">
                <motion.div
                    className="relative w-[150px] h-[150px] rounded-xl"
                    whileHover={{
                        scale: 2,
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
                    >
                    </motion.object>
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
                        src={`${categories.home.splatters[3]}`}
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

export default Home2_testimonials