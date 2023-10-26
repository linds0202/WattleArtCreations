import { useState } from "react"
import { motion } from "framer-motion"

const Home1_testimonials = () => {

    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const testimonials = [
        {
            index: 0,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            author: 'Joe',
            imgSrc:'/images/animeImgs/anime5.png'
        },
        {
            index: 1,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet venenatis ipsum, vitae hendrerit purus. Sed consequat tortor eu eleifend pulvinar. Curabitur et scelerisque mauris.',
            author: 'Alex',
            imgSrc:'/images/animeImgs/anime6.png'
        },
        {
            index: 2,
            body: 'Vivamus rhoncus pellentesque mi, vel rutrum libero dapibus a. Morbi maximus purus quis urna lacinia, sed faucibus lacus suscipit. Phasellus imperdiet nibh dui, non ultricies diam mattis id. ',
            author: 'Christie',
            imgSrc:'/images/animeImgs/anime7.png'
        },
    ]

    const handleNext = () => {
        if(currentTestimonial < testimonials.length - 1) {
            setCurrentTestimonial(currentTestimonial + 1)
        } else {
            setCurrentTestimonial(0)
        }  
    }

    const handlePrev = () => {
        if(currentTestimonial === 0) {
            setCurrentTestimonial(testimonials.length - 1)
        } else {
            setCurrentTestimonial(currentTestimonial - 1)
        }  
    }
    
    return (
        <div className="relative w-full h-[100vh] mt-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#282828] from-20% via-[#282828] via-35% to-black to-60% pt-28">
            <img src="/images/drips/personal_underHang.png" className="absolute -top-10 left-0"/>
            <p
                className="font-serif text-white text-8xl text-center font-bold mb-10"
            >
                Past Commissions
            </p>

            <div className="w-10/12 mx-auto mt-8 flex justify-around items-center">
                <div 
                    className="w-1/6 object-cover hover:scale-110 cursor-pointer"
                    onClick={handlePrev}
                >
                    <img src="/images/testimonials/next_left.png"/>
                </div>

               
                <img src={testimonials[currentTestimonial].imgSrc} className="w-[350px] h-[400px] object-cover rounded-xl"/>


                <div className="w-7/12 p-8">
                    <p className="text-3xl font-thin"><span className="font-serif font-bold mr-8">&ldquo;</span>{testimonials[currentTestimonial].body}<span className="text-right font-serif font-bold ml-8">&ldquo;</span></p>                
                    <p className="text-right text-4xl font-semibold"><span className="font-serif font-bold mr-4">-</span>{testimonials[currentTestimonial].author}</p>
                </div>

                <div 
                    className="w-1/6 object-cover hover:scale-110 cursor-pointer"
                    onClick={handleNext}
                >
                    <img src="/images/testimonials/next_right.png"/>
                </div>
            </div>



            <div className="absolute bottom-[35%] right-[5%]">
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

            <div className="absolute bottom-[15%] right-[35%]">
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

            <div className="absolute bottom-[5%] right-[45%]">
                <motion.div
                    className="relative w-[200px] h-[200px] rounded-xl cursor-pointer z-[20]"
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
                        src='images/photoImgs/photo4.jpg' 
                        initial={{ opacity: 0 }}
                        whileHover={{ 
                            opacity: 1,
                            transition: { duration: .3}
                        }}
                    />
                </motion.div>
            </div>
        
            <div className="absolute bottom-[15%] right-[7%]">
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
                        className="absolute top-0 left-0 w-[150px] h-[150px] object-cover rounded-xl"
                        src='images/defaultImgs/anime.png' 
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

export default Home1_testimonials