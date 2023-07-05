import {useState, ReactNode, useEffect} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type FaqProps = {
    title: string;
    children: ReactNode
    required: Boolean,
    active: Boolean
}

export default function Accordion(props: FaqProps){

    const [expanded, setExpanded] = useState(props.required);
    //${expanded ? "" : "font-normal"}
    return (
        <div className="flex flex-col p-3 border-b text-gray-light cursor-pointer" title={`${props.active ? "" : "Add this feature to a character to customize"}`}>
            <div className="flex flex-row items-center">
                <p onClick={() => setExpanded(!expanded)} className={`flex-auto hover:${props.active ? "text-[#D22BD4]" : "text-black"}  ${props.active ? "text-[#2DD42B] font-bold" : "text-gray-400"}`}>{props.title}</p>
                {expanded ? <RemoveCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, ":hover": { color: "#DC2626"}}} />
                    : <AddCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, ":hover": {color: `${props.active ? "#2DD42B" : ""}`} }}/>
                }
            </div>
            <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expanded ? "max-h-full" : "max-h-0"}`}>
                {props.children}
            </div>
        </div>
    )
}