'use client' 

import '../globals.css'
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CorpHome from "./components/CorpHome"
import CorpSelection from "./components/CorpSelection";

export default function Corporate() {
  const searchParams = useSearchParams()
  const selection = searchParams.get('selection')
  const [mode, setMode] = useState('CorpHome')

  return (
    <main className="bg-white text-black no-underline min-h-screen">
      {mode === 'CorpHome' 
        ? <CorpHome setMode={setMode} mode={mode} />
        : <CorpSelection mode={mode} setMode={setMode}/>
      }
    </main>
  )
}

