import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CustomerRevision } from '../../components/PortraitCustomizer';
import { Timestamp } from 'firebase/firestore';

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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNote = {text: e.target.value, date: Timestamp.now()}
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
            PaperProps={{ sx: { p: 4, backgroundColor: "white", position: 'relative'} }}
        >

            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenRevision(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            
            
            <div className='flex flex-col justify-center items-center'>
                <div className="flex justify-center items-center mb-4">
                    <img className="mr-4 w-[10%] md:w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black paint splash accent'/>
                    <p className='text-xl md:text-2xl text-center font-bold mt-0'>Request Revision</p>
                    <img className="ml-4 w-[10%] md:w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black paint splash accent'/>
                </div>
                
                <div className='w-full flex flex-col lg:flex-row'>
                    
                    <div className='w-full lg:w-[55%]'>
                        <p className='mb-4'>We understand that creating the perfect custom art piece is a collaborative process, and sometimes, you may require a few adjustments to ensure your vision is accurately represented. At Wattle Art Creations, we prioritize your satisfaction and want you to be thrilled with the final artwork. Our standard commission process includes <span className='text-[#2DD42B] text-xl font-bold'>2</span> free revisions on the final submitted piece.
                        <Link 
                            href='/revisions' 
                            rel="noopener noreferrer" 
                            target="_blank"
                            className="text-[#2DD42B] hover:text-[#165f15] ml-2"
                        >
                            <span className='font-semibold'>(see complete policy)</span> 
                        </Link></p>
                                            

                        {remainingRevisions > 0 &&
                            <div className='mt-8'>
                                <p className='text-center text-xl'>Clicking <span className='text-[#43b4e4] font-semibold'>Request Revision</span> below will notify your artist.*</p>
                            
                                <p className='text-center text-lg mt-2'>You have <span className='text-[#43b4e4] font-semibold'>{remainingRevisions} {remainingRevisions === 1 ? 'revision' : 'revisions'} remaining</span> for this portrait.</p>
                            </div>
                        }

                    

                        {remainingRevisions === 0 &&
                            <div className='flex flex-col items-center border-2 border-[#43b4e4] rounded-xl p-4'>
                                <p className='text-center text-lg font-bold'>You have utilized all included revisions for this portrait. </p>
                                
                                <h4 className='mt-2 self-start text-[#43b4e4] font-semibold'>To request an additional revision:</h4>
                                
                                <p>If you need further adjustments, click below to notify your artist. They will provide guidance on how to proceed and what can be done to ensure your satisfaction. If you decide to proceed with additional revisions, they will post a purchase link on your portrait page.</p>
                            </div>
                        }
                    </div>

                    <div className='w-full lg:w-[45%] lg:ml-8 flex flex-col justify-between'>
                    <label className='mt-8 lg:mt-0'>
                        Add a description of your revision {remainingRevisions === 0 ? '- your artist will use this to make customized quote' : ''}
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
                

            
            <div className='w-full lg:w-8/12 mx-auto mt-8 mb-4 flex flex-col md:flex-row justify-around items-center'>
                <button onClick={handleCancel} className='w-full md:w-5/12 text-lg lg:text-xl mt-4 md:mt-0 text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'>Cancel</button>
                <button onClick={handleRequest} className='w-full md:w-5/12 order-first md:order-last text-lg lg:text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'>
                    {remainingRevisions === 0 ? 'Request an Additional Revision' : 'Request Revision'}
                </button>
            </div>

            {remainingRevisions > 0
             ? <p className='text-[#8f8f8f] text-sm'>* This cannot be undone</p>
             : <p className=' text-[#8f8f8f] text-sm mt-8'>* Please note that additional revisions may impact the completion timeline of your artwork. Also note that this payment is reserved alongside the original payment, and will only be released to the artist when you have made the final confirmation that you are happy and satisfied with the piece!</p>

            }
            </div>
            
        </Dialog>
    )
}

export default RequestRevision