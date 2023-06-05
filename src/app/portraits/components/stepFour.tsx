import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepFour(props) {
    
    const [generalCharQuestions, setGeneralCharQuestions] = useState(props.data.questions[0])
    
    const handleSaveAnswers = (values) => {
        setGeneralCharQuestions({
            'q1': values.q1,
            'q2': values.q2,
            'q3': values.q3,
            'q4': values.q4,
            'q5': values.q5,  
        })
    }

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
    <h3 className='text-center'>General Character Questions</h3>
    <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='flex'>
            <div className='p-2'>
                <label>
                    Character Basics: Can you provide a brief description of the character, including their name, age, gender, and any significant features (e.g., scars, tattoos, or birthmarks)?
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[0].q1" 
                        className="text-black mt-4"
                     />
                </label>
                <label>
                    Personality: What is the character&#39;s personality like? Are there any specific traits or quirks that you would like to be reflected in the artwork?
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[0].q2"
                        className="text-black mt-4"
                     />
                </label>
                <label>
                    Physical Appearance: Please describe the character&#39;s physical appearance in detail, including body type, hair color and style, eye color, and skin tone. If you have any reference images or inspirations, please provide them.
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[0].q3"
                        className="text-black mt-4"
                    />
                </label>
            </div>
            <div className='p-2'>
                <label>
                    Clothing and Accessories: What kind of clothing and accessories does your character wear? Are there any particular styles, colors, or motifs you would like to see incorporated into the outfit? Please provide detailed descriptions or reference images if available.
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60"
                        name="questions[0].q4"
                        className="text-black mt-4"
                    />
                </label>
                <label>
                    Pose and Expression: Do you have a specific pose or expression in mind for the character, or would you like the artist to choose one that best represents the character&#39;s personality?
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60"
                        name="questions[0].q5" 
                        className="text-black mt-4"
                    />
                </label>
                <div className='flex w-8/12 justify-around'>
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
    {/* <Formik
        initialValues={ props.data }
        onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form>
            <div className='flex justify-around items-center w-8/12 mx-auto'>
                <button type="button" onClick={() => props.prev(values)} className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Back</button>
                <button type="submit" className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Next</button>
            </div>
        </Form>
        )}
    </Formik> */}
    </>
)
}