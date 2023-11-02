//  <motion.div 
//     className='flex justify-around py-20 w-[85%] relative' 
//     variants={container} 
//     initial='hidden'
//     whileInView='show'
//     viewport={{ once: true }}
// >
//     <div className="w-4/12 h-full flex justify-center items-center" >
//         <motion.div 
//             className="w-11/12 h-full flex flex-col justify-between items-center bg-white text-[#282828] p-8 border-2 rounded-xl border-black" 
//             variants={testimonialVariant} 
//             initial='hidden' 
//             whileInView='show' 
//             viewport={{ once: true }}
//             transition={{ delay: 0 + 1 / 3.5, duration: .25, type: 'spring' }}
//         >
//             <p>&ldquo;{options[`${mode}`].testimonials[0].body}&ldquo;</p>
//             <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[0].author}</p>
//         </motion.div>
//     </div>

//     <div className="w-4/12 h-full flex justify-center items-center" >

//         <motion.div 
//             className="w-11/12 h-full flex flex-col justify-between items-center bg-white text-[#282828] p-8 border-2 rounded-xl border-black" 
//             variants={testimonialVariant} 
//             initial='hidden' 
//             whileInView='show'
//             viewport={{ once: true }} 
//             transition={{ delay: .25 + 1 / 3.5, duration: .25, type: 'spring' }}
//         >
//             <p>&ldquo;{options[`${mode}`].testimonials[1].body}&ldquo;</p>
//             <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[1].author}</p>
//         </motion.div>
//     </div>

//     <div className="w-4/12 h-full flex justify-center items-center" >
//         <motion.div 
//             className="w-11/12 h-full flex flex-col justify-between items-center bg-white text-[#282828] p-8 border-2 rounded-xl border-black" 
//             variants={testimonialVariant} 
//             initial='hidden' 
//             whileInView='show' 
//             viewport={{ once: true }}
//             transition={{ delay: .5 + 1 / 3.5, duration: .25, type: 'spring' }}
//         >
//             <p>&ldquo;{options[`${mode}`].testimonials[2].body}&ldquo;</p>
//             <p className=' text-base font-bold text-right pr-10'>-{options[`${mode}`].testimonials[2].author}</p>
//         </motion.div>
//     </div>


//     <motion.img 
//         className="absolute -top-[50px] left-[75px] z-40" 
//         src='./images/testimonials/top_left.png' 
//         variants={splatterVariant} 
//         initial='hidden' 
//         whileInView='show' 
//         viewport={{ once: true }}
//         transition={{ delay: .5, duration: .25, type: 'spring' }}
//     />
        
//     <motion.img 
//         className="absolute top-[75%] right-[20%] z-40" 
//         src='./images/testimonials/bottom_right.png' 
//         variants={splatterVariant} 
//         initial='hidden' 
//         whileInView='show' 
//         viewport={{ once: true }}
//         transition={{ delay: .5, duration: .5, type: 'spring' }}
//     />
//     <motion.img 
//         className="absolute -top-[50px] right-[190px] z-40" 
//         src='./images/testimonials/top_right.png' 
//         variants={splatterVariant} 
//         initial='hidden' 
//         whileInView='show' 
//         viewport={{ once: true }}
//         transition={{ delay: .5, duration: .25, type: 'spring' }}
//     />
//     <motion.img 
//         className="absolute top-[73%] left-[30px] z-40" 
//         src='./images/testimonials/bottom_left.png' 
//         variants={splatterVariant} 
//         initial='hidden' 
//         whileInView='show' 
//         viewport={{ once: true }}
//         transition={{ delay: .5, duration: .5, type: 'spring' }}
//     />

// </motion.div> 