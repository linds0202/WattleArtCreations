import { useState } from "react"
import { useCategoriesContext } from "@/app/context/CategoriesContext"
import { Formik, Form, Field } from 'formik'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import Slider from '@mui/material/Slider'
import { PortraitData } from '../../components/PortraitCustomizer'
import { updatePortrait } from '@/app/firebase/firestore'

interface CreateCheckoutProps {
    openCreateCheckout: boolean,
    setOpenCreateCheckout: Function,
    portrait: PortraitData,
    setPortrait: Function,
}

const CreateCheckout = ({ openCreateCheckout, setOpenCreateCheckout, portrait, setPortrait }: CreateCheckoutProps) => {
    const { categories } = useCategoriesContext()

    const [initialExtrasValues, setInitialExtrasValues] = useState({
        complexity: 1,
        extras: []
    })

    const handleComplete = (values: any) => {
        // Math.round((portrait.price.total * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100
        const newAddOns = []
        if (values.complexity !== 1) {
            newAddOns.push({
                type: `complexity_level_${values.complexity}`,
                price: (Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100)
            })
        }

        for (const extra of values.extras) {
            if (extra === 'model') {
                newAddOns.push({
                    type: extra,
                    price: categories.customizer.pricing.model
                })
            } else if (extra === 'character') {
                newAddOns.push({
                    type: extra,
                    price: categories.customizer.pricing.character
                })
            } else {
                newAddOns.push({
                    type: extra,
                    price: categories.customizer.pricing.weapons
                })
            }  
        }

        const  newPortrait = {
            ...portrait,
            addOns: newAddOns
        }

        updatePortrait(newPortrait?.id, newPortrait)

        setPortrait(newPortrait)   
        
        setOpenCreateCheckout(false)
    }

    const handleCancel = () => {
        setOpenCreateCheckout(false)
    }

    return (
    <Dialog 
        onClose={() => setOpenCreateCheckout(false)} 
        open={openCreateCheckout} 
        fullWidth={true}
        maxWidth='sm'
        PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
    >   
        <div className='absolute top-2 right-2 w-1/12 mb-4'>
            <IconButton onClick={() => setOpenCreateCheckout(false)} className='text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
        </div>

        <Formik
            initialValues={initialExtrasValues}
            onSubmit={handleComplete}
            >
            {({ handleChange, values }) => (
            <Form className="w-full flex flex-col justify-around items-center">
            
                <h2 className='text-2xl md:text-2xl font-bold'>Create Extras Payment Link</h2>
                <div className='w-11/12 text-center'>
                    <p className='text-xl font-semibold mb-2'>Your customer has requested an additional 3D Model, Character sheet, Weapons sheet, or higher level of complexity.</p>
                    <p>Please discuss via chat what this request will include. Once agreement has been reached, create a payment link with the appropriate selections.</p>
                </div>
                
                <div className='w-full flex flex-col my-4'>
                    {/* Complexity Slider */}
                    <div className="relative w-11/12 mb-4">
                        <label>
                            <p className='text-lg font-semibold'>Complexity <span className="text-sm text-gray-500">(Default of level 1 is included in the price of the portrait. Select a level greater than 1 to add this feature)</span></p>
                        </label>
                        
                        <div className="mt-4">
                            <p className="absolute -bottom-1 -left-4">Simple</p>
                            <p className="absolute -bottom-1 -right-6">Complex</p>
                            <div className=' h-8 flex justify-between items-end mb-4'>
                                <Slider
                                    name="complexity"
                                    min={1}
                                    max={5}
                                    step={1}
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    marks
                                    value={values.complexity}
                                    onChange={handleChange}
                                />             
                            </div>    
                        </div>
                        
                    </div>
                    
                    <div className="mt-4 flex justify-between">     
                        <div className="w-1/3">
                            <label className="w-full"> 
                                <Field type="checkbox" name="extras" value="model" className='mr-2'/>
                                <span className='ml-2'>3D Model</span>
                            </label>
                        </div>
                    
                        <div className="w-1/3">
                            <label className="w-full">            
                                <Field type="checkbox" name="extras" value="character" className='mr-2'/>
                                <span className='ml-2'>Character Sheet</span>
                            </label>
                        </div>
                    
                        <div className="w-1/3">
                            <label className="w-full">   
                                <Field type="checkbox" name="extras" value="weapons" className='mr-2'/>
                                <span className='ml-2'>Weapons Sheet</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-[#e9e9e9] rounded-xl p-4">
                    <table className="w-full ">
                        <thead>
                            <tr className="text-center p-2">
                                <th className="w-1/3">Type</th>
                                <th className="w-1/3">Customer Price</th>
                                <th className="w-1/3">Artist Commission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.extras.length === 0 && values.complexity - 1 === 0 &&
                            <tr>
                                <td className="bg-white">&nbsp;</td>
                                <td className="bg-white">&nbsp;</td>
                                <td className="bg-white">&nbsp;</td>
                            </tr>
                            }
                            {values.complexity - 1 !== 0 && <tr className="text-center p-2 bg-white">
                                <td>Complexity</td>
                                <td>${(Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100).toFixed(2)}</td>
                                <td>${(Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1] * categories.customizer.pricing.commissionPercentage) * 100) / 100).toFixed(2)}</td>
                            </tr>}
                        
                            {values.extras.map((extra, i) => 
                                <tr key={i} className="text-center bg-white">
                                    <td>{extra === 'model' ? '3D Model' : extra === 'character' ? 'Character Sheet' : 'Weapons Sheet'}</td>
                                    <td>${categories.customizer.pricing[extra].toFixed(2)}</td>
                                    {extra !== 'model' && <td>${(categories.customizer.pricing[extra] * categories.customizer.pricing.commissionPercentage).toFixed(2)}</td>}
                                    {extra === 'model' && <td>$0</td>}
                                </tr>
                            )}

                            <tr className="text-center p-2">
                                <td className="font-semibold">Total: </td>
                                <td 
                                    className="bg-white"
                                >
                                    ${((Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100) 
                                    + values.extras.reduce((sum, n) => sum += categories.customizer.pricing[n], 0))
                                    .toFixed(2)}
                                </td>
                                
                                <td className="bg-white">
                                    ${((Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * categories.customizer.pricing.commissionPercentage * 100) / 100) 
                                    + values.extras.reduce((sum, n) => sum += n !== 'model' ? (categories.customizer.pricing[n] * categories.customizer.pricing.commissionPercentage) : 0, 0))
                                    .toFixed(2)}
                                </td>
                            </tr>

                            {/* {filteredModels.length === 0 ? 
                                <tr>
                                <td>No 3D Model orders to display</td>
                                </tr>
                            :  filteredModels?.map(model => (
                                <Model key={model.uid} model={model} user={user} />
                            )) } */}
                        </tbody>
                    </table>
                    
                    
                    {/* <div className="flex justify-between">
                        <p>Complexity</p>
                        <p>${(Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100).toFixed(2)}</p>
                    </div> */}

                    
                    {/* {values.extras.map((extra, i) => 
                        <div key={i} className="mt-4 flex justify-between">
                            <p>{extra === 'model' ? '3D Model' : extra === 'character' ? 'Character Sheet' : 'Weapons Sheet'}</p>
                            <p>${categories.customizer.pricing[extra].toFixed(2)}</p>
                            {extra !== 'model' && <span>(${categories.customizer.pricing[extra].toFixed(2)})</span>}
                        </div>
                    )} */}
                    
                    {/* border-t border-[#282828]  */}
                    {/* <div className="w-full mt-4 flex justify-end">
                        <div className="w-1/3 bg-white rounded-xl p-2 border border-[#282828] mt-4 flex justify-between">
                            <p className="font-semibold">Total: </p>
                            <p>${((Math.round(((portrait.price.total - portrait.price.modelsTotal) * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100) + values.extras.reduce((sum, n) => sum += categories.customizer.pricing[n], 0)).toFixed(2)}</p>
                        </div>
                        
                    </div> */}
                </div>

            <div className='w-full mx-auto mt-4 flex flex-col md:flex-row justify-around items-center'>
                <button 
                    onClick={handleCancel} 
                    className='w-full md:w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'
                >
                    Cancel
                </button>
                
                <button 
                    type="submit" 
                    className='w-full md:w-5/12 order-first md:order-last text-xl mb-4 md:mb-0 text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'
                >
                    Create Link
                </button>
            </div>   
        </Form>
            )}
        </Formik>
    </Dialog>
    )
}

export default CreateCheckout