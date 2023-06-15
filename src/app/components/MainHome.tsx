import { useState } from 'react'
import { motion } from 'framer-motion'

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

export default function MainHome () {
    
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);   
    
    return (
        <div>
            <div className="switch border-2 border-black" data-isOn={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
            </div>
        </div>
    )
}
