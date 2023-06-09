import { Formik, Form, Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StepFour = (props) => {
    
    const handleSubmit = (values) => {
        props.setPortraitData(prev => ({ ...prev, ...values }))
    }

    const handleClose = () => {
        props.setOpenPets(false)
    }
    
    return (
        <div className='relative'>
            <IconButton onClick={handleClose} className='absolute top-2 right-2 '>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <h3 className='text-center'>Pet Questions</h3>
            <Formik
                initialValues={props.portraitData}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                <Form className='h-full flex flex-col justify-around items-center'>
                    <div className='flex justify-around'>
                        <div className='w-[48%] p-4'>
                            <label>
                                For your pet/familiar, please describe their appearance, including any unique features or accessories.
                            </label>
                            <Field 
                                as="textarea"
                                rows="4"
                                cols="60" 
                                name="questions[2].q1" 
                                className="w-full text-black mt-2 border-2 border-[#282828]"  
                            />
                        </div>
                        <div className='w-[48%] p-4'>
                            <label>
                                How would you like the pet/familiar to interact with the character in the artwork (e.g., sitting beside the character,perched on the character&#39;s shoulder, etc.)?
                            </label>
                            <Field 
                                as="textarea"
                                rows="4"
                                cols="60" 
                                name="questions[2].q2"
                                className="w-full text-black mt-2 border-2 border-[#282828]"  
                            />
                        </div>
                    </div>
                    <div className='flex w-8/12 mt-8 justify-around items-center'>
                        <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Next</button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default StepFour