import { Dialog } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { PortraitData } from '../../components/PortraitCustomizer';
import { updatePortrait } from '@/app/firebase/firestore';

interface AdditionalRevisionProps {
    openAdditionalRevision: boolean,
    setOpenAdditionalRevision: Function,
    portrait: PortraitData,
    setPortrait: Function,
}

const AdditionalRevision = ({ openAdditionalRevision, setOpenAdditionalRevision, portrait, setPortrait }: AdditionalRevisionProps) => {
    
    const [level, setLevel] = useState(portrait?.revisionLevel !== "" ? portrait?.revisionLevel : "Simple")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value)
    }

    const handleSelect = () => {

        let link = ''
        switch(level) {
            case "Simple":
                
                link = "https://buy.stripe.com/test_3cs14g82bbBX3nOcMM"
                break
            case "Intermediate":
                
                link = "https://buy.stripe.com/test_00gaEQdmv6hD8I8cMO"
                break
            case "Complex":
                
                link = "https://buy.stripe.com/test_7sI7sE96fcG10bC8wz"
                break
            default:
                break
        }

        const updatedPortrait = {...portrait, revisionLevel: level, purchaseRevisionLink: link}

        updatePortrait(portrait.id, updatedPortrait)
        
        setPortrait(updatedPortrait)

        setOpenAdditionalRevision(false)
    }

    
    return (
        <Dialog 
            onClose={() => setOpenAdditionalRevision(false)} 
            open={openAdditionalRevision} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { px: 2, py: 4, backgroundColor: "white", minHeight: '80vh',
            maxHeight: '80vh', justifyContent: 'space-between', alignItems: 'center', position: 'relative'} }}
        >
            <IconButton onClick={() => setOpenAdditionalRevision(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            <h2 className='text-4xl font-bold'>Additional Revision Request</h2>
            <div className='w-10/12 text-center'>
                <p className='text-xl mb-2'>Your customer has requested an additional revision beyond the included 2.</p>
                <p>Pleasde discuss via chat what this request will include. Once agreement has been reached. Select the level of revision below</p>
            </div>
            
            <div>
                <input
                    type="radio" 
                    name="additionalRevisionLevel" 
                    value="Simple" 
                    id="simple" 
                    onChange={handleChange}
                    checked={level === "Simple"}
                />
                <label htmlFor="simple" className='ml-2 mr-8 text-xl' >$50 - Simple</label>

                <input 
                    type="radio" 
                    name="additionalRevisionLevel" 
                    value="Intermediate" 
                    id="intermediate" 
                    onChange={handleChange}
                    checked={level === 'Intermediate'}
                />
                <label htmlFor="intermediate" className='ml-2 mr-8 text-xl' >$100 - Intermediate</label>

                <input 
                    type="radio" 
                    name="additionalRevisionLevel" 
                    value="Complex" 
                    id="complex" 
                    onChange={handleChange}
                    checked={level === "Complex"}
                />
                <label htmlFor="complex" className='ml-2 text-xl' >$150 - Complex</label>
            </div>

            <button 
                type="button" 
                onClick={handleSelect}
                className='px-4 py-2 text-center border-2 border-black rounded-xl hover:text-white hover:bg-[#282828] '
            >
                Select Level
            </button>            

        </Dialog>
    )
}

export default AdditionalRevision