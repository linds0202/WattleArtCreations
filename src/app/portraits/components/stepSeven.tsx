import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepSeven(props) {

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
    <img src={'/drips/wizard7.png'} className='absolute w-full top-[100%] left-0'/>
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