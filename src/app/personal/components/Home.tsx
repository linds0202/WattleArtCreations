import { useState } from "react"
import Hero from "./Hero"
import HeroLoader from "./HeroLoader"
import HIW from "./HIW"
import CategoryContainer from "./categories/CategoryContainer"
import Gallery from "./Gallery"
import ActionCall from "./ActionCall"
import Testimonials from "./Testimonials"
import Footer from "@/app/components/Footer"

export default function Home ({ setMode }) {
    
    const [loading, setLoading] = useState(true);
    
    return (
        <>
            <Hero />
            {/* <HeroLoader setLoading={setLoading}/> */}
            <HIW />
            <Testimonials />
            <CategoryContainer setMode={setMode} />
            <Gallery />
            <ActionCall />
            <Footer />
        </>
    )
}