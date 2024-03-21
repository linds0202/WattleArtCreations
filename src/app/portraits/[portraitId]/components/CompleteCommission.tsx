import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import { PortraitData } from '../../components/PortraitCustomizer';
import { updateArtistOnCompletion, updatePortrait, updatePortraitModels, addArtistPayment } from '@/app/firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useCategoriesContext } from '@/app/context/CategoriesContext';

interface CompleteCommissionProps {
    role: string,
    openComplete: boolean,
    setOpenComplete: Function,
    portrait: PortraitData,
    setPortrait: Function
}

const CompleteCommission = ({ role, openComplete, setOpenComplete, portrait, setPortrait }: CompleteCommissionProps) => {
    const { categories } = useCategoriesContext()
    const router = useRouter();

    const handleComplete = async () => {
        // Calc new artist commission from addOns & round to 2 decimals
        const newArtistPay = Math.round(portrait.additionalPayments.reduce((sum, payment) => sum += !payment.released ? payment.artistPay * categories.customizer.pricing.commissionPercentage : 0, 0) * 100) / 100
        
        console.log('newArtistPay: ', newArtistPay)

        const newPriceTotal = Math.round(portrait.additionalPayments.reduce((sum, payment) => sum += !payment.released ? payment.total : 0, 0) * 100) / 100

        console.log('newPriceTotal: ', newPriceTotal)

        // Adjust artist pay to reflect commission percentage
        const newAdditionalPayments = portrait.additionalPayments.map(payment => ({
            ...payment,
            artistPay: !payment.released ? Math.round(payment.artistPay * categories.customizer.pricing.commissionPercentage * 100) / 100 : payment.artistPay,
            released: true
        }))

        // Count new models
        let modelsTotal = 0
        let modelsCount = 0
        for (const payment of portrait.additionalPayments) {
            if (!payment.released) {
                for (const item of payment.items) {
                    if (item.type === 'model') {
                        modelsCount++
                        modelsTotal += item.price
                    }
                }
            }
        }

        // Create payment doc
        let newPaymentId
        if (portrait?.portraitCompletionDate === null) {
            newPaymentId = await addArtistPayment({
                artistId: portrait.artist[0].id,
                portraitId: portrait.id,
                amount: portrait.price.artistPay + newArtistPay,
                type: 'First',
            })
            
        } else {
            newPaymentId = await addArtistPayment({
                artistId: portrait.artist[0].id,
                portraitId: portrait.id,
                amount: portrait.price.artistPay + newArtistPay,
                type: 'AddOn',
            })
        }

        const newPortrait = {
            ...portrait, 
            status: 'Completed',
            portraitCompletionDate: Timestamp.now(),
            additionalPayments: newAdditionalPayments,
            lastUpdatedStatus: new Date,
            price: {
                modelsCount: portrait.price.modelsCount + modelsCount,
                modelsTotal: portrait.price.modelsTotal + modelsTotal,
                artistPay: portrait.price.artistPay + newArtistPay,
                total: portrait.price.total + newPriceTotal
            },
            paymentIds: [...portrait.paymentIds, newPaymentId]
        }

        console.log('newPortrait: ', newPortrait)
        
        if (portrait?.portraitCompletionDate === null) {
            const updatedArtist = await updateArtistOnCompletion(newPortrait, portrait.price.artistPay + newArtistPay, newPaymentId)      
        } else {
            const updatedArtist = await updateArtistOnCompletion(newPortrait, newArtistPay, newPaymentId)
        }
        
        
        const updatedPortrait = await updatePortrait(newPortrait?.id, newPortrait)
        setPortrait(newPortrait)  
        
        // Update 3D model status
        if (newPortrait.sheetUploads.filter(sheet => sheet.type === 'model').length !== 0) {
            const newModels = await updatePortraitModels(newPortrait.id)
        }
        
        router.push(`/testimonials?portraitId=${portrait.id}&artistId=${portrait?.artist[0].id}`)
        setOpenComplete(false)
    }

    const handleCancel = () => {
        setOpenComplete(false)
    }

    return (
        <Dialog 
            onClose={() => setOpenComplete(false)} 
            open={openComplete} 
            fullWidth={true}
            maxWidth='sm'
            PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
        >   
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenComplete(false)} className='text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            
            {role === 'Customer' && 
            <>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <div className="flex justify-center items-center mb-4">
                        <img className="hidden md:block mr-4 w-[15%] justify-self-center" src="../../images/drips/side_splashL.png" alt='black accent paint splash'/>
                        <p className='text-2xl md:text-3xl text-center font-bold mt-0'>Congratulations on Your Custom Artwork!</p>
                        <img className="hidden md:block ml-4 w-[15%] justify-self-center" src="../../images/drips/side_splashR.png" alt='black accent paint splash'/>
                    </div>
                    <p className='text-center text-lg mb-4'>Thank you for choosing Wattle Art Creations for your custom art commission. We&apos;re delighted to know that you&apos;re happy with the final artwork, and we can&apos;t wait for you to showcase and enjoy your digital masterpiece!</p>
                    <p className='text-center text-lg'>Clicking below will <span className='text-[#43b4e4] font-semibold'>complete</span> your commission and <span className='text-[#43b4e4] font-semibold'>release</span> your payment to your artist.*</p>
                </div>
                
                <div className='w-full mx-auto flex flex-col md:flex-row justify-around items-center'>
                    <button 
                        onClick={handleCancel} 
                        className='w-full md:w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'
                    >
                        Cancel
                    </button>
                    
                    <button 
                        onClick={handleComplete} 
                        className='w-full md:w-5/12 order-first md:order-last text-xl mb-4 md:mb-0 text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'
                    >
                        Release Payment
                    </button>
                </div>
            </>}

            <p className='text-[#8f8f8f] text-sm mt-8'>*This cannot be undone</p>

        </Dialog>
    )
}

export default CompleteCommission