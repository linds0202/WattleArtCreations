import Home1_hero from "./Home1_hero"
import Home1_hiw from "./Home1_hiw"
import Home1_testimonials from "./Home1_testimonials"
import Home1_cta from "./Home1_cta"
import Home1_gallery from "./Home1_gallery"
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
            <Home1_hero />
            <Home1_hiw />
            <Home1_testimonials />
            <Home1_cta setMode={setMode} mode={mode} />
            <Home1_gallery />
            <Footer />
        </div>
       
    
    )
}