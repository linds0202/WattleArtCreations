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
    console.log('latest: ', latest)
    return (
            <ActionCenterAccordion title={`${index >= 2 ? 'Additional Revision Request': 'Revision Request'}`} open={latest} attention={latest} >
                
                <div className="w-full bg-[#e8e8e8] rounded-lg p-4 mt-2 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center">
                        <img alt='image related to this revision request' src={img} className='w-[96px] h-[96px] object-contain rounded-lg'/>
                        <div className="w-full bg-white py-2 px-4 rounded-lg ml-4 self-stretch flex flex-col justify-center">
                            <p >{note?.text}</p>
                        </div>
                    </div>
                    <p className="w-[100%] text-sm mt-2 text-[#4da0ff] font-semibold">Revision Requested on: <span className="text-black ml-2">{new Date(note?.date.seconds * 1000).toDateString() + ' at ' + new Date(note?.date.seconds * 1000).toLocaleTimeString()}</span></p>
                </div>
            
            </ActionCenterAccordion>
    )
}

export default CustomerRevision