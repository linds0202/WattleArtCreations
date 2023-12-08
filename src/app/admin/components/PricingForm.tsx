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
    complexity2: string,
    complexity3: string,
    complexity4: string,
    complexity5: string,
    weaponSimple: string,
    weaponComplex: string,
    armourComplex: string,
    wings: string,
    character: string,
    model: string,
    weapons: string,
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
        complexity2: categories[cat].prices.complexity[1],   
        complexity3: categories[cat].prices.complexity[2],
        complexity4: categories[cat].prices.complexity[3],
        complexity5: categories[cat].prices.complexity[4],     
        weaponSimple: categories[cat].prices.weaponSimple,
        weaponComplex: categories[cat].prices.weaponComplex,
        wings: categories[cat].prices.wings,
        armourComplex: categories[cat].prices.armourComplex,
        character: categories[cat].prices.character,
        model: categories[cat].prices.model,
        weapons: categories[cat].prices.weapons,
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
                        && values.complexity2 === ''
                        && values.complexity3 === ''
                        && values.complexity4 === ''
                        && values.complexity5 === ''
                        && values.weaponSimple === '' 
                        && values.weaponComplex === '' 
                        && values.armourComplex === ''
                        && values.wings === '' 
                        && values.character === '' 
                        && values.model === '' 
                        && values.weapons === '' 
                        && values.petSmall === ''
                        && values.petLarge === ''
                        && values.petMonster === '' 
                        && values.bgSimple === '' 
                        && values.bgComplex === ''
                    ) {
                        actions.setSubmitting(false)
                    } else {
                        const level2 = values.complexity2 !== '' ? Number(values.complexity2) : categories[cat].prices.complexity[1]
                        const level3 = values.complexity3 !== '' ? Number(values.complexity3) : categories[cat].prices.complexity[2]
                        const level4 = values.complexity4 !== '' ? Number(values.complexity4) : categories[cat].prices.complexity[3]
                        const level5 = values.complexity5 !== '' ? Number(values.complexity5) : categories[cat].prices.complexity[4]
                        const newComplexity: Array<string> = [0, level2, level3, level4, level5]

                        const newCatPricesObj = {
                            Headshot: values.Headshot !== '' ? Number(values.Headshot) : categories[cat].prices.Headshot,
                            Half: values.Half !== '' ? Number(values.Half) : categories[cat].prices.Half,
                            Full: values.Full !== '' ? Number(values.Full) : categories[cat].prices.Full,
                            charVariations: values.charVariations !== '' ? Number(values.charVariations) : categories[cat].prices.charVariations,
                            complexity: newComplexity,
                            weaponSimple: values.weaponSimple !== '' ? Number(values.weaponSimple) : categories[cat].prices.weaponSimple,
                            weaponComplex: values.weaponComplex !== '' ? Number(values.weaponComplex) : categories[cat].prices.weaponComplex,
                            model:  values.model !== '' ? Number(values.model) : categories[cat].prices.model,
                            character: values.character !== '' ? Number(values.character) : categories[cat].prices.Full,
                            weapons: values.weapons !== '' ? Number(values.weapons) : categories[cat].prices.weapons,
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
                            
                            <div className='w-1/3 mr-4 px-8 py-4 border border-[#282828] rounded-lg'>
                                <p className='text-xl font-semibold'>Extras</p>
                                
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="model" className='mb-1'>3D Model</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="model" 
                                        name="model" 
                                        placeholder={`${categories[cat].prices.model}`} 
                                    />
                                </div>
                                
                                <div className='w-full flex flex-col'>
                                    <label htmlFor="character" className='mb-1'>Character Sheet</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="character" 
                                        name="character" 
                                        placeholder={`${categories[cat].prices.character}`} 
                                    />
                                </div>

                                <div className='w-full flex flex-col'>
                                    <label htmlFor="weapons" className='mb-1'>Weapons Sheet</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="weapons" 
                                        name="weapons" 
                                        placeholder={`${categories[cat].prices.weapons}`} 
                                    />
                                </div>
                            </div>


                            <div className='w-1/3 px-8 py-4 border border-[#282828] rounded-lg'>
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
                                

                                <div className='w-full flex flex-col'>
                                    <label htmlFor="bgSimple" className='mb-1'>Simple Background</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="bgSimple" 
                                        name="bgSimple" 
                                        placeholder={`${categories[cat].prices.bgSimple}`} 
                                    />
                                </div>

                                <div className='w-full flex flex-col'>
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

                        <div className='w-full mt-8 px-8 py-4 border border-[#282828] rounded-lg flex flex-col justify-between'>
                            <p className='w-[100%] text-center text-xl font-semibold'>Complexity</p>
                            <div className='flex'>
                                <div className='w-1/5 mr-4 flex flex-col'>
                                    <label htmlFor="complexity1" className='mb-1'>Level 1</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity1" 
                                        name="complexity1" 
                                        placeholder={`${categories[cat].prices.complexity[0]} (cannot be changed)`} 
                                        disabled
                                    />
                                </div>
                                <div className='w-1/5 mr-4 flex flex-col'>
                                    <label htmlFor="complexity2" className='mb-1'>Level 2</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity2" 
                                        name="complexity2" 
                                        placeholder={`${categories[cat].prices.complexity[1]}`} 
                                    />
                                </div>
                                <div className='w-1/5 mr-4 flex flex-col'>
                                    <label htmlFor="complexity3" className='mb-1'>Level 3</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity3" 
                                        name="complexity3" 
                                        placeholder={`${categories[cat].prices.complexity[2]}`} 
                                    />
                                </div>
                                <div className='w-1/5 mr-4 flex flex-col'>
                                    <label htmlFor="complexity4" className='mb-1'>Level 4</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity4" 
                                        name="complexity4" 
                                        placeholder={`${categories[cat].prices.complexity[3]}`} 
                                    />
                                </div>
                                <div className='w-1/5 mr-4 flex flex-col'>
                                    <label htmlFor="complexity5" className='mb-1'>Level 5</label>
                                    <Field 
                                        className='border border-[#282828] p-2 rounded-lg' 
                                        id="complexity5" 
                                        name="complexity5" 
                                        placeholder={`${categories[cat].prices.complexity[4]}`} 
                                    />
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