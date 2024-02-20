import { motion } from "framer-motion"
import { useState } from 'react';
import { EditProps } from './EditHero';
import { PricingForm } from "./PricingForm";
import { GeneralPricingForm } from "./GeneralPricingForm";

export const EditPricing = ({ categories, changeCategories }: EditProps) => {
    const [button, setButton] = useState<string>('cat1')

    const handleShowCat = (cat: string) => {
        setButton(cat)
    }
 
    return (
        <div className='w-11/12 mx-auto bg-[#e9e9e9] my-8 p-4 rounded-lg'>
            <div className='w-11/12 mx-auto flex justify-between mb-6 px-10'>
                <motion.button 
                    className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'cat1' ? 'bg-[#43b4e4] text-white' : ''}`}
                    onClick={() => handleShowCat('cat1')} 
                    whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                    whileTap={{ scale: 1.03 }}
                >
                    {categories.cat1.type}
                </motion.button>

                <motion.button 
                    className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'cat2' ? 'bg-[#43b4e4] text-white' : ''}`}
                    onClick={() => handleShowCat('cat2')} 
                    whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                    whileTap={{ scale: 1.03 }}
                >
                    {categories.cat2.type}
                </motion.button>

                <motion.button 
                    className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'cat3' ? 'bg-[#43b4e4] text-white' : ''}`}
                    onClick={() => handleShowCat('cat3')}
                    whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                    whileTap={{ scale: 1.03 }}
                >
                    {categories.cat3.type}
                </motion.button>

                <motion.button 
                    className={`w-1/5 mx-4 border-2 border-black p-2 rounded-lg ${button === 'general' ? 'bg-[#43b4e4] text-white' : ''}`}
                    onClick={() => handleShowCat('general')}
                    whileHover={{ scale: 1.05, transition: {duration: 0.15} }} 
                    whileTap={{ scale: 1.03 }}
                >
                    General Pricing
                </motion.button>
            </div>

            <div>
                {button === 'cat1' ?
                    <PricingForm cat={button} categories={categories} changeCategories={changeCategories}/>
                    : button === 'cat2' ?
                    <PricingForm cat={button} categories={categories} changeCategories={changeCategories}/>
                    : button === 'cat3' ?
                    <PricingForm cat={button} categories={categories} changeCategories={changeCategories}/>
                    : <GeneralPricingForm cat={button} categories={categories} changeCategories={changeCategories}/>
                }
            </div>
        </div>
    )
}