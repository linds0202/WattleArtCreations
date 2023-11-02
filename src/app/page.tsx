'use client' 

import "./globals.css";
import { useEffect, useState } from "react";
import { useAuth } from "./firebase/auth";
import { useSearchParams } from 'next/navigation';
import Home from "./landingPageComponents/Home2"
import PortraitSelection from "./landingPageComponents/PortraitSelection"


export default function Personal() {
    const { isLoading } = useAuth();
    const searchParams = useSearchParams()
    const selection = searchParams.get('selection')

    const [mode, setMode] = useState(selection !== null ? selection : 'Home')
    
    useEffect(() => {
        if (selection) {
            setMode(selection)
        } else {
            setMode('Home')
        }
        
    }, [selection])

    return ((isLoading ) ? 
    <></>
    :
        <main className="bg-white text-black no-underline min-h-screen overflow-hidden">
            {mode === 'Home' 
                ? <Home setMode={setMode} mode={mode} />
                : <PortraitSelection mode={mode} setMode={setMode}/>
            }
        </main>
    )
}

