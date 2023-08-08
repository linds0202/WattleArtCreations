import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RequestRevisionProps {
    role: string,
    openRevision: boolean,
    setOpenRevision: Function,
    setRequestRevision: Function,
    remainingRevisions: number,
    artistId: string
}

const RequestRevision = ({ role, openRevision, setOpenRevision, setRequestRevision, remainingRevisions, artistId }: RequestRevisionProps) => {
    const router = useRouter();

    const handleRequest = () => {
        if (remainingRevisions === 0) {
            console.log('Purchase additional revision')
        } else {
            setRequestRevision(true) 
        }
               
        setOpenRevision(false)
    }

    const handleCancel = () => {
        setOpenRevision(false)
    }

    return (
        <Dialog 
            onClose={() => setOpenRevision(false)} 
            open={openRevision} 
            fullWidth={true}
            maxWidth='md'
            PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
            className='relative'
        >
            <IconButton onClick={() => setOpenRevision(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            
            {role === 'Customer' && 
            <>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <div className="flex justify-center items-center mb-4">
                        <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" />
                        <p className='text-xl text-center font-bold mt-0'>Request Revision</p>
                        <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" />
                    </div>
                    <p className='text-center text-lg mb-4'>We understand that creating the perfect custom art piece is a collaborative process, and sometimes, you may require a few adjustments to ensure your vision is accurately represented. At Wattle Art Creations, we prioritize your satisfaction and want you to be thrilled with the final artwork.</p>
                    <p className='text-center text-lg mb-4'>Our standard commission process includes two free revisions on the final submitted piece.<Link 
                                    href='/revisions' 
                                    rel="noopener noreferrer" 
                                    target="_blank"
                                    className="text-[#2DD42B] hover:text-[#165f15]"
                                >
                                    <span className='ml-2 font-semibold'>(see complete policy)</span> 
                                </Link></p>
                    {remainingRevisions > 0 &&
                        <>
                            <p className='text-center text-lg'>Clicking below will notify your artist that you are <span className='text-[#0075FF] font-semibold'>requesting a revision</span>.*</p>
                        
                            <p className='text-center text-lg'>You have <span className='text-[#0075FF] font-semibold'>{remainingRevisions} {remainingRevisions === 1 ? 'revision' : 'revisions'} remaining</span> for this portrait.</p>
                        </>
                    }

                    

                    {remainingRevisions === 0 &&
                        <>
                            <p className='text-center text-lg'>You have utilized all of the included revisions for this portrait. </p>
                            
                            <h4>How to request additional revisions</h4>
                            
                            <p>Discuss with Your Artist - If you need further adjustments, communicate your concerns with the artist. They will provide guidance on how to proceed and what can be done to ensure your satisfaction. If you decide to proceed with additional revisions, they will post a purchase link on your portrait page. Please note that this payment is reserved alongside the original payment, and will only be released to the artist when you have made the final confirmation that you are happy and satisfied with the piece!</p>

                            <p className='text-sm text-[#E9E9E9]'>Please note that additional revisions may impact the completion timeline of your artwork. We appreciate your understanding and patience as our artists work diligently to create the perfect custom piece for you.</p>
                        </>
                    }
                </div>
                
                <div className='w-8/12 mx-auto flex justify-around items-center'>
                    <button onClick={handleCancel} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-red-600 hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                    <button onClick={handleRequest} className='text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'>
                        {remainingRevisions === 0 ? 'Request Additional Revisions' : 'Request Revision'}
                        {remainingRevisions === 0 && <span className='text-sm text-[#E9E9E9]'>(Additional Cost)</span>}
                    </button>
                </div>
            </>}

            <p className='absolute bottom-2 left-2 text-[#8f8f8f] text-sm mt-8'>*This cannot be undone</p>

        </Dialog>
    )
}

export default RequestRevision