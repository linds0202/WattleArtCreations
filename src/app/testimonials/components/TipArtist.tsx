import { useState } from "react"
import { useRouter } from "next/navigation"
import { Formik, Form, Field } from 'formik'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import { PortraitData } from "@/app/portraits/components/PortraitCustomizer"
import { getTipUrl } from '@/app/firebase/firestore'

interface TipArtistProps {
    openTip: boolean,
    setOpenTip: Function,
    portrait: PortraitData,
    setPortrait: Function,
}

const TipArtist = ({ openTip, setOpenTip, portrait, setPortrait }: TipArtistProps) => {

    const router = useRouter();

    const [tip, setTip] = useState("");

    // const handleChange = (e:any) => {
    //     console.log(e.target.value)
    //     setTip(e.target.value);
    // }

    const [initialTipValues, setInitialTipValues] = useState({
        tipAmount: 0
    })

    const handleComplete = async (values: any) => {

        console.log('tipAmoutn: ', values.tipAmount.toFixed(2)) 
        
        const tip = values.tipAmount.toFixed(2)
        // const newPortrait = {
        //     ...portrait,
        //     additionalPayments:
        // }
        
        // const updatedPortrait = await updatePortrait(newPortrait?.id, newPortrait)

        const checkoutUrl = await getTipUrl(tip, portrait, portrait.customerId)
        router.push(checkoutUrl) 
        
        setOpenTip(false)
    }

    const handleCancel = () => {
        setOpenTip(false)
    }

    return (
    <Dialog 
        onClose={() => setOpenTip(false)} 
        open={openTip} 
        fullWidth={true}
        maxWidth='sm'
        PaperProps={{ sx: { p: 6, backgroundColor: "white"} }}
    >   
        <div className='absolute top-2 right-2 w-1/12 mb-4'>
            <IconButton onClick={() => setOpenTip(false)} className='text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
        </div>

        <Formik
            initialValues={initialTipValues}
            onSubmit={handleComplete}
            >
            {({ handleChange, values }) => (
            <Form className="w-full flex flex-col items-center">
            
                <h2 className='text-center text-3xl md:text-2xl font-bold'>Feel that your artist went above and beyond?</h2>
                <div className='text-center'>
                    <p className='text-lg mt-4'>Enter an amount below to tip your artist for their hard work.</p>
                    <p className='text-sm'>(100% of tips go directly to your artist)</p>
                </div>
                
                
                <div className="w-full my-4 flex justify-center items-center">
                    <label className='text-2xl font-bold mr-4'>Tip Amount $</label>
                    <input
                        className='w-1/3 text-2xl font-bold border border-[#282828] rounded-xl py-2 px-4'
                        id="tipAmount"
                        name="tipAmount"
                        type="number"
                        min={0}
                        step={.01}
                        value={values.tipAmount}
                        onChange={handleChange}
                        placeholder="Enter tip amount"
                    />
                </div>

                <div className='w-full mx-auto mt-4 flex flex-col md:flex-row justify-around items-center'>
                    <button 
                        onClick={handleCancel} 
                        className='w-full md:w-5/12 text-xl text-[#282828] border-2 border-[#282828] hover:bg-[#282828] hover:text-white rounded-xl py-2 px-2'
                    >
                        Cancel
                    </button>
                    
                    <button 
                        type="submit"
                        className='w-full md:w-5/12 order-first md:order-last text-xl mb-4 md:mb-0 text-[#282828] border-2 border-[#282828] hover:bg-[#43b4e4] hover:text-white rounded-xl py-2 px-2'
                    >
                        Checkout
                    </button>

                </div>   
            </Form>
            )}
        </Formik>
    </Dialog>
    )
}

export default TipArtist