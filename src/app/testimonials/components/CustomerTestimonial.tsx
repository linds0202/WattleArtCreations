import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Formik, Form, Field} from 'formik';
import { UserData } from '@/app/artistDashboard/[userId]/portfolio/page';
import UpdateInfoButton from '@/app/artistDashboard/[userId]/portfolio/components/UpdateInfoButton';
import CancelUpdateButton from '@/app/artistDashboard/[userId]/portfolio/components/CancelUpdate';
import { addTestimonial } from '@/app/firebase/firestore';

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
    stars: number
}

const CustomerTestimonial = ({ setOpenTestimonial, displayName, portraitId, artistId, customerId, setReviewed }: CustomerTestimonialProps) => {
    
    const initialValues: CustomerFormValues = {
        displayName: displayName,
        text: "",
        stars: 0
    }

    const handleCancel = () => {
        console.log('canceling the testimonial')
        setOpenTestimonial(false)
    }

    return (
        <div className='w-8/12 mx-auto my-10 border-2 border-black rounded-xl relative'>
            <p className='text-center text-3xl font-bold mt-4'>Leave a Review!</p>

            <IconButton onClick={() => setIsEdit(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, helpers) => {
                    helpers.setSubmitting(true)
                    addTestimonial({...values, portraitId: portraitId, artistId: artistId, customerId: customerId})
                    console.log('submitting the values: ', values)
                    setReviewed(true)
                    helpers.setSubmitting(false)
                    helpers.resetForm(values)
                    setOpenTestimonial(false)
                }}
            >
                <Form className='flex flex-col px-20 py-8'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-6/12'>
                        <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
                            Name:
                        </label>
                        <Field 
                            name="displayName" 
                            className="w-9/12 ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                        </div>
                        <div className='w-6/12'>
                        <label className='text-base text-gray-light leading-3 font-semibold text-[#0075FF]'>
                            Review:
                        </label>
                        <Field 
                            name="text" 
                            className="w-9/12 ml-2 text-black border-2 border-[#E5E5E5] px-4 rounded-lg"
                        />
                        </div>    
                    </div>
                    
                    <div className='w-6/12 mx-auto flex justify-around items-center mt-4'>
                        <button type='submit'>Submit Testimonial</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}

export default CustomerTestimonial