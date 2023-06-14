'use client' 

import { useState } from "react";
import Home from "./components/Home";
import PortraitSelection from "./components/PortraitSelection";

export default function Personal() {

 const [mode, setMode] = useState('Home')
  
  return (
    <main className="bg-white text-black no-underline min-h-screen">
      {mode === 'Home' 
        ? <Home setMode={setMode} />
        : <PortraitSelection mode={mode} setMode={setMode}/>
      }
    </main>
  )
}

