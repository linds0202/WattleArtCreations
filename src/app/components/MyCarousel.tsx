import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

function MyCarousel() {
    return (
        <Carousel
            infiniteLoop
            autoPlay
            className="m-0"
        >
            <div >
                <img  src="/featured_8.png" alt='carousel image'/>
            </div>
            <div>
                <img  src="/featured_9.png" alt='carousel image'/>
            </div>
            <div>
                <img  src="/featured_10.png" alt='carousel image'/>
            </div>
            <div>
                <img  src="/featured_11.png" alt='carousel image'/>
            </div>
            <div>
                <img  src="/featured_12.png" alt='carousel image'/>
            </div>
            <div>
                <img  src="/featured_13.png" alt='carousel image'/>
            </div>
        </Carousel>
    )
}

export default MyCarousel