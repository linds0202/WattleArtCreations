import { motion } from "framer-motion"
import '../menu/styles.css'
import { useState, useEffect } from "react"
import { useCategoriesContext } from "@/app/context/CategoriesContext";
import Testimonial from "./Testimonial";
import { TestimonialType } from "@/app/context/CategoriesContext";
import { getAllTestimonials } from "@/app/firebase/firestore";
import AddTestimonial from "./AddTestimonial";
import SearchTestimonials from "./SearchTestimonials";


export default function TestimonialsList() {
  const { categories, changeCategories } = useCategoriesContext()
  
  const [allTestimonials, setAllTestimonials] = useState<Array<TestimonialType>>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<Array<TestimonialType>>([]) 
  
  const [button, setButton] = useState<String>('')
  const [openAddTestimonial, setOpenAddTestimonial] = useState<boolean>(false)
  const [newAdded, setNewAdded] = useState(false)
  
  useEffect(() => {

    console.log('calling this')

    const getTestimonialsList = async () => {
      const testimonialList = await getAllTestimonials();
      if (testimonialList.length !== 0) {
        setAllTestimonials(testimonialList)
        setFilteredTestimonials(testimonialList)
      }
    }

    getTestimonialsList()
  }, [newAdded])

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

  const handleGetFeatured = () => {
    const filtered = allTestimonials.filter(test => test.featured)
    console.log('featured: ', filtered)
    setFilteredTestimonials(filtered)

    setButton('B4')
  }

  const handleGetFeaturedHome = () => {
    const filtered = allTestimonials.filter(test => test.featuredHome)
    console.log('featuredHome: ', filtered)
    setFilteredTestimonials(filtered)

    setButton('B5')
  }

  const handleClearFilters = () => {
    setFilteredTestimonials(allTestimonials)
    setButton('')
  }

  const handleOpenAddTestimonial = () => {
    setOpenAddTestimonial(true)
  }

  console.log('filtered testimonials is: ', filteredTestimonials)
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

      <div className="w-11/12 mx-auto mb-4 flex justify-between">
        <div className='w-1/2 self-start flex'>
          <motion.button 
            className={`w-1/3 border-2 border-black p-2 rounded-lg ${button === 'B4' ? 'bg-[#43b4e4] text-white' : ''}`} 
            onClick={handleGetFeatured} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            Featured
          </motion.button>
        
          <motion.button 
            className={`w-1/3 ml-8 border-2 border-black p-2 rounded-lg ${button === 'B5' ? 'bg-[#43b4e4] text-white' : ''}`} 
            onClick={handleGetFeaturedHome} 
            whileHover={{ scale: 1.1, transition: {duration: 0.15} }} whileTap={{ scale: 1.03 }}
          >
            Featured Home
          </motion.button>
        </div>
        <SearchTestimonials
          setFilteredTestimonials={setFilteredTestimonials} 
          allTestimonials={allTestimonials}  
        />
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
                <th>Details</th>
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
      {openAddTestimonial && 
        <AddTestimonial 
          openAddTestimonial={openAddTestimonial} 
          setOpenAddTestimonial={setOpenAddTestimonial} 
          allTestimonials={allTestimonials}
          setAllTestimonials={setAllTestimonials}  
          newAdded={newAdded}
          setNewAdded={setNewAdded}
        />
      }
    </div>
  )
}
