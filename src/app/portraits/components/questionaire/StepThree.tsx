import { Formik, Form, Field } from 'formik';
import { motion } from 'framer-motion';

const StepThree = (props) => {
    
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
        <h3 className='text-center'>General Character Questions</h3>
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
            <Form className='w-full flex justify-between'>
                <div className='px-4 w-[45%]'>
                    <label className='text-sm leading-3'>
                        Character Basics: Can you provide a brief description of the character, including their name, age, gender, and any significant features (e.g., scars, tattoos, or birthmarks)?
                    </label>
                    <Field 
                        as="textarea"
                        rows="3"
                        cols="60" 
                        name="questions[0].q1" 
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                        />
                    <label className='text-sm leading-3'>
                        Personality: What is the character&#39;s personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?
                    </label>
                    <Field 
                        as="textarea"
                        rows="3"
                        cols="60" 
                        name="questions[0].q2"
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                        />
                    <label className='text-sm leading-3'>
                        Physical Appearance: Please describe the character&#39;s physical appearance in detail, including body type, hair color and style, eye color, and skin tone. If you have any reference images or inspirations, please provide them.
                    </label>
                    <Field 
                        as="textarea"
                        rows="3"
                        cols="60" 
                        name="questions[0].q3"
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                    />
                </div>
                <div className='px-4 w-[45%]'>
                    <label className='text-sm leading-3'>
                        Clothing and Accessories: What kind of clothing and accessories does your character wear? Are there any particular styles, colors, or motifs you would like to see incorporated into the outfit? Please provide detailed descriptions or reference images if available.
                    </label>
                    <Field 
                        as="textarea"
                        rows="3"
                        cols="60"
                        name="questions[0].q4"
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                    />
                    <label className='text-sm leading-3'>
                        Pose and Expression: Do you have a specific pose or expression in mind for the character, or would you like the artist to choose one that best represents the character&#39;s personality?
                    </label>
                    <Field 
                        as="textarea"
                        rows="3"
                        cols="60"
                        name="questions[0].q5" 
                        className="w-full text-black mt-2 border-2 border-[#282828]"
                    />
                    <div className='mt-8 w-full flex justify-around items-center'>
                        <button 
                            type="button" 
                            className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'
                            onClick={() => props.prev(values)}  
                        >
                        Back
                        </button>
                        <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Next</button>
                    </div>
                </div>
            </Form>
            )}
        </Formik>
    </motion.div>
    )
}


export default StepThree