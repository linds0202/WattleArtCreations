import { Formik, Form, Field } from 'formik';
import Image from 'next/image';

export default function StepOne(props) {

const handleSubmit = (values) => {
    props.next(values)
}

return (
    <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
    >
        {() => (
        <Form className='flex flex-col'>
        <p className='text-2xl'>{props.data.styleOne}</p>
        {/* radio buttons */}
        <div className='flex justify-around items-center p-10'>
            <label className='text-center'>
                <Image 
                    src={'/featured_10.png'} 
                    alt="small Wattle Art Creations logo" 
                    width={150} 
                    height={250}
                    className='my-4'
                />
                <Field type="radio" name="styleTwo" value="Video Game" />
                    Video Games
            </label>
            <label className='text-center'>
                <Image 
                    src={'/featured_11.png'} 
                    alt="small Wattle Art Creations logo" 
                    width={150} 
                    height={250}
                    className='my-4'
                />
                <Field type="radio" name="styleTwo" value="Fantasy" />
                Fantasy
            </label>
            <label className='text-center'>
                <Image 
                    src={'/featured_13.png'} 
                    alt="small Wattle Art Creations logo" 
                    width={150} 
                    height={250}
                    className='my-4'
                />
                <Field type="radio" name="styleTwo" value="Portrait" />
                Portrait
            </label>
        </div>
        
        <button type="submit" className='w-4/12 mx-auto my-4 text-white border-2 border-white rounded-lg px-4 py-2'>Next</button>
        </Form>
        )}
    </Formik>
)
}