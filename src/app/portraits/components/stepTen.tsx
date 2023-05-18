import { Formik, Form, Field } from 'formik';

export default function StepTen(props) {

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
            <button type="button" onClick={() => props.prev(values)} className='text-white border-2 border-white rounded-lg p-2'>Back</button>
            <button type="submit" className='text-white border-2 border-white rounded-lg p-2'>Complete Portrait</button>
        </Form>
        )}
    </Formik>
    )
}