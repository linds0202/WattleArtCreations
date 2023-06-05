import { Formik, Form, Field } from 'formik';

export default function StepEight(props) {

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
        <h3 className='text-center'>Weapon Sheet Questions</h3>
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
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
                                name="questions[4].q1"
                                className="text-black mt-4" />
                        </label>
                        <label className='w-6/12 p-4'>
                            If you have any reference images or inspiration for the weapon design, please provide them.
                            <Field 
                                as="textarea"
                                rows="4"
                                cols="60" 
                                name="questions[4].q2" 
                                className="text-black mt-4" />
                        </label>
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
                </div>
            </Form>
            )}
        </Formik>
    </>
)
}