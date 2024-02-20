import { Categories } from '@/app/context/CategoriesContext'
import {
    Formik,
    Form,
    Field,
  } from 'formik'

interface PricingFormProps {
    cat: string,
    categories: Categories,
    changeCategories: Function
}


interface MyFormValues {
    complexity2: string,
    complexity3: string,
    complexity4: string,
    complexity5: string,
    character: string,
    model: string,
    weapons: string,
    additionalSimple: string,
    additionalIntermediate: string,
    additionalComplex: string
}

export const GeneralPricingForm = ({ cat, categories, changeCategories }: PricingFormProps) => {
    
    const initialValues: MyFormValues = { 
        complexity2: categories.customizer.pricing.complexity[1],   
        complexity3: categories.customizer.pricing.complexity[2],
        complexity4: categories.customizer.pricing.complexity[3],
        complexity5: categories.customizer.pricing.complexity[4],     
        character: categories.customizer.pricing.character,
        model: categories.customizer.pricing.model,
        weapons: categories.customizer.pricing.weapons,
        additionalSimple: categories.customizer.pricing.additionalRevision[0],   
        additionalIntermediate: categories.customizer.pricing.additionalRevision[1], 
        additionalComplex: categories.customizer.pricing.additionalRevision[2], 
    }
    
    return (
        <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions ) => {
                    
                    if (values.complexity2 === ''
                        && values.complexity3 === ''
                        && values.complexity4 === ''
                        && values.complexity5 === ''
                        && values.character === '' 
                        && values.model === '' 
                        && values.weapons === '' 
                        && values.additionalSimple === ''
                        && values.additionalIntermediate === ''
                        && values.additionalComplex === ''
                    ) {
                        actions.setSubmitting(false)
                    } else {
                        const level2 = values.complexity2 !== '' ? Number(values.complexity2) : categories.customizer.pricing.complexity[1]
                        const level3 = values.complexity3 !== '' ? Number(values.complexity3) : categories.customizer.pricing.complexity[2]
                        const level4 = values.complexity4 !== '' ? Number(values.complexity4) : categories.customizer.pricing.complexity[3]
                        const level5 = values.complexity5 !== '' ? Number(values.complexity5) : categories.customizer.pricing.complexity[4]
                        const newComplexity: Array<string> = [0, level2, level3, level4, level5]

                        const additionalS = values.additionalSimple !== '' ? Number(values.additionalSimple) : categories.customizer.pricing.additionalRevision[0]
                        const additionalI = values.additionalIntermediate !== '' ? Number(values.additionalIntermediate) : categories.customizer.pricing.additionalRevision[1]
                        const additionalC = values.additionalComplex !== '' ? Number(values.additionalComplex) : categories.customizer.pricing.additionalRevision[2]
                        const newRevisions: Array<string> = [additionalS, additionalI, additionalC]

                        const newPricing = {
                            complexity: newComplexity,
                            model:  values.model !== '' ? Number(values.model) : categories.customizer.pricing.model,
                            character: values.character !== '' ? Number(values.character) : categories.customizer.pricing.character,
                            weapons: values.weapons !== '' ? Number(values.weapons) : categories.customizer.pricing.weapons,
                            additionalRevision: newRevisions
                        }

                        const newGeneralPricingObj = {
                            ...categories.customizer,
                            pricing: newPricing
                        }

                        let newCategories = {
                            ...categories,
                            customizer: newGeneralPricingObj
                        }
        
                        changeCategories({...newCategories})
                      
                        actions.setSubmitting(false)
                        actions.resetForm()
                    } 
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full my-4 flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='w-5/12 mt-4 px-8 py-4 border border-[#282828] rounded-lg flex flex-col justify-between items-center'>
                                <p className='text-xl font-semibold'>Extras</p>
                                
                                <div className='w-full mt-4 flex flex-col justify-between'>       
                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="model" className='mb-1'>3D Model</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="model" 
                                            name="model" 
                                            placeholder={`${categories.customizer.pricing.model}`} 
                                        />
                                    </div>
                                    
                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="character" className='mb-1'>Character Sheet</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="character" 
                                            name="character" 
                                            placeholder={`${categories.customizer.pricing.character}`} 
                                        />
                                    </div>

                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="weapons" className='mb-1'>Weapons Sheet</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="weapons" 
                                            name="weapons" 
                                            placeholder={`${categories.customizer.pricing.weapons}`} 
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='w-5/12 mt-4 px-8 py-4 border border-[#282828] rounded-lg flex flex-col justify-between items-center'>
                                <p className='text-xl font-semibold'>Additional Revisions</p>
                                <p className=''>Pricing for a revision beyond included 2</p>
                                <div className='w-full mt-4 flex flex-col justify-between'> 
                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="additionalSimple" className='mb-1'>Simple</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="additionalSimple" 
                                            name="additionalSimple" 
                                            placeholder={`${categories.customizer.pricing.additionalRevision[0]}`} 
                                        />
                                    </div>
                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="additionalIntermediate" className='mb-1'>Intermdeiate</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="additionalIntermediate" 
                                            name="additionalIntermediate" 
                                            placeholder={`${categories.customizer.pricing.additionalRevision[1]}`} 
                                        />
                                    </div>
                                    <div className='w-3/4 flex flex-col'>
                                        <label htmlFor="additionalComplex" className='mb-1'>Complex</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="additionalComplex" 
                                            name="additionalComplex" 
                                            placeholder={`${categories.customizer.pricing.additionalRevision[2]}`} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div className='w-full mt-8 px-8 py-4 border border-[#282828] rounded-lg flex flex-col justify-between items-center'>
                            <p className='w-[100%] text-center text-xl font-semibold'>Complexity</p>
                            <p className=''>Level 1 is included with portrait. Enter percentage as decimal point ex: 5% = 0.05</p>
                            <div className='w-full mt-4 flex justify-between'>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="complexity1" className='mb-1'>Level 1</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity1" 
                                        name="complexity1" 
                                        placeholder={`${categories.customizer.pricing.complexity[0]} (cannot be changed)`} 
                                        disabled
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="complexity2" className='mb-1'>Level 2</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity2" 
                                        name="complexity2" 
                                        placeholder={`${categories.customizer.pricing.complexity[1]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="complexity3" className='mb-1'>Level 3</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity3" 
                                        name="complexity3" 
                                        placeholder={`${categories.customizer.pricing.complexity[2]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="complexity4" className='mb-1'>Level 4</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity4" 
                                        name="complexity4" 
                                        placeholder={`${categories.customizer.pricing.complexity[3]}`} 
                                    />
                                </div>
                                <div className='w-1/6 flex flex-col'>
                                    <label htmlFor="complexity5" className='mb-1'>Level 5</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity5" 
                                        name="complexity5" 
                                        placeholder={`${categories.customizer.pricing.complexity[4]}`} 
                                    />
                                </div>
                            </div>
                            
                        </div>

                        
                        
         
                        <button 
                            className='self-center w-1/5 mt-8 bg-black text-white font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-[#43b4e4] hover:scale-105 transition duration-200 ease-in-out' 
                            type="submit"
                        >
                            Update Prices
                        </button>
                    </div>
                </Form>
            </Formik>
    )
}