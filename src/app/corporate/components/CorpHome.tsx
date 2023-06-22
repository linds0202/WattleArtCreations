import { useState } from "react"
import CorpCategoryCard from "./CorpCategoryCard";
import Footer from "@/app/components/Footer"

export interface ModeProps {
    mode: string,
    setMode: Function
}

export default function CorpHome ({ setMode, mode }: ModeProps) {
    
    const [loading, setLoading] = useState(true);
    
    const choices = ["Optimize Digital Touchpoints", "Identity", "Marketing/Graphic Design", "Design for Print", "Video Game Assests"]

    return (
        <div>
            <div className="flex justify-around items-center h-[30vh]">
                {choices.map((choice, i) => <CorpCategoryCard key={i} setMode={setMode} mode={choice}/>)}
            </div>
            <Footer />
        </div>
    )
}