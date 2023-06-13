import { Formik, Form, Field } from 'formik';
import { motion } from 'framer-motion';

const StepOne = (props) => {
    const handleSubmit = (values) => {
        props.next(values)
    }
    
    return (
        <motion.div
                variants={props.variants}
                initial='hidden'
                animate='visible'
                exit="exit"
        > 
            <h2>Welcome to the Portrait Customizer</h2>
            <p>Make your selections to customize your personal portrait</p>
            <Formik
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className='flex flex-col p-4'>
                        <button type="submit" className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>
                            Next
                        </button>
                    </Form>
                )}
            </Formik>
        </motion.div>
    )
}

export default StepOne