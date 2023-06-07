import { Formik, Form, Field } from 'formik';

export default function StepEight(props) {

    const handleSubmit = (values) => {
        props.next(values)
    }

return (
    <>
        <img src={'/drips/wizard8.png'} className='absolute w-full top-[100%] left-0'/>
        <h3 className='text-center'>Weapon Sheet Questions</h3>
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
            <Form className='h-full flex flex-col justify-around items-center'>
                <div className='flex justify-around'>
                    <div className='w-[48%] p-4'>
                        <label>
                            Please describe the weapon(s) in detail, including material, size, and any unique features or embellishments.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q1"
                            className="w-full text-black mt-2 border-2 border-[#282828]"  
                        />
                    </div>
                    <div className='w-[48%] p-4'>
                        <label className='w-6/12 p-4'>
                            If you have any reference images or inspiration for the weapon design, please provide them.
                        </label>
                        <Field 
                            as="textarea"
                            rows="4"
                            cols="60" 
                            name="questions[4].q2" 
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
    </>
)
}