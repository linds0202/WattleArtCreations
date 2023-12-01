import {
    Formik,
    Form,
    Field,
  } from 'formik'
import { Categories } from '@/app/context/CategoriesContext';
import { EditProps } from './EditHero';
import { EditCarouselHome1 } from './EditCarouselHome1';
import { EditCarouselHome2 } from './EditCarouselHome2';
import { EditCarouselHome } from './EditCarouselHome';

interface MyFormValues {
    newImgUrl: string
}

export const EditHomeCarousels = ({ categories, changeCategories }: EditProps) => {
    const initialValues: MyFormValues = { 
        newImgUrl: ''
    }
  
    return (
        <div className='w-11/12 mx-auto'>
            <EditCarouselHome categories={categories} changeCategories={changeCategories} cat={'cat1'}/>
            <EditCarouselHome categories={categories} changeCategories={changeCategories} cat={'cat2'}/>
            
            <div className='w-full bg-[#e9e9e9] my-8 p-4 rounded-lg'>
                <p className='text-xl font-semibold'>Edit {categories.cat3.type} Background Image</p>
                <p className='text-sm text-gray-400 mb-4'>(Image should be optimized for web, transparent background, include title, copy & image - button renders from HTML)</p>
                <div className='w-1/3 bg-black p-4'>
                    <img src={categories.cat3.pics.homeCarousel} className='w-[350px] h-[150px] object-contain'/>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {

                        const newPic = values.newImgUrl

                        const newPicsObj = {
                            ...categories.cat3.pics,
                            homeCarousel: newPic
                        }

                        const newCatObj = {
                            ...categories.cat3,
                            pics: newPicsObj
                        }

                        const newCategories = {
                            ...categories,
                            cat3: newCatObj
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
                                <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newImgUrl" name="newImgUrl" placeholder="New Image Url" />
                            </div>
            
                            <button 
                                className='w-1/4 mx-auto bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'  
                                type="submit"
                            >
                                Add to Gallery
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}