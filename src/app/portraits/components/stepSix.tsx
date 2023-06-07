import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepSix(props) {
        
    const [petQuestions, setPetQuestions] = useState(props.data.questions[2])
    
    const handleSaveAnswers = (values) => {
        setPetQuestions({
            'q1': values.q1,
            'q2': values.q2,
        })
    }

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
    <img src={'/drips/wizard6.png'} className='absolute w-full top-[100%] left-0'/>
    <h3 className='text-center'>Pet Questions</h3>
    <Formik
        initialValues={props.data}
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
                <button 
                    type="button" 
                    className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'
                    onClick={() => props.prev(values)}  
                >
                Back
                </button>
                <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Next</button>
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