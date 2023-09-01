import { CustomerRevision, PortraitData } from "../../components/PortraitCustomizer"
import ActionCenterAccordion from "./ActionCenterAccordion"

interface CustomerRevisionProps {
    portrait: PortraitData,
    note: CustomerRevision,
    img: string,
    latest: boolean,
    index: number
}

const CustomerRevision = ({portrait, note, img, latest, index}: CustomerRevisionProps) => {
    
    return (
            <ActionCenterAccordion title={`${index >= 2 ? 'Additional Revision Request': 'Revision Request'}`} open={latest} attention={latest} >
                
                <div className="bg-[#e8e8e8] rounded-lg p-4 mt-2 flex flex-col items-center">
                    <div className="flex items-center">
                        <img src={img} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                    
                        <p className="ml-4 text-sm bg-white p-2 rounded-lg">{note?.text}</p>
                    </div>
                    <p className="w-[100%] text-sm mt-2 text-[#0075FF] font-semibold">Revision Requested on: <span className="text-black ml-2">{new Date(note?.date.seconds * 1000).toDateString() + ' at ' + new Date(note?.date.seconds * 1000).toLocaleTimeString()}</span></p>
                </div>
            
            </ActionCenterAccordion>
    )
}

export default CustomerRevision