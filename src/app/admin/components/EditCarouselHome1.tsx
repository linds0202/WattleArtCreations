import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik'
import { Categories } from '@/app/context/CategoriesContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface MyFormValues {
  newImgUrl: string
}

interface MyCopyFormValues {
    newHomeBlurb: string
}

interface EditSplattersProps {
    categories: Categories
    changeCategories: Function
}

export const EditCarouselHome1 = ({ categories, changeCategories }: EditSplattersProps) => {

    
    const initialValues: MyFormValues = { 
        newImgUrl: ''
    }

    const initialCopyValues: MyCopyFormValues = { 
        newHomeBlurb: ''
    }

    const handleDeleteImg = (i: number) => {
  
        let updatedUrls = categories.cat1.pics.homeCarousel.filter((url: string , j: number) => j !== i)

        const newPicsObj = {
            ...categories.cat1.pics,
            homeCarousel: updatedUrls
        }

        const newCatObj = {
            ...categories.cat1,
            pics: newPicsObj
        }

        const newCategories = {
            ...categories,
            cat1: newCatObj
        }

        changeCategories({...newCategories})

    }


    const existingUrls = categories.cat1.pics.homeCarousel.map((link: string, i: number) => (
        <div className='relative mr-4 mb-4' key={i}>
            <button type="button" onClick={() => handleDeleteImg(i)} className='absolute top-2 right-2 text-red-600 hover:text-red-800'>
                <DeleteForeverIcon />
            </button>
            <img src={link} className='w-[150px] h-[150px] object-cover'/>
        </div>
    ))

    
    return (
        <div className='w-full bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <p className='text-xl font-semibold mb-4'>Edit {categories.cat1.type} Home Carousel</p>

            <div className='flex flex-wrap'>
                {existingUrls} 
            </div>
        
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {

                    const newPicsArr = [...categories.cat1.pics.homeCarousel, values.newImgUrl]

                    

                    const newPicsObj = {
                        ...categories.cat1.pics,
                        homeCarousel: newPicsArr
                    }

                    const newCatObj = {
                        ...categories.cat1,
                        pics: newPicsObj
                    }

                    const newCategories = {
                        ...categories,
                        cat1: newCatObj
                    }

                    changeCategories({...newCategories})
                    values.newImgUrl = ''
                    actions.setSubmitting(false)
                    
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full mt-4 flex justify-between items-center'>
                        <div className='w-3/4 mr-4 flex items-center'>
                            <label htmlFor="newImgUrl" className='mr-4'>New Image Url</label>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newImgUrl" name="newImgUrl" placeholder="https://..." />
                        </div>
         
                        <button 
                            className='w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'  
                            type="submit"
                        >
                            Add to Gallery
                        </button>
                    </div>
                </Form>
            </Formik>

            <Formik
                initialValues={initialCopyValues}
                onSubmit={(values, actions) => {

                    const newHomeBlurb = values.newHomeBlurb !== '' ? values.newHomeBlurb : categories.cat1.copy.homeBlurb

                    const newHomeBlurbObj = {
                        ...categories.cat1.copy,
                        homeBlurb: newHomeBlurb
                    }

                    const newCatObj = {
                        ...categories.cat1,
                        copy: newHomeBlurbObj
                    }

                    const newCategories = {
                        ...categories,
                        cat1: newCatObj
                    }

                    changeCategories({...newCategories})
                    values.newHomeBlurb = ''
                    actions.setSubmitting(false)
                    
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full mt-4 flex justify-between items-center'>
                        <div className='w-3/4 mr-4 flex flex-col'>
                            <label htmlFor="newHomeBlurb" className='mr-4'>New Homepage {categories.cat1.type} Carousel Blurb</label>
                            <Field
                                as="textarea"
                                rows="6"
                                cols="60"  
                                className="text-md w-full text-black mt-2 border border-[#282828] p-2 rounded-lg" 
                                id="newHomeBlurb" 
                                name="newHomeBlurb" 
                                placeholder={`Start typing ...`} 
                            />
                        </div>
         
                        <button 
                            className='w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'  
                            type="submit"
                        >
                            Update Blurb
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}