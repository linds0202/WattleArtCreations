import {useState, ReactNode} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type FaqProps = {
    title: string;
    children: ReactNode
}

export default function Accordion(props: FaqProps){

    const [expanded, setExpanded] = useState(false);

    return <div className="flex flex-col p-3 border-b text-gray-light cursor-pointer">
        <div className="flex flex-row items-center">
            <p onClick={() => setExpanded(!expanded)} className={`flex-auto hover:text-yellow-500 ${expanded ? "text-gray-dark font-black" : "font-normal"}`}>{props.title}</p>
            {expanded ? <RemoveCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20 }}/>
                : <AddCircleOutlineIcon onClick={() => setExpanded(!expanded)} sx={{ fontSize: 20 }}/>
            }
        </div>
        <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expanded ? "max-h-full" : "max-h-0"}`}>
            {props.children}
        </div>
    </div>
}