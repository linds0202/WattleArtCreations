
import Questionaire from "./questionaire/Questionaire"

interface Props {
    selection: String,
}

const PortraitCustomizer = ({ selection }: Props) => {
    const options = {
        Photorealistic: {
            title: selection,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        Anime: {
            title: selection,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: selection,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        }
    }
  
    return (
    <div>
        <Questionaire option={options[`${selection}`]}/>          
    </div>
  )
}

export default PortraitCustomizer