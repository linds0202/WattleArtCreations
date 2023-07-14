'use client'

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../firebase/auth';
// import { TextField, InputAdornment, IconButton, Dialog, CircularProgress, Container } from '@mui/material';
// import { getPortrait } from '../firebase/firestore';
// import { Timestamp } from 'firebase/firestore';

// interface PortraitData {
//   uid: String,
//   styleOne: String, 
//   styleTwo: String, 
//   styleThree: String, 
//   characters: [],
//   questions: [], 
//   price: Number,
//   customer: String,
//   artist: String,
//   date: Timestamp,
//   status: String,
//   lastUpdatedStatus: Timestamp,
//   paymentComplete: Boolean,
// }

export default function Dashboard() {
  // const { authUser, isLoading } = useAuth();
  // const router = useRouter();

  // const [myPortraits, setMyPortaits] = useState<Array<PortraitData>>([])

  // // Listen to changes for loading and authUser, redirect if needed
  // useEffect(() => {
  //   if (!isLoading && !authUser) {
  //       router.push('/')
  //   }
  // }, [authUser, isLoading]);


  // // Get portraits once user is logged in
  // const handleGetPortraits = async () => {
  //     const getMyPortraits = await getPortrait('q3trZK4K9uOWqzQW2VhbFcrlaBd2');
  //     console.log('getMyPortraits: ', getMyPortraits)
  //     setMyPortaits(getMyPortraits)
  // }

  return (
    <div>Dashboard</div>
  //   (!authUser) ? 
  //   <p>Loading ...</p>
  // :
  // <div className='bg-white'>
  //   <h1 className='text-2xl text-center my-8'>My Dashboard</h1>
  //   <button onClick={handleGetPortraits} className='text-black border-2 border-black rounded-lg p-2 my-8 mx-auto' >Get My Portraits</button>
  //   <div>
  //     {myPortraits.map(portrait => (
  //       <div className='border-2 rounded-xl border-black w-8/12 p-8 m-8'>
  //         <h4>{portrait.styleTwo} &gt; { portrait.styleThree } </h4>
  //         <p>Ordered on: {new Date(portrait.date.toDate()).toLocaleDateString("en-US")}</p>
  //         <p>Status: {portrait.status}</p>
  //       </div>
  //       ))}
  //   </div>   
  //   <div>
  //     <Link href='/portraits' className='block'>Return to Portrait Wizard</Link> 
  //   </div>
  // </div>
  )
}

