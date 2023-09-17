import {useState, ReactNode, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type ActionCenterAccordionProps = {
    title: string;
    children: ReactNode
    open: Boolean,
    attention: Boolean
}

export default function ActionCenterAccordion({title, children, open, attention}: ActionCenterAccordionProps){
    const [expanded, setExpanded] = useState(open)

    useEffect(() => {
        setExpanded(open)

    }, [open])

    
    return (
        <div className="flex flex-col p-3 border-b text-gray-light">
            <div className="flex flex-row items-center">
                <p 
                    onClick={() => setExpanded(!expanded)} 
                    className={`cursor-pointer flex-auto hover:${attention ? "text-[#D22BD4]" : "text-black"}  ${attention ? "text-[#2DD42B] font-bold" : "text-gray-400"}`}
                >
                    {title}
                </p>
                {expanded ? <RemoveCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, cursor: 'pointer', ":hover": { color: "#DC2626"}}} />
                    : <AddCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20, cursor: 'pointer', ":hover": {color: `${attention ? "#2DD42B" : ""}`} }}/>
                }
            </div>
            <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expanded ? "max-h-full" : "max-h-0"}`}>
                {children}
            </div>
        </div>
    )
}