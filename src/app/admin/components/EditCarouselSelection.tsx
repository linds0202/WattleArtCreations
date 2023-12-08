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

interface MyUrlFormValues {
    newSelectionHeroUrl: string,
    newSelectionBGUrl: string
}

interface MyCopyFormValues {
    newSelectionHeroBlurb: string,
    newSelectionCarouselBlurb: string
}

interface EditSplattersProps {
    categories: Categories
    changeCategories: Function,
    cat: string
}

export const EditCarouselSelection = ({ categories, changeCategories, cat }: EditSplattersProps) => {

    
    const initialValues: MyFormValues = { 
        newImgUrl: ''
    }

    const initialUrlValues: MyUrlFormValues = { 
        newSelectionHeroUrl: '',
        newSelectionBGUrl: ''
    }

    const initialCopyValues: MyCopyFormValues = { 
        newSelectionHeroBlurb: '',
        newSelectionCarouselBlurb: ''
    }

    const handleDeleteImg = (i: number) => {
  
        let updatedUrls = categories[cat].pics.selectionCarousel.filter((url: string, j: number) => j !== i)
      
        const newPicsObj = {
            ...categories[cat].pics,
            selectionCarousel: updatedUrls
        }

        const newCatObj = {
            ...categories[cat],
            pics: newPicsObj
        }

        let newCategories
        
        if (cat === 'cat1') {
            newCategories = {
                ...categories,
                cat1: newCatObj
            }
        } else if (cat === 'cat2') {
            newCategories = {
                ...categories,
                cat2: newCatObj
            }
        } else {
            newCategories = {
                ...categories,
                cat3: newCatObj
            }
        }

        changeCategories({...newCategories})

    }


    const existingUrls = categories[cat].pics.selectionCarousel.map((link:string, i: number) => (
        <div className='relative mr-4 mb-4' key={i}>
            <button type="button" onClick={() => handleDeleteImg(i)} className='absolute top-2 right-2 text-red-600 hover:text-red-800'>
                <DeleteForeverIcon />
            </button>
            <img src={link} className='w-[150px] h-[150px] object-cover'/>
        </div>
    ))

    
    return (
        <div className='w-full bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <p className='text-xl font-semibold mb-4'>Edit {categories[cat].type} Selection Carousel <span className='text-[#616161]'>(Image size: w-[500px] h-[550px])</span></p>

            <div className='flex flex-wrap'>
                {existingUrls} 
            </div>
        
            {/* Add images to gallery */}
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    if (values.newImgUrl === '') {
                        alert('no new img url provided')
                        actions.setSubmitting(false)
                    } else {
                        const newPicsArr = [...categories[cat].pics.selectionCarousel, values.newImgUrl]

                        const newPicsObj = {
                            ...categories[cat].pics,
                            selectionCarousel: newPicsArr
                        }

                        const newCatObj = {
                            ...categories[cat],
                            pics: newPicsObj
                        }

                        let newCategories
            
                        if (cat === 'cat1') {
                            newCategories = {
                                ...categories,
                                cat1: newCatObj
                            }
                        } else if (cat === 'cat2') {
                            newCategories = {
                                ...categories,
                                cat2: newCatObj
                            }
                        } else {
                            newCategories = {
                                ...categories,
                                cat3: newCatObj
                            }
                        }

                        changeCategories({...newCategories})
                        values.newImgUrl = ''
                        actions.setSubmitting(false)
                    }
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full border-b border-black pb-8 mt-4 flex justify-between'>
                        <div className='w-3/4 mr-4 flex flex-col'>
                            <label htmlFor="newImgUrl" >New Image Url</label>
                            <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newImgUrl" name="newImgUrl" placeholder="https://..." />
                        </div>
         
                        <button 
                            className='w-1/5 self-end bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                            type="submit"
                        >
                            Add to Gallery
                        </button>
                    </div>
                </Form>
            </Formik>

            <Formik
                initialValues={initialUrlValues}
                onSubmit={(values, actions) => {

                    const newSelectionHeroUrl = values.newSelectionHeroUrl !== '' ? values.newSelectionHeroUrl : categories[cat].pics.selectionHero  
                    const newSelectionBGUrl = values.newSelectionBGUrl !== '' ? values.newSelectionBGUrl : categories[cat].pics.selectionBG

                    const newUrlsObj = {
                        ...categories[cat].pics,
                        selectionHero: newSelectionHeroUrl,
                        selectionBG: newSelectionBGUrl
                    }

                    const newCatObj = {
                        ...categories[cat],
                        pics: newUrlsObj
                    }

                    let newCategories
        
                    if (cat === 'cat1') {
                        newCategories = {
                            ...categories,
                            cat1: newCatObj
                        }
                    } else if (cat === 'cat2') {
                        newCategories = {
                            ...categories,
                            cat2: newCatObj
                        }
                    } else {
                        newCategories = {
                            ...categories,
                            cat3: newCatObj
                        }
                    }

                    changeCategories({...newCategories})
                    values.newSelectionHeroUrl = ''
                    values.newSelectionBGUrl = ''
                    actions.setSubmitting(false)
                    
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full border-b border-black pb-8 mt-4 flex justify-between'>
                        <div className='w-1/3 mr-4 flex flex-col'>
                            <label htmlFor="newSelectionHeroUrl">New {categories[cat].type} Hero Character Url</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newSelectionHeroUrl" name="newSelectionHeroUrl" placeholder="https://..." />
                        </div>

                        <div className='w-1/3 mr-4 flex flex-col'>
                            <label htmlFor="newSelectionBGUrl">New {categories[cat].type} Hero Background Url</label>
                            <Field className='border border-[#282828] p-2 rounded-lg' id="newSelectionBGUrl" name="newSelectionBGUrl" placeholder="https://..." />
                        </div>
         
                        <button 
                            className='w-1/5 self-end bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                            type="submit"
                        >
                            Update Image Urls
                        </button>
                    </div>
                </Form>
            </Formik>

            <Formik
                initialValues={initialCopyValues}
                onSubmit={(values, actions) => {

                    const newSelectionHeroBlurb = values.newSelectionHeroBlurb !== '' ? values.newSelectionHeroBlurb : categories[cat].copy.selectionHeroBlurb
                    const newSelectionCarouselBlurb = values.newSelectionCarouselBlurb !== '' ? values.newSelectionCarouselBlurb : categories[cat].copy.selectionCarouselBlurb

                    const newHomeBlurbObj = {
                        ...categories[cat].copy,
                        selectionHeroBlurb: newSelectionHeroBlurb,
                        selectionCarouselBlurb: newSelectionCarouselBlurb
                    }

                    const newCatObj = {
                        ...categories[cat],
                        copy: newHomeBlurbObj
                    }

                    let newCategories
        
                    if (cat === 'cat1') {
                        newCategories = {
                            ...categories,
                            cat1: newCatObj
                        }
                    } else if (cat === 'cat2') {
                        newCategories = {
                            ...categories,
                            cat2: newCatObj
                        }
                    } else {
                        newCategories = {
                            ...categories,
                            cat3: newCatObj
                        }
                    }

                    changeCategories({...newCategories})
                    values.newSelectionHeroBlurb = ''
                    values.newSelectionCarouselBlurb = ''
                    actions.setSubmitting(false)
                    
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full mt-4 flex justify-between items-center'>
                        <div className='w-3/4 mr-4 flex flex-col'>
                            <label htmlFor="newSelectionHeroBlurb" className='mr-4'>New {categories[cat].type} Selection Hero Blurb</label>
                            <Field
                                as="textarea"
                                rows="6"
                                cols="60"  
                                className="text-md w-full text-black mt-2 border border-[#282828] p-2 rounded-lg" 
                                id="newSelectionHeroBlurb" 
                                name="newSelectionHeroBlurb" 
                                placeholder='Start typing...'
                            />
                        </div>

                        <div className='w-3/4 mr-4 flex flex-col'>
                            <label htmlFor="newSelectionCarouselBlurb" className='mr-4'>New {categories[cat].type} Selection Carousel Blurb</label>
                            <Field
                                as="textarea"
                                rows="6"
                                cols="60"  
                                className="text-md w-full text-black mt-2 border border-[#282828] p-2 rounded-lg" 
                                id="newSelectionCarouselBlurb" 
                                name="newSelectionCarouselBlurb" 
                                placeholder='Start typing...'
                            />
                        </div>
         
                        <button 
                            className='w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'
                            type="submit"
                        >
                            Update Blurbs
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}