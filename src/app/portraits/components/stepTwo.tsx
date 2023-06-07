import { Formik, Form, Field } from 'formik';
import Image
 from 'next/image';
  export default function StepTwo(props) {
    
    const handleSubmit = (values) => {
        props.next(values) 
    }

    return (
        <Formik
            initialValues={props.data}
            onSubmit={handleSubmit}
        >
            {({ values }) => (
            <Form className='flex flex-col p-4'>
                <img src={'/drips/wizard2.png'} className='absolute w-full top-[100%] left-0'/>
                <p className='text-2xl'>{props.data.styleOne} &gt; {props.data.styleTwo}</p>
            {/* radio buttons */}
            <div className='flex justify-around items-center p-10'>
                <label className='text-center'>
                    <Image 
                        src={'/featured_12.png'} 
                        alt="small Wattle Art Creations logo" 
                        width={150} 
                        height={250}
                        className='my-4'
                    />
                    <Field type="radio" name="styleThree" value="FinalFantasy" />
                        Final Fantasy
                </label>
                <label className='text-center'>
                    <Image 
                        src={'/featured_13.png'} 
                        alt="small Wattle Art Creations logo" 
                        width={150} 
                        height={250}
                        className='my-4'
                    />
                    <Field type="radio" name="styleThree" value="WorldOfWarcraft" />
                        World of Warcraft
                </label>
                <label className='text-center'>
                    <Image 
                        src={'/featured_9.png'} 
                        alt="small Wattle Art Creations logo" 
                        width={150} 
                        height={250}
                        className='my-4'
                    />
                    <Field type="radio" name="styleThree" value="Other" />
                        Other
                </label>
            </div>
            <div className='flex justify-around items-center w-8/12 mx-auto'>
                <button type="button" onClick={() => props.prev(values)} className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Back</button>
                <button type="submit" className='w-4/12 mx-auto my-4 text-black border-2 border-black rounded-lg px-4 py-2'>Next</button>
            </div>
        </Form>
        )}
      </Formik>
    )
  }