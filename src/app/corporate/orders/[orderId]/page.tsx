'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import IconCard from "../components/iconCard"

export default function Orders() {
    
    const searchParams = useSearchParams()
    const productChoice = searchParams.get('productChoice')
    console.log('product choice is: ', productChoice)



    const choice = choices[productChoice]
    console.log('choice is: ', choice)
    const selectionButtons = []

    for (const item in choice) {
        selectionButtons.push(item)
    }
    

    return (
        <main className="bg-black text-white no-underline min-h-screen">
            <h3 className="text-3xl text-left my-8">{productChoice}: </h3>
            <div className="flex justify-around items-center">
                {selectionButtons.map((choice, i) => 
                <div key={i}>
                    <p>{choice}</p>
                </div>
                )}
            </div>
                      
            <div className="w-4/12 mx-auto mt-10 border-2 border-white rounded-lg p-2 text-center">
                <Link href='/corporate' >Back to Coporate Homepage</Link>
            </div>
            
        </main>
    )
}