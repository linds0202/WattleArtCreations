import { useState } from "react"
import HeroLoader from "./HeroLoader"
import HIW from "./HIW"
import CategoryContainer from "./categories/CategoryContainer"
import Gallery from "./Gallery"
import ActionCall from "./ActionCall"
import Testimonials from "./Testimonials"
import Footer from "@/app/components/Footer"

export default function Home ({ setMode }) {
    
    const [loading, setLoading] = useState(true);
    
    const testimonials = [
    {
        index: 0,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Joe'
    },
    {
        index: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Alex'
    },
    {
        index: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        author: 'Christie'
    },
    {
        index: 3
    }
  ]
    
    return (
        <>
            <HeroLoader setLoading={setLoading}/>
            <HIW />
            <CategoryContainer setMode={setMode} />
            <Gallery />
            <ActionCall />
            <Testimonials obj={testimonials} />
            <Footer />
        </>
    )
}