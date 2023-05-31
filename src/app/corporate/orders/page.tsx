'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Wizard from "./components/Wizard"


export default function Orders() {
    
    const searchParams = useSearchParams()
    const productChoice = searchParams.get('productChoice')
    
    const[consult, setConsult] = useState(false)
    const [openWizard, setOpenWizard] = useState(false)
    const [selection, setSelection] = useState('')


    const choices = {
        'Advertising': {
            'Graphic Design': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Social Media Kits': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Commercial Storyboarding': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Logo Design': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
        },
        'Story Or Book Illustrations': {
            'Cover Designs': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Marketing Material': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'D&D Campaign Modules': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
        },
        'Table Top Illustrations': {
            'Boardgame': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Battle maps': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Custom card decks': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            'Custom Character Sheets': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
        },
        'Video Game Assets': {
            'Pixel Art': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
            '2d Character art': ['img1.png', 'img2.png', 'img3.png', 'img4.png'],
        }
    }

    const choice = choices[productChoice]

    const selectionButtons = []

    for (const item in choice) {
        selectionButtons.push(item)
    }

    function handleClick(choice) {
        setSelection(choice)
        setOpenWizard(true)
    }
    

    return (
        <main className="h-[90vh] flex flex-col justify-around items-center bg-white text-black no-underline relative p-10">
            {!openWizard && !consult &&
            <>
                <h3 className="text-3xl text-left my-8">{productChoice}: </h3>
                <div className="w-8/12 flex justify-around items-center">
                    {selectionButtons.map((choice, i) => 
                    <div key={i}>
                        <button onClick={() => handleClick(choice)}>{choice}</button>
                    </div>
                    )}
                </div>
            </>}

            {!openWizard && consult &&
            <>
                <h3 className="text-3xl text-left my-8">Thank you for your interest!</h3>
                <p>A member of our team will contact you shortly</p>
            </>}

            {openWizard && (
                <Wizard selection={selection} category={productChoice} setOpenWizard={setOpenWizard} setConsult={setConsult}/> 
            )}
            
            {!openWizard && <div className="w-4/12 mx-auto mb-10 border-2 border-white rounded-lg p-2 text-center">
                <Link href='/corporate' >Back to Coporate Homepage</Link>
            </div>
            }
            
            
        </main>
    )
}