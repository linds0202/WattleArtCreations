import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepSeven(props) {
        
    const [charSheetQuestions, setCharSheetQuestions] = useState(props.data.questions[3])
    
    const handleSaveAnswers = (values) => {
        setCharSheetQuestions({
            'q1': values.q1,
            'q2': values.q2,
        })
    }

    const handleSubmit = (values) => {
        values.questions.splice(3, 1, charSheetQuestions)
        props.next(values)
    }

return (
    <>
    <h3 className='text-center'>Character Sheet Questions</h3>
    <Formik
        initialValues={props.data}
        onSubmit={handleSaveAnswers}
    >
        {({ values }) => (
        <Form>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-around'>
                    <label className='w-6/12 p-4'>
                    Please provide any relevant character information that should be included on the character sheet, such as name, race, class, abilities, and backstory.
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="q1" 
                            value={charSheetQuestions.q1} 
                            className="text-black mt-4" />
                    </label>
                    <label className='w-6/12 p-4'>
                        Are there any specific visual elements or layouts you&#39;d like incorporated into the character sheet design?
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="q2" 
                            value={charSheetQuestions.q2} 
                            className="text-black mt-4" />
                    </label>
                </div>
                <button type="submit" className='text-white border-2 border-white rounded-lg p-2'>Save Answers</button>
            </div> 
        </Form>
        )}
    </Formik>
    <Formik
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
    </Formik>
    </>
)
}