import {
  Formik,
  Form,
  Field,
} from 'formik'
import { Categories } from '@/app/context/CategoriesContext';
import { EditProps } from './EditHero';

interface MyFormValues {
  newCat1: string,
  newCat2: string,
  newCat3: string
}

export const EditTypes = ({ categories, changeCategories }: EditProps) => {

    
    const initialValues: MyFormValues = { 
        newCat1: '',
        newCat2: '',
        newCat3: ''
    }

    
    return (
        <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <p className='text-xl font-semibold mb-4'>Edit Category Types</p>
        
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    if (values.newCat1 === '' && values.newCat2 === '' && values.newCat3 === '') {
                        actions.setSubmitting(false)
                    } else {
                        const newCat1 = values.newCat1 !== '' ? values.newCat1 : categories.cat1.type
                        const newCat2 = values.newCat2 !== '' ? values.newCat2 : categories.cat2.type
                        const newCat3 = values.newCat3 !== '' ? values.newCat3 : categories.cat3.type
    
                        const newCat1Obj = {
                            ...categories.cat1,
                            type: newCat1
                        }
    
                        const newCat2Obj = {
                            ...categories.cat2,
                            type: newCat2
                        }
    
                        const newCat3Obj = {
                            ...categories.cat3,
                            type: newCat3
                        }
    
                        const newCategories = {
                            ...categories,
                            cat1: newCat1Obj,
                            cat2: newCat2Obj,
                            cat3: newCat3Obj
                        }
    
                        changeCategories({...newCategories})
                        values.newCat1 = ''
                        values.newCat2 = ''
                        values.newCat3 = ''
                        actions.setSubmitting(false)
                    } 
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full my-4 flex justify-between'>
                        <div className='w-1/4 mr-4 flex flex-col'>
                            <label htmlFor="newCat1" className='text-xl mb-2'>Category 1</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newCat1" name="newCat1" placeholder={`${categories.cat1.type}`} />
                        </div>

                        <div className='w-1/4 mr-4 flex flex-col'>
                            <label htmlFor="newCat2" className='text-xl mb-2'>Category 2</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newCat2" name="newCat2" placeholder={`${categories.cat2.type}`} />
                        </div>

                        <div className='w-1/4 mr-4 flex flex-col'>
                            <label htmlFor="newCat3" className='text-xl mb-2'>Category 3</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newCat3" name="newCat3" placeholder={`${categories.cat3.type}`} />
                        </div>
         
                        <button 
                            className='self-end w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out' 
                            type="submit"
                        >
                            Update Types
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}