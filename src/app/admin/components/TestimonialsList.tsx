import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { useCategoriesContext } from "@/app/context/CategoriesContext";
import Testimonial from "./Testimonial";
import { TestimonialType } from "@/app/context/CategoriesContext";
import { getAllTestimonials } from "@/app/firebase/firestore";
import AddTestimonial from "./AddTestimonial";


export default function TestimonialsList() {
  const { categories, changeCategories } = useCategoriesContext()
  
  const [allTestimonials, setAllTestimonials] = useState<Array<TestimonialType>>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<Array<TestimonialType>>([]) 
  
  const [button, setButton] = useState<String>('')
  const [openAddTestimonial, setOpenAddTestimonial] = useState<boolean>(false)
  
  useEffect(() => {

    const getTestimonialsList = async () => {
      const testimonialList = await getAllTestimonials();
      if (testimonialList.length !== 0) {
        setAllTestimonials(testimonialList)
        setFilteredTestimonials(testimonialList)
      }
    }

    getTestimonialsList()
}, [])

  const handleGetCat1 = () => {
    const filtered = allTestimonials.filter(test => test.category === categories.cat1.type)
    setFilteredTestimonials(filtered)

    setButton('B1')
  }

  const handleGetCat2 = () => {
    const filtered = allTestimonials.filter(test => test.category === categories.cat2.type)
    setFilteredTestimonials(filtered)

    setButton('B2')
  }

  const handleGetCat3 = () => {
    const filtered = allTestimonials.filter(test => test.category === categories.cat3.type)
    setFilteredTestimonials(filtered)

    setButton('B3')
  }

  const handleClearFilters = () => {
    setFilteredTestimonials(allTestimonials)
    setButton('')
  }

  const handleOpenAddTestimonial = () => {
    setOpenAddTestimonial(true)
  }

  return (
    <div className="relative w-full mb-20">
      <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Testimonials</h1>
      
      <div className='w-full mx-auto flex justify-between mb-6 px-10'>
        <div className='w-3/4 flex justify-between'>
          <motion.button 
            className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B1' ? 'bg-[#43b4e4] text-white' : ''}`} 
            onClick={handleGetCat1} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            {categories.cat1.type}
          </motion.button>
        
          <motion.button 
            className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B2' ? 'bg-[#43b4e4] text-white' : ''}`} 
            onClick={handleGetCat2} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            {categories.cat2.type}
          </motion.button>

          <motion.button 
            className={`w-1/4 mx-4 border-2 border-black p-2 rounded-lg ${button === 'B3' ? 'bg-[#43b4e4] text-white' : ''}`} 
            onClick={handleGetCat3} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            {categories.cat3.type}
          </motion.button> 

          <motion.button 
            className='w-1/4 mx-4 p-2 border-2 border-black rounded-lg' 
            onClick={handleClearFilters} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            Clear Filters
          </motion.button>
        </div>

        <motion.button 
            className='w-1/6 mx-4 p-2 border-2 border-black rounded-lg hover:bg-[#43b4e4] hover:text-white' 
            onClick={handleOpenAddTestimonial} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            Add Testimonial
          </motion.button>

      </div>
      
      <div className='flex flex-col items-center w-full'>
        <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Stars</th>
                <th>Image</th>
                <th>Text</th>
                <th>Featured</th>
                <th>Featured Home</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.length === 0 ? 
                <tr>
                  <td>No testimonials to display</td>
                </tr>
              :  filteredTestimonials?.map((testimonial, i) => (
                <Testimonial 
                  key={i} 
                  testimonial={testimonial} 
                  categories={categories}
                  changeCategories={changeCategories}
                />
              )) }
            </tbody>
        </table>
      </div>   
      {openAddTestimonial && <AddTestimonial openAddTestimonial={openAddTestimonial} setOpenAddTestimonial={setOpenAddTestimonial} />}
    </div>
  )
}
