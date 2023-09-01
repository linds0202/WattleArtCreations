import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CustomerRevision } from '../../components/PortraitCustomizer';

interface RequestRevisionProps {
    openRevision: boolean,
    setOpenRevision: Function,
    setRequestRevision: Function,
    remainingRevisions: number,
    revisionNote: CustomerRevision,
    setRevisionNote: Function
}

const RequestRevision = ({ openRevision, setOpenRevision, setRequestRevision, remainingRevisions, revisionNote, setRevisionNote }: RequestRevisionProps) => {
    const router = useRouter()

    const handleRequest = () => {
        setRequestRevision(true)
        setOpenRevision(false)
    }

    const handleChange = (e) => {
        const newNote = {text: e.target.value, date: new Date}
        setRevisionNote(newNote)
    }

    const handleCancel = () => {
        setOpenRevision(false)
    }

    return (
        <Dialog 
            onClose={() => setOpenRevision(false)} 
            open={openRevision} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
            // className='relative top-10'
        >
            <IconButton onClick={() => setOpenRevision(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            
            <div className='flex flex-col justify-center items-center'>
                <div className="flex justify-center items-center mb-4">
                    <img className="mr-4 w-[15%] justify-self-center" src="../../drips/side_splashL.png" />
                    <p className='text-2xl text-center font-bold mt-0'>Request Revision</p>
                    <img className="ml-4 w-[15%] justify-self-center" src="../../drips/side_splashR.png" />
                </div>
                
                <div className='w-full flex'>
                    
                    <div className='w-[55%]'>
                        <p className='mb-4'>We understand that creating the perfect custom art piece is a collaborative process, and sometimes, you may require a few adjustments to ensure your vision is accurately represented. At Wattle Art Creations, we prioritize your satisfaction and want you to be thrilled with the final artwork. Our standard commission process includes <span className='text-[#2DD42B] text-xl font-bold'>2</span> free revisions on the final submitted piece.
                        <Link 
                            href='/revisions' 
                            rel="noopener noreferrer" 
                            target="_blank"
                            className="text-[#2DD42B] hover:text-[#165f15] ml-2"
                        >
                            <span className='font-semibold'>(see complete policy)</span> 
                        </Link></p>
                        
    
                        {/* <p className='mb-4'>Our standard commission process includes <span className='text-[#2DD42B] text-xl font-bold'>2</span> free revisions on the final submitted piece.
                        <Link 
                            href='/revisions' 
                            rel="noopener noreferrer" 
                            target="_blank"
                            className="text-[#2DD42B] hover:text-[#165f15] ml-2"
                        >
                            <span className='font-semibold'>(see complete policy)</span> 
                        </Link>
                        </p> */}
                    

                        {remainingRevisions > 0 &&
                            <div className='mt-8'>
                                <p className='text-center text-xl'>Clicking <span className='text-[#0075FF] font-semibold'>Request Revision</span> below will notify your artist.*</p>
                            
                                <p className='text-center text-lg mt-2'>You have <span className='text-[#0075FF] font-semibold'>{remainingRevisions} {remainingRevisions === 1 ? 'revision' : 'revisions'} remaining</span> for this portrait.</p>
                            </div>
                        }

                    

                        {remainingRevisions === 0 &&
                            <div className='flex flex-col items-center border-2 border-[#0075FF] rounded-xl p-4'>
                                <p className='text-center text-lg'>You have utilized all of the included revisions for this portrait. </p>
                                
                                <h4 className='self-start font-semibold'>How to request additional revisions:</h4>
                                
                                <p>Discuss with Your Artist - If you need further adjustments, communicate your concerns with the artist. They will provide guidance on how to proceed and what can be done to ensure your satisfaction. If you decide to proceed with additional revisions, they will post a purchase link on your portrait page.</p>
                            </div>
                        }
                    </div>

                    <div className='w-[45%] ml-8 flex flex-col justify-between'>
                    <label className=''>
                        Add a description of your revision - your artist will use this to make customized quote
                    </label>
                    <textarea
                        rows={10}
                        cols={60}
                        name='revisionNote'
                        className='mt-4 border-2 border-[#E9E9E9] rounded-xl p-2'
                        onChange={handleChange}
                    />
                    </div>
                    
                </div>
                

            
            <div className='w-8/12 mx-auto mt-8 mb-4 flex justify-around items-center'>
                <button onClick={handleCancel} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                <button onClick={handleRequest} className='w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#0075FF] hover:text-white rounded-xl py-2 px-2'>
                    {remainingRevisions === 0 ? 'Request Additional Revisions' : 'Request Revision'}
                </button>
            </div>

            {remainingRevisions > 0
             ? <p className='absolute bottom-2 left-2 text-[#8f8f8f] text-sm'>*This cannot be undone</p>
             : <p className=' text-[#8f8f8f] text-sm mt-8'>Please note that additional revisions may impact the completion timeline of your artwork. Also note that this payment is reserved alongside the original payment, and will only be released to the artist when you have made the final confirmation that you are happy and satisfied with the piece!</p>

            }
            </div>
            
        </Dialog>
    )
}

export default RequestRevision