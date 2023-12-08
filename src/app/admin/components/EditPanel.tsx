import '../menu/styles.css'
import { useState } from "react"
import { UserData } from "@/app/artistDashboard/[userId]/portfolio/page";
import { useCategoriesContext } from "@/app/context/CategoriesContext";
import { EditHero } from './EditHero';
import { EditTypes } from "./EditTypes";
import { EditSplatters } from "./EditSplatters";
import { EditGallery } from "./EditGallery";
import { EditHomeCarousels } from "./EditHomeCarousels";
import { EditSelectionCarousels } from "./EditSelectionCarousels";
import { EditPricing } from './EditPricing';

interface EditPanelProps {
  user: UserData
}

export default function EditPanel({ user }: EditPanelProps) {
    const { categories, changeCategories } = useCategoriesContext()
    
    const [choice, setChoice] = useState<string>('hero')
    
    const handleEdit = (name: string) => {
        setChoice(name)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Edit Panel</h1>

            <div className="flex justify-between">
                <button
                    className={`border px-4 py-2 ${choice === 'hero' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
                    onClick={() => handleEdit('hero')}
                >
                    Hero
                </button>
                <button
                    className={`border px-4 py-2 ${choice === 'types' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
                    onClick={() => handleEdit('types')}
                >
                    Category Types
                </button>
                <button
                    className={`border px-4 py-2 ${choice === 'splatters' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
                    onClick={() => handleEdit('splatters')}
                >
                    Homepage Splatters
                </button>

                <button
                    className={`border px-4 py-2 ${choice === 'gallery' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`}  
                    onClick={() => handleEdit('gallery')}
                >
                    Homepage Gallery
                </button>

                <button
                    className={`border px-4 py-2 ${choice === 'homeCarousel' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`}  
                    onClick={() => handleEdit('homeCarousel')}
                >
                    Home Carousels
                </button>

                <button
                    className={`border px-4 py-2 ${choice === 'selectionCarousel' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
                    onClick={() => handleEdit('selectionCarousel')}
                >
                    Selection Pages
                </button>

                <button
                    className={`border px-4 py-2 ${choice === 'pricing' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
                    onClick={() => handleEdit('pricing')}
                >
                    Pricing
                </button>
            </div>
            

            <div className="w-[100%] mb-12">
                {choice === 'hero' ?
                    <EditHero categories={categories} changeCategories={changeCategories} />
                    : choice === 'types' ?
                    <EditTypes categories={categories} changeCategories={changeCategories} />
                    : choice === 'splatters' ?
                    <EditSplatters categories={categories} changeCategories={changeCategories} />
                    : choice === 'gallery' ?
                    <EditGallery categories={categories} changeCategories={changeCategories}/>
                    : choice === 'homeCarousel' ?
                    <EditHomeCarousels categories={categories} changeCategories={changeCategories}/>
                    : choice === 'selectionCarousel' ?
                    <EditSelectionCarousels categories={categories} changeCategories={changeCategories}/>
                    : choice === 'pricing' ?
                    <EditPricing categories={categories} changeCategories={changeCategories}/>
                    : <p>No selection</p>
                }
                
            </div>
        </div>
    )
}
