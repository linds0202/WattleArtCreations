import { Formik, Form, Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StepThree = (props) => {
    
    const handleSubmit = (values) => {
        props.setPortraitData(prev => ({ ...prev, ...values }))
    }

    const handleClose = () => {
        props.setOpenCharacters(false)
    }
    
    return (
        <div className='relative'>
            <IconButton onClick={handleClose} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <h3 className='text-center'>General Character Questions</h3>
            <Formik
                initialValues={props.portraitData}
                onSubmit={handleSubmit}
            >
            {({ values }) => (
                <Form className='w-full flex justify-around'>
                    <div className='p-4 w-6/12 flex flex-col justify-between'>
                        <label>
                            Inspirations and References: Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[1].q1"
                            className="w-full text-black mt-2 border-2 border-[#282828]" 
                        />
                        <label>
                            Mood and Atmosphere: What kind of mood or atmosphere would you like to convey through the artwork (e.g., happy, mysterious, dramatic, serene, etc.)?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[1].q2" 
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                    </div>
                    <div className='p-4 w-6/12 flex flex-col justify-between'>
                        <label>
                            Special Requests: Are there any unique elements, features, or requests that you would like to include in your commission, which haven&#39;t been covered in the previous questions?
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[1].q3" 
                            className="w-full text-black mt-2 border-2 border-[#282828]" 
                        />
                        <div className='mt-8 flex w-full justify-around items-center'>
                            <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Next</button>
                        </div>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default StepThree