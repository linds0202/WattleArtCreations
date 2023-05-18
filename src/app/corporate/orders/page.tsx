'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import IconCard from "../components/iconCard"

export default function Orders() {
    
    const searchParams = useSearchParams()
    const productChoice = searchParams.get('productChoice')
    console.log('product choice is: ', productChoice)

    return (
        <main className="flex flex-col items-center bg-black text-white no-underline min-h-screen">
            <IconCard productChoice={productChoice}/>
            <div className="w-4/12 border-2 border-white rounded-lg p-2 text-center">
                <Link href='/corporate' >Back to Coporate Homepage</Link>
            </div>
            
        </main>
    )
}