import '../menu/styles.css'
import { useState, useEffect } from "react"
import { Timestamp } from "firebase/firestore";
import { PendingPayments } from "./PendingPayments";
import { ReleasedPayments } from './ReleasedPayments';

export interface PaymentType {
  date: Timestamp,
  amount: number,
  portraitId: string,
  artistId: string,
  adminId: string,
  paidOn: Timestamp,
  type: string,
  released: boolean,
  uid: string
}

export default function ArtistPayments() {
  const [choice, setChoice] = useState<string>('')
    
  const handleEdit = (name: string) => {
      setChoice(name)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className='text-4xl text-center pt-10 mb-8 font-semibold'>Artist Payments</h1>

      <div className="flex justify-between">
        <button
          className={`border px-4 py-2 ${choice === 'Pending' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
          onClick={() => handleEdit('Pending')}
        >
          Pending Payments
        </button>
        <button
          className={`border px-4 py-2 ${choice === 'Released' ? 'border-[#43b4e4] bg-[#43b4e4] text-white font-semibold' : 'border-[#282828]'}`} 
          onClick={() => handleEdit('Released')}
      >
          Released Payments
        </button>
      </div>
      

      <div className="w-[100%] mb-12">
        {choice === 'Pending' ?
          <PendingPayments  />
        : choice === 'Released' ?
          <ReleasedPayments />
        : <p className='text-2xl font-bold text-center mt-10'>No payment list selected</p>
        }
      </div>
    </div>
  )
}
