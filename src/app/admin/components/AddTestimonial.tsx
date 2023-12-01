import {
    Formik,
    Form,
    Field,
} from 'formik'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useCategoriesContext } from '@/app/context/CategoriesContext';
import { addTestimonial } from '@/app/firebase/firestore';

interface AddTestimonialProps {
    openAddTestimonial: boolean,
    setOpenAddTestimonial: Function
}

interface MyFormValues {
    newCategory: string,
    newStars: number,
    newIncludeImg: boolean,
    newImgUrl: string,
    newTestimonialText: string,
    newCustomerName: string,
    newCustomerId: string,
    newArtistId: string,
    newFeaturedHome: boolean,
    newFeatured: boolean
  }

const AddTestimonial = ({ openAddTestimonial, setOpenAddTestimonial }: AddTestimonialProps) => {
    const {categories, changeCategories} = useCategoriesContext()
    

    const initialValues: MyFormValues = { 
        newCategory: '',
        newStars: 1,
        newIncludeImg: false,
        newImgUrl: '',
        newTestimonialText: '',
        newCustomerName: '',
        newCustomerId: '',
        newArtistId: '',
        newFeaturedHome: false,
        newFeatured: false
    }
    
    return (
        <Dialog 
        onClose={() => setOpenAddTestimonial(false)} 
        open={openAddTestimonial} 
        fullWidth={true}
        maxWidth='lg'
        PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
    >   
        <div className="flex justify-center items-center">
            
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenAddTestimonial(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {

                    if (values.newIncludeImg && values.newImgUrl === '') {
                        alert('You must enter an image Url or deselect "Include image in review"')
                        return
                    }
                    const newCategory = categories[values.newCategory].type
                    
                    const newTestimonial = {
                        category: newCategory,
                        stars: values.newStars,
                        includeImg: values.newIncludeImg,
                        imgUrl: values.newImgUrl,
                        artistId: values.newArtistId,
                        customerDisplayName: values.newCustomerName,
                        customerId: values.newCustomerId,
                        featured: values.newFeatured,
                        featuredHome: values.newFeaturedHome,
                        portraitId: '',
                        text: values.newTestimonialText
                    }

                    if (values.newFeatured || values.newFeaturedHome) {
    
                        const newHomeObj = {
                            ...categories.home,
                            testimonials: [...categories.home.testimonials, newTestimonial]
                        }
    
                        const newCategories = {
                            ...categories,
                            home: newHomeObj
                        }
    
                        changeCategories({...newCategories})
                    }
                    addTestimonial(newTestimonial)

                    actions.setSubmitting(false)
                    setOpenAddTestimonial(false)
                }}
            >
                {({ values }) => (
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full mt-4 flex justify-between items-center'>
                        <div className='w-1/3'>
                            
                            <div className='border border-[#282828] rounded-lg p-2'>
                                <img src={values.newImgUrl !== '' ? values.newImgUrl : categories.customizer.defaults.noImg} />
                            </div>
                            <div className='mt-4'>
                                <label>
                                    <Field type="checkbox" name="newIncludeImg" className='mr-2'/> 
                                    Include Image with Review?
                                    
                                </label>

                                <div className='mt-2 flex flex-col'>
                                    <label htmlFor="newImgUrl" className=''>Image Url</label>
                                    <Field className='border border-[#282828] p-2 rounded-lg' id="newImgUrl" name="newImgUrl" placeholder="https://..." />
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className='w-2/3 p-8 flex flex-col'>
                            <div className='flex'>
                                <div className='w-1/2 mr-4 flex flex-col'>
                                    <label htmlFor="newCategory" className=''>Select Category</label>
                                    <Field as="select" name="newCategory" className='w-3/4 p-2 rounded-lg border border-[#282828]'>
                                        <option value="cat1">{categories.cat1.type}</option>
                                        <option value="cat2">{categories.cat2.type}</option>
                                        <option value="cat3">{categories.cat3.type}</option>
                                    </Field>
                                </div>

                                <div className='w-1/3 mr-4 flex flex-col'>
                                    <label htmlFor="newStars" className=''>Select Star Rating</label>
                                    <Field as="select" name="newStars" className='w-1/4 p-2 rounded-lg border border-[#282828]'>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Field>
                                </div>
                            </div>


                            <div className='mt-4 flex flex-col'>
                                <label htmlFor="newTestimonialText" className='mr-4'></label>
                                <Field
                                    as="textarea"
                                    rows="6"
                                    cols="60"  
                                    className="text-md w-full text-black mt-2 border border-[#282828] p-2 rounded-lg" 
                                    id="newTestimonialText" 
                                    name="newTestimonialText" 
                                    placeholder={'Testimonial Text ...'} 
                                />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <label htmlFor="newCustomerName" className='mr-4'></label>
                                <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newCustomerName" name="newCustomerName" placeholder="Customer Name" />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <label htmlFor="newCustomerId" className='mr-4'></label>
                                <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newCustomerId" name="newCustomerId" placeholder="Customer Id" />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <label htmlFor="newArtistId" className='mr-4'></label>
                                <Field className='w-3/4 border border-[#282828] p-2 rounded-lg' id="newArtistId" name="newArtistId" placeholder="Artist Id" />
                            </div>
                            <div className='mt-4 flex flex-wrap'>
                                <p className='w-full'>Where to feature this testimonial?</p>
                                <label >
                                    <Field type="checkbox" name="newFeaturedHome" className='mr-2'/>
                                    Home page
                                </label>
                                
                                <label className='ml-4'>
                                    <Field type="checkbox" name="newFeatured" className='mr-2'/>
                                    Category page 
                                </label>
                            </div>
                        </div>    
                    </div>

                    <button 
                        className='w-1/5 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out'  
                        type="submit"
                    >
                        Add Testimonial
                    </button>
                </Form>)}
            </Formik>

        </div>
        
        </Dialog>
        );
    }
    
    export default AddTestimonial
            
            {/* <img src={testimonial.imgUrl} className="w-1/3 h-auto object-cover border border-red-600"/>
            <div className="w-2/3 ml-10 flex flex-col justify-around items-center">
                <p className="text-2xl font-bold text-center">{testimonial.category}</p>
                <div className='w-1/4 mx-auto mt-2 flex justify-around items-center'>
                    <Rating 
                        name="read-only" 
                        value={testimonial.stars} 
                        readOnly 
                        precision={0.5} 
                        emptyIcon={<StarBorderOutlinedIcon style={{ color: '#E5E5E5' }} fontSize="inherit" />}
                    />
                    <span>({testimonial.stars})</span>
                </div>
                <div className='w-10/12 mt-4'>
                    <p className='text-lg'>{testimonial.text}</p>
                    <p className='text-xl text-right font-bold'>~ {testimonial.customerDisplayName}</p>
                </div>
                
                
            </div> */}
  