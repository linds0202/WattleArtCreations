import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik'
import { Categories } from '@/app/context/CategoriesContext';
import { EditProps } from './EditHero';

interface MyFormValues {
  splatter1: string,
  splatter2: string,
  splatter3: string,
  splatter4: string
}

export const EditSplatters = ({ categories, changeCategories }: EditProps) => {
    
    const initialValues: MyFormValues = { 
        splatter1: '',
        splatter2: '',
        splatter3: '',
        splatter4: '', 
    }
    
    return (
        <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions })

                    const splat1 = values.splatter1 !== '' ? values.splatter1 : categories.home.splatters[0]
                    const splat2 = values.splatter2 !== '' ? values.splatter2 : categories.home.splatters[1]
                    const splat3 = values.splatter3 !== '' ? values.splatter3 : categories.home.splatters[2]
                    const splat4 = values.splatter4 !== '' ? values.splatter4 : categories.home.splatters[3]

                    const newSplatterArr = [splat1, splat2, splat3, splat4]

                    const newHomeObj = {
                        ...categories.home,
                        splatters: newSplatterArr
                    }

                    const newCategories = {
                        ...categories,
                        home: newHomeObj
                    }

                    changeCategories({...newCategories})

                    actions.setSubmitting(false)
                    values.splatter1 = ''
                    values.splatter2 = '' 
                    values.splatter3 = '' 
                    values.splatter4 = ''
                }}
            >
                <Form className='w-10/12 mx-auto flex flex-col'>
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.splatters[0]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[150px] h-[150px]</p>
                            <Field className='w-full border border-[#282828] p-2 rounded-lg' id="splatter1" name="splatter1" placeholder="New Splatter 1 URL" />
                        </div>
                    </div>
                    
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.splatters[1]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[200px] h-[200px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="splatte2" name="splatter2" placeholder="New Splatter 2 URL" />
                        </div>
                    </div>
                    
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.splatters[2]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[175px] h-[175px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="splatter3" name="splatter3" placeholder="New Splatter 3 URL" />
                        </div>
                    </div>                    

                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.splatters[3]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[150px] h-[150px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="splatter4" name="splatter4" placeholder="New Splatter 4 URL" /> 
                        </div>  
                    </div>        
                    
                    <button 
                        className='w-1/5 mx-auto bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                        type="submit"
                    >
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    )
}