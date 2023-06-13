'use client' 

import { useState } from "react";
import Home from "./components/Home";
import PortraitCustomizer from "./components/PortraitCustomizer";

export default function Personal() {

 const [mode, setMode] = useState('Home')
  
  return (
    <main className="bg-white text-black no-underline min-h-screen">
      {mode === 'Home' 
        ? <Home setMode={setMode} />
        : <PortraitCustomizer mode={mode} setMode={setMode} />
      }
    </main>
  )
}

