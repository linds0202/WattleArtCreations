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
    Headshot: string,
    Half: string,
    Full: string,
    charVariations: string,
    weaponSimple: string,
    weaponComplex: string,
    armourComplex: string,
    wings: string,
    petSmall: string,
    petLarge: string,
    petMonster: string,
    bgSimple: string,
    bgComplex: string,
}

export const PricingForm = ({ cat, categories, changeCategories }: PricingFormProps) => {
    
    const initialValues: MyFormValues = { 
        Headshot: categories[cat].prices.Headshot,
        Half: categories[cat].prices.Half,
        Full: categories[cat].prices.Full,
        charVariations: categories[cat].prices.charVariations,    
        weaponSimple: categories[cat].prices.weaponSimple,
        weaponComplex: categories[cat].prices.weaponComplex,
        wings: categories[cat].prices.wings,
        armourComplex: categories[cat].prices.armourComplex,
        petSmall: categories[cat].prices.petSmall,
        petLarge: categories[cat].prices.petLarge,
        petMonster: categories[cat].prices.petMonster,
        bgSimple: categories[cat].prices.bgSimple,
        bgComplex: categories[cat].prices.bgComplex,
    }
    
    return (
        <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions ) => {
                    
                    if (values.Headshot === '' 
                        && values.Half === '' 
                        && values.Full === '' 
                        && values.charVariations === ''
                        && values.weaponSimple === '' 
                        && values.weaponComplex === '' 
                        && values.armourComplex === ''
                        && values.wings === '' 
                        && values.petSmall === ''
                        && values.petLarge === ''
                        && values.petMonster === '' 
                        && values.bgSimple === '' 
                        && values.bgComplex === ''
                    ) {
                        actions.setSubmitting(false)
                    } else {

                        const newCatPricesObj = {
                            Headshot: values.Headshot !== '' ? Number(values.Headshot) : categories[cat].prices.Headshot,
                            Half: values.Half !== '' ? Number(values.Half) : categories[cat].prices.Half,
                            Full: values.Full !== '' ? Number(values.Full) : categories[cat].prices.Full,
                            charVariations: values.charVariations !== '' ? Number(values.charVariations) : categories[cat].prices.charVariations,
                            weaponSimple: values.weaponSimple !== '' ? Number(values.weaponSimple) : categories[cat].prices.weaponSimple,
                            weaponComplex: values.weaponComplex !== '' ? Number(values.weaponComplex) : categories[cat].prices.weaponComplex,
                            armourComplex: values.armourComplex !== '' ? Number(values.armourComplex) : categories[cat].prices.armourComplex,
                            wings: values.wings !== '' ? Number(values.wings) : categories[cat].prices.wings,
                            petSmall: values.petSmall !== '' ? Number(values.petSmall) : categories[cat].prices.petSmall,
                            petLarge: values.petLarge !== '' ? Number(values.petLarge) : categories[cat].prices.petLarge,
                            petMonster: values.petMonster !== '' ? Number(values.petMonster) : categories[cat].prices.petMonster,
                            bgSimple: values.bgSimple !== '' ? Number(values.bgSimple) : categories[cat].prices.bgSimple,
                            bgComplex: values.bgComplex !== '' ? Number(values.bgComplex) : categories[cat].prices.bgComplex,
                        }

                        const newCatObj = {
                            ...categories[cat],
                            prices: newCatPricesObj
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
                        console.log({...newCategories})
                        changeCategories({...newCategories})
                      
                        actions.setSubmitting(false)
                        actions.resetForm()
                    } 
                }}
            >
                <Form className='w-full flex flex-col items-center'>
                    <div className='w-full my-4 flex flex-col'>
                        <div className='w-full flex justify-between'>
                            <div className='w-1/3 mr-4 px-8 py-4 border border-[#282828] rounded-lg'>
                                <p className='text-xl font-semibold'>Body Style</p>
                                <div className='w-full mr-4 flex flex-col'>
                                    <label htmlFor="Headshot" className='mb-1'>Headshot</label>
                                    <Field 
                                        className={`border border-[#282828] p-2 rounded-lg`} 
                                        id="Headshot" 
                                        name="Headshot" 
                                        placeholder={categories[cat].prices.Headshot} 
                                    />
                                </div>

                                <div className='w-full mr-4 flex flex-col'>
                                    <label htmlFor="Half" className='mb-1'>Half</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="Half" 
                                        name="Half" 
                                        placeholder={`${categories[cat].prices.Half}`}    
                                    />
                                </div>

                                <div className='w-full mr-4 flex flex-col'>
                                    <label htmlFor="Full" className='mb-1'>Full</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="Full" 
                                        name="Full" 
                                        placeholder={`${categories[cat].prices.Full}`} 
                                    />
                                </div>
                            </div>

                            <div className='w-2/3 px-8 py-4 border border-[#282828] rounded-lg'>
                                <p className='text-xl font-semibold'>Pets & Background</p>
                                <div className='w-full flex justify-between'>
                                    <div className='w-1/4 flex flex-col'>
                                        <label htmlFor="petSmall" className='text-sm mb-1'>Small Pet</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="petSmall" 
                                            name="petSmall" 
                                            placeholder={`${categories[cat].prices.petSmall}`} 
                                        />
                                    </div>
                                    <div className='w-1/4 flex flex-col'>
                                        <label htmlFor="petLarge" className='text-sm mb-1'>Large Pet</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="petLarge" 
                                            name="petLarge" 
                                            placeholder={`${categories[cat].prices.petLarge}`} 
                                        />
                                    </div>
                                    <div className='w-1/4 flex flex-col'>
                                        <label htmlFor="petMonster" className='text-sm mb-1'>Monster/Dragon</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="petMonster" 
                                            name="petMonster" 
                                            placeholder={`${categories[cat].prices.petMonster}`} 
                                        />
                                    </div>
                                </div>
                                
                                <div className='w-full mt-4 flex'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="bgSimple" className='mb-1'>Simple Background</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="bgSimple" 
                                            name="bgSimple" 
                                            placeholder={`${categories[cat].prices.bgSimple}`} 
                                        />
                                    </div>

                                    <div className='ml-8 flex flex-col'>
                                        <label htmlFor="bgComplex" className='mb-1'>Complex Background</label>
                                        <Field 
                                            className='border border-[#282828] p-2 rounded-lg' 
                                            id="bgComplex" 
                                            name="bgComplex" 
                                            placeholder={`${categories[cat].prices.bgComplex}`} 
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>


                        <div className='w-full mt-8 px-8 py-4 border border-[#282828] rounded-lg flex flex-col justify-between'>
                            <p className='w-[100%] text-center text-xl font-semibold'>Character extras</p>
                            <div className='flex'>
                                <div className='w-1/4 mr-4 flex flex-col'>
                                    <label htmlFor="charVariations" className='mb-1'>Character Variations</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="charVariations" 
                                        name="charVariations" 
                                        placeholder={`${categories[cat].prices.charVariations}`} 
                                    />
                                </div>
                                <div className='w-1/4 mr-4 flex flex-col'>
                                    <label htmlFor="wings" className='mb-1'>Wings</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="wings" 
                                        name="wings" 
                                        placeholder={`${categories[cat].prices.wings}`} 
                                    />
                                </div>
                                <div className='w-1/4 mr-4 flex flex-col'>
                                    <label htmlFor="weaponSimple" className='mb-1'>Simple Weapon</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="weaponSimple" 
                                        name="weaponSimple" 
                                        placeholder={`${categories[cat].prices.weaponSimple}`} 
                                    />
                                </div>

                                <div className='w-1/4 flex flex-col'>
                                    <label htmlFor="weaponComplex" className='mb-1'>Complex Weapon</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="weaponComplex" 
                                        name="weaponComplex" 
                                        placeholder={`${categories[cat].prices.weaponComplex}`} 
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