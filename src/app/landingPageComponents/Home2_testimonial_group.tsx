import { TestimonialType } from '../context/CategoriesContext'
import Home2_testimonial from './Home2_testimonial'
import { useState } from 'react'

export interface TestimonialGroupProps {
    testGroup: Array<TestimonialType>
}

const Home2_testimonial_group = ({testGroup}: TestimonialGroupProps) => {
    
    const [allIndexes, setAllIndexes] = useState<Array<number>>([0, 1, 2]) 

    const showNextGroup = () => {
        const newIndexes = allIndexes.map(i => i + 3)
        const updatedIndexes = newIndexes.map(i => {
            if (i >= testGroup.length) {
                return i - testGroup.length
            } else{
                return i
            }  
        })
        setAllIndexes(updatedIndexes)
    }

    const showPrevGroup = () => {
        const newIndexes = allIndexes.map(i => i - 3)
        const updatedIndexes = newIndexes.map(i => {
            if (i < 0) {
                return i + testGroup.length
            } else {
                return i
            } 
        })
        setAllIndexes(updatedIndexes)
    }
    
    return (
        <div className='w-full h-[80vh] lg:h-[50vh] xl:h-[80vh] flex items-center border border-red-600'>
            <div 
                className="w-1/6 object-cover hover:scale-110 cursor-pointer flex justify-end"
                onClick={showPrevGroup}
            >
                <img src="/images/testimonials/next_left.png"/>
            </div>
                {testGroup.length > 0 && <Home2_testimonial test={testGroup[allIndexes[0]]} />}
                {testGroup.length > 1 && <Home2_testimonial test={testGroup[allIndexes[1]]} />}
                {testGroup.length > 2 && <Home2_testimonial test={testGroup[allIndexes[2]]} />}
            <div 
                className="w-1/6 object-cover hover:scale-110 cursor-pointer"
                onClick={showNextGroup}
            >
                <img src="/images/testimonials/next_right.png"/>
            </div>
        </div>
    )
}

export default Home2_testimonial_group