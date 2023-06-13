
import Questionaire from "./questionaire/Questionaire"

import { motion } from 'framer-motion'

interface Props {
    selection: String,
}

const PortraitCustomizer = ({ mode, setMode }: Props) => {

    

    const testimonialVarient = {
    hidden: {
        opacity: 0,
        y: 200
    },
    show: {
        opacity: 1,
        y: 0
    }
    }
  
    return (
    <div>
        <Questionaire option={options[`${selection}`]}/>
    </div>
  )
}

export default PortraitCustomizer