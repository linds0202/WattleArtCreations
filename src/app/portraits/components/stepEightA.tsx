import { Formik, Form, Field } from 'formik';
import { useState } from 'react';

export default function StepEight(props) {
        
    const [weaponSheetQuestions, setWeaponSheetQuestions] = useState(props.data.questions[4])
    
    const handleSaveAnswers = (values) => {
        setWeaponSheetQuestions({
            'q1': values.q1,
            'q2': values.q2,
        })
    }

    const handleSubmit = (values) => {
        values.questions.splice(4, 1, weaponSheetQuestions)
        props.next(values)
    }

return (
    <>
    <h3 className='text-center'>Weapon Sheet Questions</h3>
    <Formik
        initialValues={props.data}
        onSubmit={handleSaveAnswers}
    >
        {({ values }) => (
        <Form>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-around'>
                    <label className='w-6/12 p-4'>
                        Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="q1" 
                            value={weaponSheetQuestions.q1} 
                            className="text-black mt-4" />
                    </label>
                    <label className='w-6/12 p-4'>
                        If you have any reference images or inspiration for the weapon design, please provide them.
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="q2" 
                            value={weaponSheetQuestions.q2} 
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