import { Categories } from '@/app/context/CategoriesContext'
import {
Formik,
Form,
Field,
} from 'formik'
import { EditProps } from './EditHero';

interface MyFormValues {
    reward1: string,
    reward2: string,
    reward3: string,
    reward4: string,
    reward5: string,
}

export const EditRewards = ({ categories, changeCategories }: EditProps) => {
    
    const initialValues: MyFormValues = { 
        reward1: categories.customizer.rewardsDiscounts[0],   
        reward2: categories.customizer.rewardsDiscounts[1],   
        reward3: categories.customizer.rewardsDiscounts[2],   
        reward4: categories.customizer.rewardsDiscounts[3],   
        reward5: categories.customizer.rewardsDiscounts[4],   
    }
    
    return (
        <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions ) => {
                    
                    if (values.reward1 === ''
                        && values.reward2 === ''
                        && values.reward3 === ''
                        && values.reward4 === ''
                        && values.reward5 === ''
                    ) {
                        actions.setSubmitting(false)
                    } else {
                        const level1 = values.reward1 !== '' ? Number(values.reward1) : categories.customizer.rewardsDiscounts[0]
                        const level2 = values.reward2 !== '' ? Number(values.reward2) : categories.customizer.rewardsDiscounts[1]
                        const level3 = values.reward3 !== '' ? Number(values.reward3) : categories.customizer.rewardsDiscounts[2]
                        const level4 = values.reward4 !== '' ? Number(values.reward4) : categories.customizer.rewardsDiscounts[3]
                        const level5 = values.reward5 !== '' ? Number(values.reward5) : categories.customizer.rewardsDiscounts[4]
                        const newRewards: Array<string> = [level1, level2, level3, level4, level5]

                        const newCustomizerObj = {
                            ...categories.customizer,
                            rewardsDiscounts: newRewards
                        }

                        let newCategories = {
                            ...categories,
                            customizer: newCustomizerObj
                        }

                        console.log('newCategories: ', newCategories)
        
                        changeCategories({...newCategories})
                      
                        actions.setSubmitting(false)
                        actions.resetForm()
                    } 
                }}
            >
                <Form className='w-full'>
                   {/* Rewards Discounts */}
                    <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-8 rounded-lg flex flex-col items-center'>
                        <p className='text-center text-3xl font-bold'>Rewards Discounts</p>                        

                        <div className='w-full mt-4 px-8 flex flex-col justify-between items-center'>
                            <p className=''>Current percentages are shown. Enter percentage as decimal ex: 5% = 0.05</p>
                            <div className='w-full mt-4 flex justify-between'>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="reward1" className='mb-1'>Level 1 (1 portrait)</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="reward1" 
                                        name="reward1" 
                                        placeholder={`${categories.customizer.rewardsDiscounts[0]}`}
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="reward2" className='mb-1'>Level 2 (3 portraits)</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="reward2" 
                                        name="reward2" 
                                        placeholder={`${categories.customizer.rewardsDiscounts[1]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="reward3" className='mb-1'>Level 3 (5 portraits)</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="reward3" 
                                        name="reward3" 
                                        placeholder={`${categories.customizer.rewardsDiscounts[2]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="reward4" className='mb-1'>Level 4 (7 portraits)</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="reward4" 
                                        name="reward4" 
                                        placeholder={`${categories.customizer.rewardsDiscounts[3]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="reward5" className='mb-1'>Level 5 (10 portraits)</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="reward5" 
                                        name="reward5" 
                                        placeholder={`${categories.customizer.rewardsDiscounts[4]}`} 
                                    />
                                </div>
                            </div>  
                        </div> 

                        <button 
                        className='w-1/5 mt-8 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out' 
                            type="submit"
                        >
                            Update Reward Discounts
                        </button> 
                    </div>

                    
                </Form>
            </Formik>
    )
}