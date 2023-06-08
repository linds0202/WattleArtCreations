import { useState } from "react"
import HeroLoader from "./HeroLoader"
import HIW from "./HIW"
import CategoryContainer from "./categories/CategoryContainer"
import Gallery from "./Gallery"
import ActionCall from "./ActionCall"
import Testimonials2 from "./Testimonials2"
import Footer from "@/app/components/Footer"

export default function Home ({ setMode }) {
    
    const [loading, setLoading] = useState(true);
    
    return (
        <>
            <HeroLoader setLoading={setLoading}/>
            <HIW />
            <Testimonials2 />
            <CategoryContainer setMode={setMode} />
            <Gallery />
            <ActionCall />
            <Footer />
        </>
    )
}