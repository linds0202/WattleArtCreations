import {useState, ReactNode } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type FaqProps = {
    title: string;
    children: ReactNode
    required: Boolean,
    active: Boolean
}

export default function Accordion(props: FaqProps){
    const [expanded, setExpanded] = useState(props.required)

    // if (props.title === 'Step One - Artist Selection') {
    //     console.log('props.required: ', props.required)
    //     console.log('expanded: ', expanded)
    // }
    
    //${expanded ? "" : "font-normal"}
    return (
        <div className="flex flex-col p-3 border-b text-gray-light" title={`${props.active ? "" : "Add this feature to a character to customize"}`}>
            <div className="flex flex-row items-center">
                <p 
                    onClick={() => setExpanded(!expanded)} 
                    className={`text-xl cursor-pointer flex-auto  ${props.active ? "text-[#43b4e4] font-bold" : "text-[#d1d1d1]"} ${props.active ? "hover:text-[#6fd4ff]" : "hover:text-[#a8a8a8]"}`}
                >
                    {props.title}
                </p>
                {expanded ? <RemoveCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, cursor: 'pointer', ":hover": { color: "#DC2626"}}} />
                    : <AddCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, cursor: 'pointer', ":hover": {color: `${props.active ? "#43b4e4" : ""}`} }}/>
                }
            </div>
            <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expanded ? "max-h-full" : "max-h-0"}`}>
                {props.children}
            </div>
        </div>
    )
}