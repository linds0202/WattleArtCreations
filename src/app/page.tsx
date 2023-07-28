'use client' 

import "./globals.css";
import { useState } from "react";
import { useAuth } from "./firebase/auth";
import Home from "./landingPageComponents/Home"
import PortraitSelection from "./landingPageComponents/PortraitSelection"


export default function Personal() {
    const { isLoading } = useAuth();
    const [mode, setMode] = useState('Home')
  
    return ((isLoading) ? 
    <></>
    :
        <main className="bg-white text-black no-underline min-h-screen">
            {mode === 'Home' 
                ? <Home setMode={setMode} mode={mode} />
                : <PortraitSelection mode={mode} setMode={setMode}/>
            }
        </main>
    )
}

