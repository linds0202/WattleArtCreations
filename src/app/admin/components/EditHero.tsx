import {
  Formik,
  Form,
  Field,
} from 'formik'
import { Categories } from '@/app/context/CategoriesContext';

interface MyFormValues {
  newTitle: string,
  newTagline: string,
}

export interface EditProps {
    categories: Categories
    changeCategories: Function
}

export const EditHero = ({ categories, changeCategories }: EditProps) => {

    
    const initialValues: MyFormValues = { 
        newTitle: '',
        newTagline: '',
    }

    
    return (
        <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <p className='text-xl font-semibold mb-4'>Edit Category Types</p>
        
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    if (values.newTitle === '' && values.newTagline === '') {
                        actions.setSubmitting(false)
                    } else {
                        const newTitle = values.newTitle !== '' ? values.newTitle : categories.home.title
                        const newTagline = values.newTagline !== '' ? values.newTagline : categories.home.tagline
    
                        const newHomeObj = {
                            ...categories.home,
                            title: newTitle,
                            tagline: newTagline
                        }
    
                        const newCategories = {
                            ...categories,
                            home: newHomeObj
                        }

                        console.log('newCategories: ', newCategories)
                        changeCategories({...newCategories})
                        values.newTitle = ''
                        values.newTagline = ''
                        
                        actions.setSubmitting(false)
                    } 
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full my-4 flex justify-between'>
                        <div className='w-1/4 mr-4 flex flex-col'>
                            <label htmlFor="newTitle" className='text-xl mb-2'>Title</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newTitle" name="newTitle" placeholder={`${categories.home.title}`} />
                        </div>

                        <div className='w-1/4 mr-4 flex flex-col'>
                            <label htmlFor="newTagline" className='text-xl mb-2'>Tagline</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newTagline" name="newTagline" placeholder={`${categories.home.tagline}`} />
                        </div>
         
                        <button 
                            className='self-end w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out' 
                            type="submit"
                        >
                            Update Copy
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}