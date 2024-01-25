import { useState } from "react"
import { motion } from "framer-motion"
import { useCategoriesContext } from "../context/CategoriesContext"
import { TestimonialType } from "../context/CategoriesContext"

const Home2_testimonials = () => {
    const { categories } = useCategoriesContext()
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const testimonials: Array<TestimonialType> = categories.home.testimonials
    const featuredTestimonials = testimonials.filter(test => test.featuredHome)
   
    
    const handleNext = () => {
        if(currentTestimonial < featuredTestimonials.length - 1) {
            setCurrentTestimonial(currentTestimonial + 1)
        } else {
            setCurrentTestimonial(0)
        }  
    }

    const handlePrev = () => {
        if(currentTestimonial === 0) {
            setCurrentTestimonial(featuredTestimonials.length - 1)
        } else {
            setCurrentTestimonial(currentTestimonial - 1)
        }  
    }

    return (
        <div className="relative w-full h-[125vh] lg:h-[80vh] xl:h-[125vh] mt-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#282828] from-20% via-[#282828] via-35% to-black to-60% pt-28">
            <img src="/images/drips/personal_underHang.png" className="absolute -top-10 left-0"/>
       
            <object type="image/svg+xml" data="images/past_commissions.svg" className="w-10/12 lg:w-2/3 mx-auto -mt-8 md:mt-10"></object>
        
            <div className="w-11/12 mx-auto mt-10 lg:mt-20 flex justify-around items-start md:items-center">
                <div 
                    className="w-1/12 mt-[300px] md:mt-0 object-cover hover:scale-110 cursor-pointer flex justify-end"
                    onClick={handlePrev}
                >
                    <img src="/images/testimonials/next_left.png"/>
                </div>

                <div className="w-10/12 flex flex-col md:flex-row justify-between items-center">
                    <img src={featuredTestimonials[currentTestimonial]?.imgUrl} className="w-[225px] h-[300px] md:w-[275px] md:h-[350px] lg:w-[350px] lg:h-[400px] mx-auto lg:mr-0 lg:ml-8 object-cover object-top rounded-xl"/>


                    <div className="w-full lg:w-3/4 p-2 lg:p-12">
                        <p className="text-lg mt-4 md:mt-0 pl-2 lg:text-xl xl:text-2xl font-thin"><span className="font-serif font-bold mr-2 lg:mr-8">&ldquo;</span>{featuredTestimonials[currentTestimonial]?.text}<span className="text-right font-serif font-bold ml-2 lg:ml-8">&rdquo;</span></p>                
                        <p className="text-right text-3xl font-semibold"><span className="font-serif font-bold mr-4">-</span>{featuredTestimonials[currentTestimonial]?.customerDisplayName}</p>
                    </div>
                </div>
                

                <div 
                    className="w-1/12 mt-[300px] md:mt-0 object-cover hover:scale-110 cursor-pointer"
                    onClick={handleNext}
                >
                    <img src="/images/testimonials/next_right.png"/>
                </div>
            </div>

            <div className="absolute bottom-[10%] right-[50%] md:bottom-[5%] md:right-[60%] lg:bottom-0 lg:right-[20%]">
                <motion.div
                    className="relative w-[150px] h-[150px] md:w-[175px] md:h-[175px] rounded-xl z-[20]"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat2.svg"
                        className="absolute top-0 left-0 w-[150px] h-[150px] md:w-[175px] md:h-[175px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    >
                    </motion.object>
                    <motion.img 
                        className="absolute top-0 left-0 w-[150px] h-[150px] md:w-[175px] md:h-[175px] object-cover rounded-xl"
                        src={`${categories.home.splatters[2]}`} 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
        
            <div className="absolute bottom-[5%] right-[20%] md:bottom-[15%] md:right-[20%] lg:bottom-[15%] lg:right-[5%]">
                <motion.div
                    className="relative w-[75px] h-[75px] md:w-[150px] md:h-[150px] rounded-xl"
                    whileHover={{
                        scale: 2,
                        rotate: 360,
                        transition: { duration: .3},
                    }}
                >
                    <motion.object 
                        type="image/svg+xml" 
                        data="images/HIWIcons/splat1.svg"
                        className="absolute top-0 left-0 w-[75px] h-[75px] md:w-[150px] md:h-[150px] rounded-xl"
                        initial={{ opacity: 1 }}
                        whileHover={{ 
                            opacity: 0,
                            transition: { duration: .3}
                        }}
                    >
                    </motion.object>
                    <motion.img 
                        className="absolute top-0 left-0 w-[75px] h-[75px] md:w-[150px] md:h-[150px] object-cover rounded-xl"
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