import { Formik, Form} from 'formik';


export default function StepNine(props) {

    const handleSubmit = (values) => {
        props.next(values, true) //add ', true' after values for final step
    }

    return (
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
            <Form>
                <h4 className='text-center'>Click to complete your custom portrait!</h4>
                <div className='flex justify-around items-center w-8/12 mx-auto'>
                <button type="button" onClick={() => props.prev(values)} className='w-4/12 mx-auto my-4 text-white border-2 border-white rounded-lg px-4 py-2'>Back</button>
                <button type="submit" className='w-4/12 mx-auto my-4 text-white border-2 border-white rounded-lg px-4 py-2'>Complete Portrait</button>
            </div>
            </Form>
            )}
        </Formik>
    )
}