import {
    Formik,
    Form,
    Field,
  } from 'formik'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { TestimonialType } from '@/app/context/CategoriesContext';
 
interface MyFormValues {
    searchTerm: string,
    searchBy: string
}

export default function SearchTestimonials({ setFilteredTestimonials, allTestimonials }: { setFilteredTestimonials: Function, allTestimonials: Array<TestimonialType> }) {

    const initialValues: MyFormValues = { 
        searchTerm: '', 
        searchBy: 'category' 
    }

    return (
        <div className="w-1/2">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    const searchType = values.searchBy
                    if (searchType === 'category') {
                        const filtered: Array<TestimonialType> = allTestimonials.filter(testimonial => {
                            if (testimonial.category.toLowerCase().includes(values.searchTerm.toLowerCase())) return testimonial
                        })
                        setFilteredTestimonials(filtered)
                    } else if (searchType === 'stars') {
                        const filtered = allTestimonials.filter(testimonial => {
                            if (testimonial.stars === Number(values.searchTerm)) return testimonial
                        })
                        setFilteredTestimonials(filtered)
                    }         
                
                    actions.setSubmitting(false);
                    values.searchTerm = ''
                }}
            >{({ handleChange, values }) => (
                <Form>
                    <div className='w-full flex flex-col'>
                        <div className='w-[100%] flex'>
                            {values.searchBy !== 'stars' && <Field 
                                id="searchTerm" 
                                name="searchTerm" 
                                placeholder="searchTerm" 
                                className='w-full px-4 py-2 border border-[#e9e9e9] rounded-lg' 
                            />}

                            {values.searchBy === 'stars' && 
                            <TextField
                                type="number"
                                name="searchStars"
                                onChange={handleChange}
                                size="small"
                                inputProps={{
                                min: 1,
                                max: 5,
                                defaultValue: 1,
                                style: {
                                    textAlign: "center",
                                    color: "black",
                                    fontSize: 18,
                                    width: '40px',
                                    marginLeft: '5px',
                                    marginRight: '5px'
                                }
                                }}
                            />}
                                 
                            <button type="submit" className='ml-4 p-2 border border-[#e9e9e9] rounded-lg hover:bg-[#43b4e4] text-gray-500 hover:text-white'>
                                <SearchIcon className="h-[24px] w-[24px] " />
                            </button>
                        </div>

                        <div className='w-7/12 mt-2 flex justify-between'>
                            <div>
                                <Field type="radio" name="searchBy" value="category" className="mr-2"/>
                                <label>Category</label>
                            </div>
                            
                            <div>
                                <Field type="radio" name="searchBy" value="stars" className="mr-2"/>
                                <label>Star Rating</label>
                            </div>                            
                        </div>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    );
}