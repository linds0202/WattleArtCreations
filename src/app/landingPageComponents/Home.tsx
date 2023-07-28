import { useState } from "react"
import ParallaxHero from "./ParallaxHero"
import HIW from "./HIW"
import CategoryContainer from "./categories/CategoryContainer"
import Gallery from "./Gallery"
import Testimonials from "./Testimonials"
import Footer from "@/app/components/Footer"

export interface ModeProps {
    mode: string,
    setMode: Function
}

export default function Home ({ setMode, mode }: ModeProps) {
    
    const [loading, setLoading] = useState(true);
    
    return (
        <div className="flex flex-col justify-around items-center">
            <ParallaxHero />
            <HIW />
            <Testimonials />
            <CategoryContainer setMode={setMode} mode={mode}/>
            <Gallery />
            <Footer />
        </div>
    )
}