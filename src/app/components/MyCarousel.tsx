import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

function MyCarousel({selection}) {
    return (
        <Carousel
            infiniteLoop
            autoPlay
            className="w-3/12 border-2 border-red-700 m-0"
        >
            <div className="border-2 border-red-700">
                <img src="/featured_8.png" />
            </div>
            <div>
                <img src="/featured_9.png" />
            </div>
            <div>
                <img src="/featured_10.png" />
            </div>
            <div>
                <img src="/featured_11.png" />
            </div>
            <div>
                <img src="/featured_12.png" />
            </div>
            <div>
                <img src="/featured_13.png" />
            </div>
        </Carousel>
    )
}

export default MyCarousel