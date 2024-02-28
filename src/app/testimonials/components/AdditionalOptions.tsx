import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCategoriesContext } from "@/app/context/CategoriesContext"
import { Formik, Form, Field } from 'formik'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import Slider from '@mui/material/Slider'
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer"
import { getAddOnCheckoutUrl, updatePortrait } from '@/app/firebase/firestore'
import { motion } from "framer-motion";

interface CreateCheckoutProps {
    openCreateCheckout: boolean,
    setOpenCreateCheckout: Function,
    portrait: PortraitData,
    setPortrait: Function,
}

const AdditionalOptions = ({ openCreateCheckout, setOpenCreateCheckout, portrait, setPortrait }: CreateCheckoutProps) => {
    const { categories } = useCategoriesContext()

    const router = useRouter();

    const [initialExtrasValues, setInitialExtrasValues] = useState({
        complexity: 1,
        extras: []
    })

    const handleComplete = async (values: any) => {

        const newAddOns = []

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
        
        const newPortrait = {
            ...portrait,
            addOns: newAddOns
        }
        
        const updatedPortrait = await updatePortrait(newPortrait?.id, newPortrait)

        const checkoutUrl = await getAddOnCheckoutUrl(newPortrait, portrait.customerId)
        router.push(checkoutUrl) 
        
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
        maxWidth='xl'
        PaperProps={{ sx: { height: "100vh", p: 4, backgroundColor: "white"} }}
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
            <Form className="w-full h-full flex flex-col justify-around items-center">
            
                <h2 className='text-2xl md:text-2xl font-bold'>Add an Additional Option to this Portrait</h2>
                <div className='w-11/12 text-center'>
                    <p className='text-xl font-semibold mb-2'>Make your selections below.</p>
                </div>
                
                
                <div className="w-full h-3/4 my-4 flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-around items-center border border-red-600">
                    
                    <div className='self-stretch w-full md:w-1/4 md:mx-4 bg-[#282828] rounded-lg p-4 text-white flex flex-col justify-between items-center'>
                        
                        <motion.div 
                            className="w-[60%] h-[45%] md:w-[80%] md:h-[35%] xl:w-[60%] xl:h-[45%] mt-8 md:mt-0 xl:mt-8 bg-white rounded-lg"
                            initial={{ 
                                scale: 0
                            }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: .5 }}    
                        >
                            <object type="image/svg+xml" data="images/customizer/3d.svg" className="w-full h-[70%] rounded-lg pt-4"></object>
                            <p className="mt-4 text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r pb-[10px] from-[#338cb2] to-[#43b4e4]">3D Model</p>
                        </motion.div>
                        
                        <div className="w-full h-1/3 md:h-[60%] xl:h-1/3 pt-2 md:pt-4 xl:pt-2 text-center">
                            <label className="w-full"> 
                                <Field type="checkbox" name="extras" value="model" className='mr-2'/>
                                <span className='text-lg md:text-base xl:text-lg ml-2'>3D Model</span>
                            </label>
                            <p className="mt-2 mb-2 text-left md:text-sm xl:text-base">Once you have approved of your final portrait, we&apos;ll design and ship you a custom <span className="text-[#43b4e4] font-bold">3d-model</span> based off the image design!</p>
                        </div>
                    </div>

                    <div className='self-stretch w-full md:w-1/4 md:mx-4 bg-[#282828] rounded-lg p-4 text-white flex flex-col justify-between items-center'>
                        
                        <object 
                            type="image/svg+xml" 
                            data="images/customizer/character_sheet.svg" 
                            className="w-[65%] h-[65%]  md:w-[80%] md:h-[40%] xl:w-[65%] xl:h-[65%] relative -top-[45px] md:-top-8 xl:-top-[45px] rounded-lg"
                        />    
                        <div className="w-full h-1/3 md:h-[60%] xl:h-1/3 md:pt-4 xl:pt-0 text-center">
                            <label className="w-full">            
                                <Field type="checkbox" name="extras" value="character" className='mr-2'/>
                                <span className='text-lg md:text-base xl:text-lg  ml-2'>Character Sheet</span>
                            </label>
                            <p className="mt-2 mb-2 text-left md:text-sm xl:text-base">If you&apos;re planning on using this character for a <span className="text-[#43b4e4] font-bold">DnD campaign</span>, we can create a personalized character sheet to make all your friends jealous.</p>
                        </div>
                    </div>

                    <div className='self-stretch w-full md:w-1/4 md:mx-4 bg-[#282828] rounded-lg p-4 text-white flex flex-col justify-between items-center'>
                        
                        <object 
                            type="image/svg+xml" 
                            data="images/customizer/weapons_sheet.svg" 
                            className="w-[65%] h-[90%] md:w-[80%] md:h-[40%] xl:w-[65%] xl:h-[90%] relative -top-[55px] md:-top-8 xl:-top-[55px] rounded-lg"
                        />  
                        <div className="w-full h-1/3 md:h-[60%] xl:h-1/3 md:pt-4 xl:pt-0 text-center">
                            <label className="w-full">   
                                <Field type="checkbox" name="extras" value="weapons" className='mr-2'/>
                                <span className='text-lg md:text-base xl:text-lg ml-2'>Weapons Sheet</span>
                            </label>
                            <p className="mt-2 mb-2 text-left md:text-sm xl:text-base">Have a <span className="text-[#43b4e4] font-bold">special weapon</span> that deserves it&apos;s own attention? Add this option and we will design a separate weapon sheet that will display it from multiple perspectives, showcasing it in all it&apos;s glory.</p>
                        </div>
                    </div>


                    <div className="self-stretch w-1/4 bg-[#e9e9e9] rounded-xl p-4 flex flex-col">
                    
                        <div className="mb-8">
                            {values.extras.map((extra, i) => 
                                <div key={i} className="mt-4 flex justify-between">
                                    <p>{extra === 'model' ? '3D Model' : extra === 'character' ? 'Character Sheet' : 'Weapons Sheet'}</p>
                                    <p>${categories.customizer.pricing[extra].toFixed(2)}</p>
                                </div>
                            )}
                        </div>
                        
                        {/* (Math.round((portrait.price.total * categories.customizer.pricing.complexity[values.complexity - 1]) * 100) / 100) + */}
                        <div className="w-full mt-4 border-t border-[#282828] flex justify-end">
                            <div className="w-3/4 bg-white rounded-xl p-2 border border-[#282828] mt-4 flex justify-between">
                                <p className="font-semibold">Total: </p>
                                <p>${( values.extras.reduce((sum, n) => sum += categories.customizer.pricing[n], 0)).toFixed(2)}</p>
                            </div>
                            
                        </div>
                    </div>
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
                        Checkout
                    </button>

                </div>   
            </Form>
            )}
        </Formik>
    </Dialog>
    )
}

export default AdditionalOptions