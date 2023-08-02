import { Formik, Form, Field} from 'formik';
import { addTestimonial } from '@/app/firebase/firestore';
import { Rating } from '@mui/material';
import { useState } from 'react';

interface CustomerTestimonialProps {
    setOpenTestimonial: Function,
    displayName: string,
    portraitId: string,
    artistId: string,
    customerId: string,
    setReviewed: Function
}

interface CustomerFormValues {
    displayName: String,
    text: string,
    stars: number,
    includeImg: boolean
}

const CustomerTestimonial = ({ setOpenTestimonial, displayName, portraitId, artistId, customerId, setReviewed }: CustomerTestimonialProps) => {
    
    const [rating, setRating] = useState<number | null>(2)

    const initialValues: CustomerFormValues = {
        displayName: displayName,
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
                
                    addTestimonial({...values, stars: rating, portraitId: portraitId, artistId: artistId, customerId: customerId, includeImg: values.includeImg})
                    
                    setReviewed(true)
                    helpers.setSubmitting(false)
                    helpers.resetForm(values)
                    setOpenTestimonial(false)
                }}
            >
                <Form className='flex flex-col px-8'>
                    <div className='w-full'>
                        <Rating
                            size="large"
                            name="stars"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue)
                        }}
                        />
                        <div>
                            <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
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

                        <label>
                            <Field type="checkbox" name="includeImg"/>
                            <span className='ml-2 font-semibold'>Include Image: Do you want to include your final image in your review?</span>
                        </label> 

                        <div className='w-full flex items-center'>
                            <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
                                Name:
                            </label>
                            <Field 
                                name="displayName" 
                                className="w-full ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                            />
                        </div>
                        
                    </div>
                    
                    <div className='w-6/12 mx-auto flex justify-around items-center mt-4'>
                        <button type='submit' className='py-2 px-4 border-2 border-[#282828] rounded-xl hover:text-white hover:bg-[#282828]'>Submit Testimonial</button>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}

export default CustomerTestimonial