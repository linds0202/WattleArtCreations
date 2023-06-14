import { Formik, Form, Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StepFive = (props) => {
    
    const handleSubmit = (values) => {
        props.setPortraitData(prev => ({ ...prev, ...values }))
    }

    const handleClose = () => {
        props.setOpenCharSheet(false)
    }
    
    return (
        <div className='relative'>
            <IconButton onClick={handleClose} className='absolute top-2 right-2 '>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <h3 className='text-center'>Character Sheet Questions</h3>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                <Form className='h-full flex flex-col justify-around items-center'>
                    <div className='flex justify-around'>
                        <div className='w-[48%] p-4'>
                            <label>
                            Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.
                            </label>
                            <Field 
                                as="textarea"
                                rows="4"
                                cols="60" 
                                name="questions[3].q1"  
                                className="w-full text-black mt-2 border-2 border-[#282828]" 
                            />
                        </div>
                        <div className='w-[48%] p-4'>
                            <label>
                                Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?
                            </label>
                            <Field 
                                as="textarea"
                                rows="4"
                                cols="60" 
                                name="questions[3].q2"   
                                className="w-full text-black mt-2 border-2 border-[#282828]"
                            />
                        </div>
                    </div>
                    <div className='flex w-8/12 justify-around'>
                        <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Next</button>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default StepFive