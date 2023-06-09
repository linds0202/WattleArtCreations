import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

function MyCarousel({selection}) {
    return (
        <Carousel
            infiniteLoop
            autoPlay
            className="m-0"
        >
            <div >
                <img  src="/featured_8.png" />
            </div>
            <div>
                <img  src="/featured_9.png" />
            </div>
            <div>
                <img  src="/featured_10.png" />
            </div>
            <div>
                <img  src="/featured_11.png" />
            </div>
            <div>
                <img  src="/featured_12.png" />
            </div>
            <div>
                <img  src="/featured_13.png" />
            </div>
        </Carousel>
    )
}

export default MyCarousel