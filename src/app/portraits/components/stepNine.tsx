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
            <Form className='h-full flex flex-col justify-around items-center'>
                <img src={'/drips/wizard9.png'} className='absolute w-full top-[100%] left-0'/>
                <h4 className='text-2xl text-center'>Click to complete your custom portrait!</h4>
                <div className='flex w-8/12 justify-around'>
                    <button 
                        type="button" 
                        className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'
                        onClick={() => props.prev(values)}  
                    >
                    Back
                    </button>
                    <button type="submit" className='w-3/12 text-black border-2 border-black rounded-lg p-2 text-center'>Complete Portrait</button>
                </div>
            </Form>
            )}
        </Formik>
    )
}