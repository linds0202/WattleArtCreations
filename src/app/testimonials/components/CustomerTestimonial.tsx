import { Formik, Form, Field} from 'formik';
import { addTestimonial } from '@/app/firebase/firestore';
import Rating from '@mui/material/Rating';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';

interface CustomerTestimonialProps {
    setOpenTestimonial: Function,
    displayName: string,
    category: string,
    portraitId: string | null,
    artistId: string | null,
    customerId: string,
    completionDate: Timestamp,
    setReviewed: Function
}

interface CustomerFormValues {
    customerDisplayName: String,
    text: string,
    stars: number,
    includeImg: boolean
}

const CustomerTestimonial = ({ setOpenTestimonial, displayName, category, portraitId, artistId, customerId, completionDate, setReviewed }: CustomerTestimonialProps) => {
    
    const [rating, setRating] = useState<number | null>(2)

    const initialValues: CustomerFormValues = {
        customerDisplayName: displayName,
        text: "",
        stars: 0,
        includeImg: false
    }

    return (
        <div>
            <h3 className='text-2xl text-center font-semibold'>Rate & Review your experience</h3>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                
                    addTestimonial({
                        ...values, 
                        stars: rating, 
                        category: category, 
                        portraitId: portraitId, 
                        artistId: artistId, 
                        customerId: customerId, 
                        includeImg: values.includeImg, 
                        featured: false, 
                        featuredHome: false,
                        portraitCompletionDate: completionDate
                    })
                    
                    setReviewed(true)
                    helpers.setSubmitting(false)
                    helpers.resetForm()
                    setOpenTestimonial(false)
                }}
            >
                <Form className='flex flex-col px-8'>
                    <div className='w-full'>
                        <Rating
                            emptyIcon={<StarOutlineIcon style={{ color: 'white', opacity: 0.65  }} fontSize="inherit" />}
                            size="large"
                            name="stars"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue)
                        }}
                        />
                        <div className='mb-4'>
                            <label className='text-xl leading-3 font-semibold text-[#43b4e4]'>
                                Review:
                            </label>
                            <Field 
                                required
                                as="textarea"
                                rows="5"
                                cols="60" 
                                name="text" 
                                className="w-full text-black mt-2 border-2 border-[#E5E5E5] rounded-xl p-4"
                            />
                        </div>  

                        <label >
                            <Field type="checkbox" name="includeImg" size="large"/>
                            <span className='text-xl ml-2 font-semibold text-[#43b4e4]'>Include Image:<span className='text-white font-light'> Do you want to include your final image in your review?</span></span>
                        </label> 

                        <div className='w-full mt-4 flex items-center'>
                            <label className='text-xl text-gray-light leading-3 font-semibold text-[#43b4e4]'>
                                Name:
                            </label>
                            <Field 
                                name="customerDisplayName" 
                                className="w-full ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>
                        
                    </div>
                    
                    <div className='w-6/12 mx-auto flex justify-around items-center mt-4'>
                        <button 
                            type='submit' 
                            className='w-full xl:w-2/3 mx-auto mt-4 text-xl text-white rounded-lg py-2 px-4 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] cursor-pointer hover:scale-105 transition duration-200 ease-in-out '
                        >
                            Submit Testimonial
                        </button>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}

export default CustomerTestimonial