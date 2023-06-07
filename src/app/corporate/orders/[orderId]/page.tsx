'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import IconCard from "../components/iconCard"

export default function Orders() {
    
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')


    return (
        <main className="bg-black text-white no-underline min-h-screen">
            
                      
            <div className="w-4/12 mx-auto mt-10 border-2 border-white rounded-lg p-2 text-center">
                <Link href='/corporate' >Back to Coporate Homepage</Link>
            </div>
            
        </main>
    )
}