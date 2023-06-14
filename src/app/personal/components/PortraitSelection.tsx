import Link from "next/link"



const PortraitSelection = ({ mode }) => {
    const options = {
        Photorealistic: {
            title: mode,
            imgs: ["./heroImgs/heroImg2.png"],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            imgs: ["./heroImgs/heroImg3.png"],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            imgs: ["./heroImgs/heroImg4.png"],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        }
    }
    const imgSrc = options[`${mode}`].imgs[0]
  
    return (
        <div> 
            <h1>{options[`${mode}`].title}</h1>
            <img src={imgSrc} className="w-[300px] h-[300px] object-cover"/>
            <Link href={{
                    pathname: '/portraits',
                    query: {selection: mode},
                    }} 
                className="text-2xl no-underline text-center border-2 border-black py-2 px-4 rounded-lg"
            >
                Start Customizing
            </Link>
        </div>
    )
}

export default PortraitSelection