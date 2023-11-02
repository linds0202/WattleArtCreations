import Home2_hero from "./Home2_hero"
import Home2_hiw from "./Home2_hiw"
import Home2_testimonials from "./Home2_testimonials"
import Home2_cta from "./Home2_cta"
import Home2_gallery from "./Home2_gallery"
import Footer from "../components/Footer"

export interface ModeProps {
    mode: string,
    setMode: Function
}

export const scrollIntoTheView = (id: string) => {
    let element = document.getElementById(id) as HTMLElement;
    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};


export default function Home ({ setMode, mode }: ModeProps) {

    return (
        <div className="bg-black text-white">
            <Home2_hero />
            <Home2_hiw />
            <Home2_testimonials />
            <Home2_cta setMode={setMode} mode={mode} />
            <Home2_gallery />
            <Footer />
        </div>
       
    
    )
}