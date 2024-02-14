'use client'

import '../globals.css'
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategoriesContext } from '../context/CategoriesContext';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Dialog } from '@mui/material';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth, app, storage } from '@/app/firebase/firebase';
import PortraitCustomizer from './components/PortraitCustomizer';
import { PortraitData } from './components/PortraitCustomizer';
import { getPortrait } from '../firebase/firestore';
import Footer from '../components/Footer';
import { getCheckoutUrl } from '../firebase/firestore';

// Configure FirebaseUI., 
const uiConfig = {
  signInFlow: 'popup', 
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
  },
};

export default function Portraits() {
  const { categories } = useCategoriesContext()

  const searchParams = useSearchParams()
  const selection: string | null = searchParams.get('selection')
  const direct: string | null = searchParams.get('direct')
  const portraitId = searchParams.get('portrait_id')
  const continueEdit = searchParams.get('edit')
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState(false);

  const [portraits, setPortraits] = useState<Array<PortraitData>>([])
  const [openWizard, setOpenWizard] = useState(false)
  const [editIndex, setEditIndex] = useState<number>(0)
  const [editPortrait, setEditPortrait] = useState<PortraitData | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  
  useEffect(() => {
    if (!isLoading && !authUser && portraits.length !== 0) {
        setLogin(true)
    } else if (authUser) {
      setLogin(false)
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    const cart = sessionStorage?.getItem("Cart")
    let currentPortraits: Array<PortraitData>
    if (cart !== null && cart.length !== 0) {
      currentPortraits = JSON.parse((cart))
      
      const newPrice = currentPortraits.reduce((sum, p) => sum += p.price, 0)
      
      setPortraits(JSON.parse((cart)))
      setTotalPrice(newPrice)
    } else {
      currentPortraits = []
      setPortraits([])
    }

    if (portraitId && continueEdit) {
      
      const handleGetPortrait = async () => {
        const addedPortrait: PortraitData | null = await getPortrait(portraitId)

        if (addedPortrait) {
          const portraitIds = currentPortraits.map(portrait => portrait.id)
          if(!portraitIds.includes(portraitId)){
            const newPortraitList = [...currentPortraits, addedPortrait]
            setTotalPrice(newPortraitList.reduce((sum, portrait) => sum += portrait.price, 0))
            setEditIndex(currentPortraits.length)
            setPortraits([...currentPortraits, addedPortrait])
            setEditPortrait(addedPortrait)
          } else {
            const newIndex = portraitIds.indexOf(portraitId)
            setEditIndex(newIndex)
            setEditPortrait(currentPortraits[newIndex])
          }
        } 
        
        setOpenWizard(true)
      }
      
      handleGetPortrait()
      
    } else if (portraitId && !continueEdit) {
      
      const handleGetPortrait = async () => {
        const addedPortrait: PortraitData | null = await getPortrait(portraitId)
        if (addedPortrait) {
         
          const portraitIds = currentPortraits.map(portrait => portrait.id)
        
          if(!portraitIds.includes(portraitId)){
            const newPortraitList = [...currentPortraits, addedPortrait]
            setPortraits([...currentPortraits, addedPortrait])
            setTotalPrice(newPortraitList.reduce((sum, portrait) => sum += portrait.price, 0))
          } 
        } 
      }
      
      handleGetPortrait()
    } 
    else {
      if ((currentPortraits.length === 0 || direct === 'true')) {
        setOpenWizard(true)
      } else {
        setOpenWizard(false)
      }
    }
  }, [])


  //update cart context on portrait addition
  useEffect(() => {
    window.scrollTo(0, 0)

    sessionStorage.setItem('Cart', JSON.stringify(portraits))
    window.dispatchEvent(new Event("storage"))
  }, [portraits])



  const getCharIcons = (i: number) => {
    const urls = portraits[i].characters.map(char => '/images/customizer/character.png')
    
    if (urls.length > 0) {
      return (
      <div className='mt-[6px] flex'>
        {urls.slice(0, 2).map((url, i) => <img className="w-[28px] h-[40px] object-cover" key={i} src={url} alt='character icon'/>)} 
        {urls.length > 2 && <p className='w-1/6 text-sm text-center text-[#8d8d8d]'> +{urls.length - 2} more</p>}
      </div>
      )
    } else {
      return <p>Something went wrong</p>
    }
  }

  const getAnimalIcons = (i: number) => {
    const urls = portraits[i].animals.map(animal => {
      switch (animal.type) {
        case 'Small Pet':
          return categories.customizer.defaults.petSmall
        case 'Large Pet':
          return categories.customizer.defaults.petLarge
        case 'Monster/Dragon':
          return categories.customizer.defaults.petMonster
      }
    })
    
    if (urls.length > 0) {
      return (
        <div className='mt-[6px] flex justify-start'>
            {urls.slice(0, 3).map((url, i) => 
            <div 
              key={i}
              className='w-[48px] h-[48px] relative'
            >
              <object 
                  type="image/svg+xml" 
                  data={url} 
                  className="absolute top-0 left-0 w-[100%] h-[100%]"
              /> 
            </div>)}
            {urls.length > 3 && <p className='w-1/6 text-sm text-center text-[#8d8d8d]'> +{urls.length - 3} more</p>}
        </div>
      )
    } else {
      return <p className='text-sm text-red-600'>None</p>
    }
  }


  const getUploadedImgs = (i: number) => {
    let urls: Array<string> = []
    portraits[i].images.forEach(imgSet => imgSet.imageUrls.forEach((url, i) => urls.push(url)))
    
    if (urls.length > 0) {
      return (
      <div className='mt-[6px] flex'>
        {urls.slice(0, 5).map((url, i) => <img className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] object-cover object-top mr-4" key={i} src={url} alt='thumbnail of customer uploaded image'/>)} 
        {urls.length > 5 && <p className='w-1/12 text-sm text-center text-[#8d8d8d]'> +{urls.length - 5} more</p>}
      </div>
      )
    } else {
      return <p className='text-sm text-red-600'>(No images uploaded)</p>
    }
  }

  const portraitList = portraits?.map((portrait, i) => (
    <div className='w-full bg-white rounded-lg mb-4 p-2 lg:p-4 flex flex-col items-center relative z-20' key={i}>
      <button 
        type="button" 
        onClick={() => handleDelete(i)} 
        className='absolute top-2 right-2 hover:text-red-600 cursor-pointer'
        title='Remove from order? Unordered portraits can be found on your dashboard'
      >
          <DeleteForeverIcon />
      </button>

      <div className='w-full lg:w-3/4 mb-2 flex justify-between lg:justify-center items-center'>
        <div className='lg:hidden w-[96px] h-[96px] object-cover object-top rounded-xl'>
          <img 
            src={`${portrait.images.length !== 0 ? portrait.images[0].imageUrls[0] : portrait.mode === categories.cat1.type 
              ? categories.customizer.defaults.cat1DefaultImg 
              : portrait.mode === categories.cat2.type
              ? categories.customizer.defaults.cat2DefaultImg 
              : categories.customizer.defaults.cat3DefaultImg }`}
            //src={portrait?.images.length > 0 ? portrait?.images[0].imageUrls[0] : defaultImgs[portrait?.mode]} 
            alt={`default image for ${portrait?.mode} portrait`} 
            className='w-[100%] h-[100%] object-cover object-top rounded-xl'
          />
          
        </div>
        <p className='text-2xl font-semibold text-black text-center mb-2'>{portrait?.portraitTitle} <span className='block lg:inline text-lg text-[#43b4e4] font-semibold'>({portrait?.mode})</span></p>
        <button type="button" onClick={() => handleEdit(i)} className='hover:text-[#43b4e4] ml-4'>
          <EditIcon />
        </button>
      </div>

      

      <div className='w-full flex flex-col lg:flex-row justify-between items-center'>
        <div className='hidden lg:block w-[125px] h-[125px] object-cover object-top rounded-xl'>
          <img 
            src={`${portrait.images.length !== 0 ? portrait.images[0].imageUrls[0] : portrait.mode === categories.cat1.type 
              ? categories.customizer.defaults.cat1DefaultImg 
              : portrait.mode === categories.cat2.type
              ? categories.customizer.defaults.cat2DefaultImg 
              : categories.customizer.defaults.cat3DefaultImg }`}
            //src={portrait?.images.length > 0 ? portrait?.images[0].imageUrls[0] : defaultImgs[portrait?.mode]} 
            alt={`default image for ${portrait?.mode} portrait`} 
            className='w-[100%] h-[100%] object-cover object-top rounded-xl'
          />
          
        </div>


        <div className='w-full lg:w-3/4 flex flex-col'>
          <div className='w-full lg:ml-4 flex flex-wrap lg:flex-nowrap'>
            <div className='w-5/12 lg:w-2/12 items-start flex flex-col'>
              <p className='text-black text-lg border-b border-[#8d8d8d]'>Characters</p>
              <div className='mt-[6px] flex justify-start'>  
                {getCharIcons(i)}
              </div>
            </div>

            <div className='w-1/2 lg:w-3/12 lg:ml-10'>
              <p className='text-black text-lg border-b border-[#8d8d8d]'>Animals</p>
              <div className='mt-[6px] flex justify-start'>  
                {getAnimalIcons(i)}
              </div>
            </div>

            <div className='w-full lg:w-7/12 lg:ml-10 mt-2 lg:mt-0'>
              <p className='text-black text-lg border-b border-[#8d8d8d] mr-4'>Uploaded Images</p>
              <div className='mt-[6px] flex justify-start'> 
                {getUploadedImgs(i)}
              </div>
            </div>
          </div> 
        
          <div className='flex justify-between items-center mt-4 md:mt-0'>
            <p className='w-7/12 lg:w-auto lg:ml-4 lg:mt-[6px] text-black text-lg'><span className='border-b border-[#8d8d8d]'>Background -</span> {portrait.bg.type === 'bgSimple' ? 'Simple' : portrait.bg.type === 'bgComplex' ? 'Complex' : 'None'} </p>
            
            <p className='lg:hidden w-3/12 text-black text-right text-2xl font-semibold'>${portrait?.price}</p>
          </div>   
        </div>
        
        <div className='hidden lg:block'>
          <p className='text-black text-xl font-semibold mb-4'>${portrait?.price}</p>
        </div>
      </div>
    </div>
  ))


  const checkoutList = portraits?.map((portrait, i) => (
    <div className='w-full flex flex-col justify-between mt-4' key={i}>
      
      <div className="flex justify-between items-center">
        <p className='text-lg md:text-base xl:text-lg font-semibold'>{portrait?.portraitTitle.slice(0,20)} <span className='text-sm md:text-xs xl:text-sm'>({portrait.mode})</span></p>
        <p className='text-lg font-semibold text-[#43b4e4]'>${portrait.price.toFixed(2)}</p>
      </div>
      
      {/* border-t border-[#282828]/50 */}
      <div className="w-full xl:w-3/4 mb-4 py-2 bg-white/50 rounded-xl">
        {/* num chars  */}
        <p className='text-base md:text-sm lg:text-base font-semibold ml-4 md:ml-2 xl:ml-4'>Characters ({portrait.characters.length})</p>
        <div className="w-7/12 ml-8 md:ml-4 xl:ml-8">
            {portrait.characters.map((char, i) => 
            (
              <div key={i} className='flex justify-between'>
                <p className="text-base md:text-sm lg:text-base">Char {i + 1}:</p>
                <p className="text-base md:text-sm lg:text-base">${char.total}</p>
              </div>
            ))}
        </div>

        {/* Animals */}
        {portrait.animals.length !== 0 && 
        <>
          <p className='font-semibold ml-4 md:ml-2 xl:ml-4'>Animals ({portrait.animals.length})</p>
          <div className="w-7/12 ml-8 md:ml-4 xl:ml-8">
              {portrait.animals.map((animal, i) => 
              (
                <div key={i} className='flex justify-between'>
                  <p className="text-base md:text-sm lg:text-base">{animal.type}:</p>
                  <p className="text-base md:text-sm lg:text-base">${animal.price}</p>
                </div>
              ))}
          </div>
        </>}

        {/* Background */}
        {portrait.bg.type !== 'None' && 
        <>
          <p className='font-semibold ml-4 md:ml-2 xl:ml-4'>Background</p>
          <div className="w-7/12 ml-8 md:ml-4 xl:ml-8">
            <div className='flex justify-between'>
              {portrait.bg.type === 'bgSimple' && <p className="text-base md:text-sm lg:text-base">Simple Background</p>}
              {portrait.bg.type === 'bgComplex' && <p className="text-base md:text-sm lg:text-base">Complex Background</p>}
              <p className="text-base md:text-sm lg:text-base">${portrait.bg.price}</p>
            </div>
          </div>
        </>}
        
      </div>
    </div>
  ))

  const checkout = async () => {
    const checkoutUrl = await getCheckoutUrl(portraits, authUser.uid)
    router.push(checkoutUrl)
  }

  const checkoutButton = (
    <button
      onClick={checkout}
      className="z-50 w-full text-3xl font-semibold mt-8 py-2 md:px-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
    >
      <div className="flex gap-2 items-center align-middle justify-center">
        Checkout
      </div>
    </button>
  );
  

  const handleEdit = (i: number) => {
    setEditPortrait(portraits[i])
    setEditIndex(i)
    setOpenWizard(true)
  }

  const handleDelete = (i: number) => {
    let deletePortraitArr = portraits.filter((portrait, index) => index !== i)
    setTotalPrice(deletePortraitArr.reduce((sum, portrait) => sum += portrait.price, 0))
    setPortraits(deletePortraitArr)
  }

  return (isLoading ?
    <></>
    : <div className='relative min-h-[100vh] bg-gradient-to-b from-black from-0% via-[#282828] via-40% to-black to-60%'>

      <div className='flex flex-col space-y-4 items-center min-h-screen text-black pb-8'>
        {!openWizard && <h1 className='font-serif text-white text-6xl mt-16 mb-4 font-bold'>My Cart</h1>}

        {/* Display the cart */}
        <div className='w-full flex justify-between items-center md:items-stretch px-2 md:px-0 xl:px-8'> 
          {!openWizard && 
          <div className='w-full md:pl-2 xl:pl-0 flex flex-col md:flex-row md:justify-between'>
            <div className='w-full md:w-8/12 flex flex-col justify-start items-center'>
              {portraits.length === 0 
                ? <div className='flex flex-col justify-start items-center border border-white/25 rounded-xl p-8 text-white shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:border-[#ffffff]/50'>
                    <h2 className='text-5xl'>Your Cart is Empty!</h2>
                    <div className='flex flex-col justify-between items-center mt-8'>
                      <button onClick={() => setOpenWizard(true)} className='text-xl font-bold p-4 bg-gradient-to-r from-[#338cb2] to-[#43b4e4] rounded-xl text-black text-center cursor-pointer hover:scale-105 transition duration-200 ease-in-out'>
                        Create a Portrait
                      </button>
                      <p className='text-xl mt-4'>or</p>
                      <div className='flex flex-col justify-center items-center mt-2'>
                        <p className='text-2xl text-center font-semibold'>Visit your dashboard and add a portrait to your cart</p>
                        <div className='mt-8 rounded-xl w-1/4 h-auto mx-auto bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 z-20'>
                        <div className="flex flex-col justify-between h-full bg-black rounded-lg p-4">
                          <Link 
                            href={`/dashboard/${authUser?.uid}`} 
                            className='text-xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] text-transparent bg-clip-text'
                          >
                            Dashboard
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                : <>
                    {portraitList}
                    <button onClick={() => setOpenWizard(true)} className='hidden md:block rounded-xl md:w-2/3 xl:w-1/4 h-auto mx-auto mt-10 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 z-20'>
                      <div className="flex flex-col justify-between h-full bg-black rounded-lg p-4">
                        <p className='text-xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] text-transparent bg-clip-text'>Create Another Portrait</p>
                      </div>
                      
                    </button>
                  </>}
              
            </div>

            <div className='w-full md:w-4/12 flex flex-col justify-start items-center z-30'>
              <div className='w-full md:w-11/12 p-4 bg-[#E5E5E5] rounded-lg flex flex-col justify-between items-center'>
                <h2 className='text-2xl font-bold'>Payment</h2>
                <div className='w-full'>
                  {checkoutList}
                </div>
                            
                
                <div className="w-full border-b-2 border-[#282828] my-4"></div>

                <div className='self-end flex justify-end items-center'>
                  <p className='text-xl font-semibold'>Total</p>
                  <p className='ml-4 border-2 border-[#282828] font-bold bg-white py-2 px-4 rounded-md text-xl'>$<span>{totalPrice.toFixed(2)}</span></p>
                </div>
              </div>




              {/* Wizard closed show calculate price button */}
              { (portraits.length !== 0 && authUser) && 
                  <div className='w-full md:w-11/12 xl:w-3/4 mx-auto'>
                    <button onClick={() => setOpenWizard(true)} className='md:hidden rounded-xl w-full h-auto mx-auto mt-10 bg-gradient-to-r p-[4px] from-[#338cb2] to-[#43b4e4] hover:text-white  hover:bg-[#43b4e4] hover:scale-105 z-20'>
                      <div className="flex flex-col justify-between h-full bg-black rounded-lg p-4">
                        <p className='text-xl font-bold bg-gradient-to-r from-[#338cb2] to-[#43b4e4] text-transparent bg-clip-text'>Create Another Portrait</p>
                      </div>
                      
                    </button>
                    {checkoutButton}
                  </div>
              }
            </div>
          </div>
          }
        </div>
        
        
        {/* Display the portrait wizard */}
        { openWizard && 
          <PortraitCustomizer 
            selection={selection} 
            setOpenWizard={setOpenWizard} 
            setPortraits={setPortraits}
            editPortrait={editPortrait}
            setEditPortrait={setEditPortrait}
            editIndex={editIndex}
            portraits={portraits}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          /> 
        }
        
        
        { (!openWizard && portraits.length !== 0 && !authUser) && 
          <div>
            <p>Please login to continue</p>
            <Button variant="contained" color="secondary"
              onClick={() => setLogin(true)}>
              Login / Register
            </Button>
          </div>
        }
        

        {/* Prompt for login */}
        <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Dialog>

        
      </div>
      <object type="image/svg+xml" data="/images/customizer/customizer.svg" className="absolute -top-1 left-0 w-full z-0"/>
      <Footer />
    </div>
  )
}

