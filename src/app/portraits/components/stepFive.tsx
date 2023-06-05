import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepFive(props) {
        
    const [generalQuestions, setGeneralQuestions] = useState(props.data.questions[1])
    
    const handleSaveAnswers = (values) => {
        setGeneralQuestions({
            'q1': values.q1,
            'q2': values.q2,
            'q3': values.q3,
        })
    }

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
    <h3 className='text-center'>General Questions</h3>
    <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
    >
        {({ values }) => (
        <Form className='flex justify-around'>
            <div className='p-4 w-6/12'>
                <label>
                    Inspirations and References: Are there any existing artworks, characters, or scenes that inspire your commission idea? Please provide links or images to help the artist understand your vision better.
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[1].q1"
                        className="text-black mt-4" />
                </label>
                <label>
                    Mood and Atmosphere: What kind of mood or atmosphere would you like to convey through the artwork (e.g., happy, mysterious, dramatic, serene, etc.)?
                    <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[1].q2" 
                        className="text-black mt-4" />
                </label>
            </div>
            <div className='p-4 w-6/12'>
                <label>
                    Special Requests: Are there any unique elements, features, or requests that you would like to include in your commission, which haven&#39;t been covered in the previous questions?
                <Field 
                        as="textarea"
                        rows="4"
                        cols="60" 
                        name="questions[1].q3" 
                        className="text-black mt-4" />
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
                <button type="button" onClick={() => props.prev(values)} className='w-4/12 mx-auto my-4 text-white border-2 border-white rounded-lg px-4 py-2'>Back</button>
                <button type="submit" className='w-4/12 mx-auto my-4 text-white border-2 border-white rounded-lg px-4 py-2'>Next</button>
            </div>
        </Form>
        )}
    </Formik> */}
    </>
)
}