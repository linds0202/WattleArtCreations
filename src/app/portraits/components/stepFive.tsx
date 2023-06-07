import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepFive(props) {   

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
    <img src={'/drips/wizard5.png'} className='absolute w-full top-[100%] left-0'/>
    <h3 className='text-center'>General Questions</h3>
    <Formik
        initialValues={props.data}
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