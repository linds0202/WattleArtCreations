import { motion } from "framer-motion"
import { useState } from 'react'
import { Categories, TestimonialType } from "@/app/context/CategoriesContext";
import TestimonialDetails from "./TestimonialDetails";
import { updateFeatureTestimonial } from "@/app/firebase/firestore";


interface TestimonialProps {
    testimonial: TestimonialType,
    categories: Categories,
    changeCategories: Function
}


export default function Testimonial( {testimonial, categories, changeCategories}: TestimonialProps ) {
    const [isCheckedFeatured, setIsCheckedFeatured] = useState(testimonial.featured)
    const [isCheckedFeaturedHome, setIsCheckedFeaturedHome] = useState(testimonial.featuredHome)
    
    const [openDetails, setOpenDetails] = useState(false)

    const handleViewDetails = () => {
        setOpenDetails(true)
    }

    const onChangeCheckBox = async (e: { target: { checked: boolean; value: React.SetStateAction<string>; }; }) => {

        setIsCheckedFeatured(() => e.target.checked)
        testimonial.featured = e.target.checked

        await updateFeatureTestimonial(testimonial)

        const updatedTestimonials: Array<TestimonialType> = categories.home.testimonials
        const newTestimonials = updatedTestimonials.filter(newTest => newTest.uid !== testimonial.uid)
       
        const newHomeObj = {
            ...categories.home,
            testimonials: [...newTestimonials, testimonial]
        }
    
        const newCategories = {
            ...categories,
            home: newHomeObj
        }
        
        changeCategories({...newCategories})  
    }

    const onChangeFeaturedHomeCheckBox = async (e: { target: { checked: boolean; value: React.SetStateAction<string>; }; }) => {
        
        setIsCheckedFeaturedHome(() => e.target.checked)
        testimonial.featuredHome = e.target.checked

        await updateFeatureTestimonial(testimonial)

        const updatedTestimonials: Array<TestimonialType> = categories.home.testimonials
        const newTestimonials = updatedTestimonials.filter(newTest => newTest.uid !== testimonial.uid)
        
        const newHomeObj = {
            ...categories.home,
            testimonials: [...newTestimonials, testimonial]
        }
    
        const newCategories = {
            ...categories,
            home: newHomeObj
        }
    
        changeCategories({...newCategories})

    }

    return (
    <>
        <tr className="h-[75px]">
            <td className="pl-2">{testimonial.category }</td>
            <td className="pl-2">{testimonial.stars}</td>
            <td className="pl-2"><img src={testimonial.imgUrl} className="w-[64px] h-[64px] object-cover"/></td>
            <td className="pl-2">{testimonial.text.slice(0, 30)}</td>
            <td className="w-2/12">
                <label htmlFor='featured'>
                    <input
                        type="checkbox" 
                        value="featured"
                        name="featured" 
                        onChange={onChangeCheckBox}
                        id="featured"
                        checked={isCheckedFeatured}
                    />
                </label>
            </td>
            <td className="w-2/12">
                <label htmlFor='featuredHome'>
                    <input
                        type="checkbox" 
                        value="featuredHome"
                        name="featuredHome" 
                        onChange={onChangeFeaturedHomeCheckBox}
                        id="featuredHome"
                        checked={isCheckedFeaturedHome}
                    />
                </label>
            </td>
            <td className="pl-[2%]">
                <motion.button 
                    className='border-2 border-black rounded-lg py-2 w-9/12 mx-auto h-8/12' 
                    onClick={handleViewDetails} 
                    whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.05 }}
                    >
                    View Details
                </motion.button>
            </td>
        </tr>
        {openDetails && <TestimonialDetails testimonial={testimonial} openDetails={openDetails} setOpenDetails={setOpenDetails}/>}
    </>)
}