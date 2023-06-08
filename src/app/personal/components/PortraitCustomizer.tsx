import React from 'react'

interface Props {
    mode: String,
    setMode: Function
}

const PortraitCustomizer = ({ mode, setMode }: Props) => {
    
    const options = {
        Photorealistic: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        Anime: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        },
        NSFW: {
            title: mode,
            imgs: [],
            testimonials: [{author: 'Bob', text: 'good job'}],
            basePrices: []
        }
    }
  
    return (
    <div>
        <p>{options[`${mode}`].title}</p>
        <button onClick={() => setMode('Home')}>Back to Home</button>

    </div>
  )
}

export default PortraitCustomizer