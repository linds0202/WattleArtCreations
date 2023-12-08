import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik'
import { Categories } from '@/app/context/CategoriesContext';
import { EditProps } from './EditHero';

interface MyFormValues {
  gallery1: string,
  gallery2: string,
  gallery3: string,
  gallery4: string,
  gallery5: string,
  gallery6: string
}

export const EditGallery = ({ categories, changeCategories }: EditProps) => {
    
    const initialValues: MyFormValues = { 
        gallery1: '',
        gallery2: '',
        gallery3: '',
        gallery4: '', 
        gallery5: '',
        gallery6: '', 
    }
    
    return (
        <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions })

                    const gal1 = values.gallery1 !== '' ? values.gallery1 : categories.home.gallery[0]
                    const gal2 = values.gallery2 !== '' ? values.gallery2 : categories.home.gallery[1]
                    const gal3 = values.gallery3 !== '' ? values.gallery3 : categories.home.gallery[2]
                    const gal4 = values.gallery4 !== '' ? values.gallery4 : categories.home.gallery[3]
                    const gal5 = values.gallery5 !== '' ? values.gallery5 : categories.home.gallery[4]
                    const gal6 = values.gallery6 !== '' ? values.gallery6 : categories.home.gallery[5]
                    
                    const newGalleryArr = [gal1, gal2, gal3, gal4, gal5, gal6]

                    const newHomeObj = {
                        ...categories.home,
                        gallery: newGalleryArr
                    }

                    const newCategories = {
                        ...categories,
                        home: newHomeObj
                    }

                    changeCategories({...newCategories})

                    values.gallery1 = ''
                    values.gallery2 = ''
                    values.gallery3 = ''
                    values.gallery4 = ''
                    values.gallery5 = ''
                    values.gallery6 = ''

                    actions.setSubmitting(false)
                }}
            >
                <Form className='w-10/12 mx-auto flex flex-col'>
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[0]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[200px] h-[200px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery1" name="gallery1" placeholder="New Gallery Image 1 URL" />
                        </div>
                    </div>
                    
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[1]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[150px] h-[150px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery2" name="gallery2" placeholder="New Gallery Image 2 URL" />
                        </div>
                    </div>
                    
                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[2]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[150px] h-[150px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery3" name="gallery3" placeholder="New Gallery Image 3 URL" />
                        </div>
                    </div>                    

                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[3]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[200px] h-[200px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery4" name="gallery4" placeholder="New Gallery Image 4 URL" />
                        </div>   
                    </div>        

                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[4]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[150px] h-[150px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery5" name="gallery5" placeholder="New Gallery Image 5 URL" /> 
                        </div>  
                    </div>      

                    <div className='w-full mt-4 flex justify-around items-center'>
                        <img src={`${categories.home.gallery[5]}`} className='w-[100px] h-[100px] object-cover' />
                        <div className='w-3/4'>
                            <p className='text-[#555555]'>Image size: w-[200px] h-[200px]</p>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="gallery6" name="gallery6" placeholder="New Gallery Image 6 URL" />
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