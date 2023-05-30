
import MyCarousel from '../../../components/MyCarousel'
import ConsultWizard from './ConsultWizard'
import { useState } from 'react'

export default function Wizard({ selection, category, setOpenWizard, setConsult }) {
    const [startConsult, setStartConsult] = useState(false)

    const handleClick = () => {
        setStartConsult(true)
    }

    return (
        <div className="bg-white text-black w-full h-full rounded-xl ">
            {!startConsult && (
                <div className='flex justify-around items-center h-full'>
                    <MyCarousel selection={selection} />
                    <div className='w-4/12 h-3/4 flex flex-col justify-center items-center gap-y-8'>
                        <h2 className='text-3xl font-bold'>Call To Action</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati repudiandae reiciendis ducimus dolor, aspernatur nesciunt, quod praesentium modi repellat quia in repellendus</p>
                        <button 
                            className='w-10/12 border-2 border-black rounded-lg py-2 px-4 mx-14'
                            onClick={handleClick}    
                        >
                            Submit Consultation
                        </button>
                    </div>
                </div>
            )}
            {startConsult && (
                // <div className='flex flex-col items-center justify-center'>
                    <ConsultWizard category={category} selection={selection} setStartConsult={setStartConsult} setOpenWizard={setOpenWizard} setConsult={setConsult}/>
                // </div>
            )}
            
        </div>
    )
}