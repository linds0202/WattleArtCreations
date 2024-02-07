import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PortraitData } from '../portraits/components/PortraitCustomizer'
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import CharList from './CharList'
import AnimalList from './AnimalList'
import { MyCharValues } from '../portraits/components/questionaire/StepOne'
import DisplayedOptionalQuestions from './DisplayedOptionalQuestions'
import DisplayedRequiredQuestions from './DisplayedRequiredQuestions'
import ClaimForm from './ClaimForm'
import { UserData } from '../artistDashboard/[userId]/portfolio/page'
import ImgSet from './ImgSet'
import { useCategoriesContext } from '../context/CategoriesContext'

interface PortraitProps {
  portrait: PortraitData,
  user: UserData | null
}

export interface Artist {
  artistName: string,
  id: string
}

export default function Portrait({ portrait, user}: PortraitProps) {
  const { categories } = useCategoriesContext()
  const router = useRouter()

  const [openArtistDetails, setOpenArtistDetails] = useState(false)
  const [ openImgSet, setOpenImgSet] = useState(false)
  const [imgSetIndex, setImgSetIndex] = useState(0)
  const [openClaimForm, setOpenClaimForm] = useState(false)

  const [charVariations, setCharVariations] = useState(false)
  const [animals, setAnimals] = useState(false)
  const [charSheet, setCharSheet] = useState(false)
  const [weaponSheet, setWeaponSheet] = useState(false)

  useEffect(() => {
    portrait.characters.forEach((char: MyCharValues) => {
        if (char.numCharVariations > 1) setCharVariations(true)
    
        if(char.extras.includes('character')) setCharSheet(true)
    
        if(char.extras.includes('weapons')) setWeaponSheet(true)

    })

    if (portrait.animals.length > 0) setAnimals(true)


  }, [])

  const handleClaim = async () => {
    setOpenClaimForm(true)
  }

  const handleViewDetails = () => {
    setOpenArtistDetails(true)
  }

  const handleOpenImgSet = (i: number) => {
    setImgSetIndex(i)
    setOpenImgSet(true)
  }



  const showStatus = () => {
    if (user?.roles === 'Customer') {
      switch(portrait.status) {
        case 'Unpaid':
          return 'Unordered'
        case 'Unclaimed':
          return 'Awaiting Available Artist(s)'
        case 'Unassigned':
          return 'Select Artist'
        case 'In Progress':
          return 'In Progress'
        case 'Completed':
          return 'Completed'
        default:
          return ''
      }
    } else {
      switch(portrait.status) {
        case 'Unpaid':
          return 'Unordered'
        case 'Unclaimed':
          return 'No Artist Bids'
        case 'Unassigned':
          let claimed
          portrait.artist.forEach((artist: any) => {
            if(artist.id === user?.uid) claimed = true
          })
          return claimed ? 'Waiting for customer to select artist' : 'Available'
        case 'In Progress':
          return 'In Progress'
        case 'Completed':
          return 'Completed'
        default:
          return ''
      }
    }
  }

  return (
    <div className='bg-white border-2 rounded-xl border-black w-[95%] p-4 lg:p-8 m-4 text-black flex flex-row flex-wrap md:flex-nowrap justify-between items-center z-30'>
      <div className='relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[175px] lg:h-[175px] object-cover object-top rounded-xl'>
        <Image
            src={`${portrait.images.length !== 0 ? portrait.images[0].imageUrls[0] : portrait.mode === categories.cat1.type 
              ? categories.customizer.defaults.cat1DefaultImg 
              : portrait.mode === categories.cat2.type
              ? categories.customizer.defaults.cat2DefaultImg 
              : categories.customizer.defaults.cat3DefaultImg }`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt="Default Image"
            className='self-start object-top object-cover rounded-xl'
        />
      </div>


      <div className='w-[60%] bg-[#e8e8e8] rounded-lg p-2 lg:p-4 mx-2 lg:mx-0 mt-4 md:mt-0 flex flex-col'>
        <div className='bg-white rounded-lg p-2 flex flex-col md:flex-row justify-between xl:justify-start md:items-center'>
          <h4 className='w-full md:w-[60%] lg:w-[50%] lg:text-lg xl:text-2xl font-bold'>{portrait.portraitTitle.slice(0, 25)}<span className='hidden md:block text-xs lg:text-sm xl:text-base font-light text-black ml-2'>({portrait.mode})</span></h4>
          <p className='md:hidden text-xs lg:text-sm xl:text-base font-light text-black my-2'>({portrait.mode})</p>
          <h4 className='text-sm lg:text-base xl:text-lg font-semibold'>Status: <span className='text-sm lg:text-base xl:text-xl font-bold text-[#43b4e4] ml-2'>{showStatus()}</span></h4>
        </div>
        
        <div className='mt-4 flex'>
          <div className='md:w-[50%] pl-2'>
            {portrait?.status === 'Unpaid' && <p className='mb-2 font-semibold'>Created on: <span className='ml-2 text-[#2DD42B] lg:text-xl'>{new Date(portrait.creationDate.seconds * 1000).toLocaleDateString("en-US")}</span></p>}
            
            {portrait?.status !== 'Unpaid' && <p className='mb-2 font-semibold'>Ordered on: <span className='ml-2 text-[#2DD42B] text-xl'>{new Date(portrait.purchaseDate.seconds * 1000).toLocaleDateString("en-US")}</span></p>}
            

            {user?.roles === 'Artist' && <p className='mb-2 font-semibold'>Customer:<span className='ml-2 text-[#2DD42B] text-xl'>{portrait?.customer?.toUpperCase()}</span></p>}
            
            {(portrait?.status !== 'Unpaid' && portrait.paymentComplete) && 
              <p className='font-semibold'>
                {portrait.status === 'Unassigned' ? 'Pending Artist(s): ' : 'Artist: '} 
                  {portrait.artist.length  
                    ? portrait.artist.map((artist: Artist, i) => 
                      <Link 
                        key={i} 
                        href={`/artistDashboard/${artist.id}/portfolio`} 
                        className="text-[#2DD42B] hover:text-[#165f15] text-xl hover:underline ml-4"
                        rel="noopener noreferrer" 
                        target="_blank"
                      >
                          <span>{artist.artistName}</span>
                      </Link>
                    )
                    : <span className={`ml-4 ${portrait.status === 'Unclaimed' ? 'text-red-600' : ''}`}>{user?.roles === 'Artist' ? 'No bids yet' : 'No artists available yet'}</span>}
              </p>
            }
          </div>

          <div>
          {user?.roles !== 'Customer' && <p className='font-semibold'>Commission: <span className='ml-2 text-[#2DD42B] text-xl'>$ {portrait.price}</span></p>}
          </div>
          
        </div>

      </div>
      
      
      <div className='w-full md:w-[20%] lg:w-[15%] mt-4 md:mt-0 flex flex-col justify-between'>
                  
        {/* If artist & not max commissions show claim button*/}
        {(portrait.artist.filter((artist: Artist) => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
          <button onClick={handleClaim} className='w-full text-base xl:text-xl border-black border-2 rounded-xl px-4 py-2 mb-4 hover:bg-[#43b4e4] hover:text-white'>Claim</button>
        }

        {/* If not ordered - click to add to cart */}
        {user?.roles === 'Customer' && !portrait.paymentComplete && 
          <div>
            <Link href={`/portraits?selection=${portrait.mode === categories.cat1.type ? 'cat1' : portrait.mode === categories.cat2.type ? 'cat2' : 'cat3'}&portrait_id=${portrait.id}`} className="w-full"><p className='mb-4 text-base xl:text-xl text-center border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#43b4e4]'>Add to Cart</p></Link>

            <Link href={`/portraits?selection=${portrait.mode === categories.cat1.type ? 'cat1' : portrait.mode === categories.cat2.type ? 'cat2' : 'cat3'}&portrait_id=${portrait.id}&edit=true`} className="w-full"><p className='text-sm xl:text-lg text-center border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-[#43b4e4] hover:border-[#43b4e4]'>Continue Customizing</p></Link>
          </div>
        }

        {/* If payment complete - link to individual portrait page */}
        {(user?.roles === 'Customer' || user?.roles === 'Admin') && portrait.paymentComplete && <Link href={`/portraits/${portrait.id}`} className="w-full text-center text-base xl:text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#43b4e4]"><p className='text-center'>Portrait Page</p></Link>}
        
        {(user?.roles === 'Artist' || user?.roles === 'Admin') && (portrait.status === 'Unassigned' || portrait.status === 'Unclaimed') &&
          <div>
            {portrait?.reassigned && 
              <Link 
                href={`/portraits/${portrait.id}`}
                rel="noopener noreferrer" 
                target="_blank" 
                className="w-full text-base xl:text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#43b4e4]">
                  See History
              </Link>
            }

            {!portrait.reassigned && <button className='w-full text-black text-base xl:text-xl border-2 border-[#282828] rounded-xl py-2 px-4 hover:border-[#43b4e4] hover:text-[#43b4e4]' onClick={handleViewDetails}>View Details</button>
            }    
          </div>     
        }

        {/* If on artists dashboard & claimed - link to individual portrait page */}
        
        {user?.roles === 'Artist' && portrait.status === 'In Progress' && portrait.artistAssigned &&
        <Link 
          href={`/portraits/${portrait.id}`} 
          className="text-xl text-center border-2 border-[#282828] rounded-xl py-2 px-4 hover:text-white hover:bg-[#43b4e4]"
        >
          <p>Portrait Page</p>
        </Link>}

        {openClaimForm &&
          <ClaimForm
            openClaimForm={openClaimForm} 
            setOpenClaimForm={setOpenClaimForm}
            setOpenArtistDetails={setOpenArtistDetails}
            user={user}
            portrait={portrait}
          />
        }

        {openArtistDetails && 
          <Dialog 
              onClose={() => setOpenArtistDetails(false)} 
              open={openArtistDetails} 
              fullWidth={true}
              maxWidth='md'
              PaperProps={{ sx: { px: 6, py: 4, backgroundColor: "white"} }}
          >   
              <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenArtistDetails(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
              </div>
              
              <div className="flex flex-col justify-center items-center">
                <h2 className='text-3xl font-bold mt-2'>{portrait.portraitTitle} Portrait Details</h2>
                <span className='text-md text-[#959595] mb-4'>({portrait.mode})</span>
                <div className='w-full mb-4 flex justify-start items-center'>
                  <div className='w-full ml-4'>
                    <div className='flex justify-between items-center mb-8'>
                      <p className='font-semibold'>Purchase Date: <span className='text-2xl text-[#2DD42B] font-bold ml-2'>{new Date(portrait.purchaseDate.toDate()).toLocaleDateString("en-US")}</span></p>
                      <p className='font-semibold text-xl'>Commission: <span className='text-[#43b4e4]'>${portrait.price}</span></p>
                    </div>
                    <div className='w-full flex justify-between'>
                      {/* display character details */}
                      <CharList portrait={portrait} />
                      
                      <div className='w-1/2 flex flex-col'>
                          
                          <div className="relative w-full h-[100px] bg-white bg-[url('/images/customizer/bg_button.svg')] bg-bottom bg-cover p-4 text-black flex justify-end items-center border-2 border-[#282828] rounded-xl mb-2">
                              <p className="w-1/2 text-lg text-center font-semibold mr-8 mb-6 ">{portrait.bg.type === 'bgSimple' ? 'Simple' : 'Complex Background'}</p>                       
                          </div>

                          <AnimalList portrait={portrait} />
                      </div>
                        
                    </div>
                    
                    {/* <CharList portrait={portrait}/> */}
      
                  </div>
                </div>

                <div className='w-full my-4 bg-[#e8e8e8] rounded-lg p-4'>
                  <p className='text-black'>Images uploaded by customer: <span className='text-[#9e9e9e]'>(click image to enlarge)</span></p>

                  <div className='flex mt-2'>
                    {portrait?.images.length === 0
                      ? <p className='text-sm text-red-600'>(No images uploaded)</p>
                      : portrait.images.map((imgSet, i) => 
                        <div 
                          key={i} 
                          className='flex justify-center items-center bg-white rounded-lg mr-4'
                          onClick={() => handleOpenImgSet(i)}
                        >
                          {imgSet.imageUrls.map((url, i) => <img 
                            alt='customer uploaded image thumbnail'
                            className="w-[64px] h-[64px] object-contain m-2 cursor-pointer" 
                            key={i} 
                            src={url}
                          />)}
                        </div>)
                      }
                  </div>
                </div>
                {openImgSet && 
                  <ImgSet 
                    openImgSet={openImgSet} 
                    setOpenImgSet={setOpenImgSet} 
                    imgSet={portrait?.images[imgSetIndex]}
                  />
                }
                


                <p className='text-xl font-bold mt-2 text-center'>Customer Responses</p>
                
                <DisplayedRequiredQuestions portrait={portrait} />
                
                <DisplayedOptionalQuestions 
                  portrait={portrait} 
                  charVariations={charVariations}
                  animals={animals}
                  charSheet={charSheet}
                  weaponSheet={weaponSheet} 
                />
              </div>
              <div className='w-6/12 mx-auto flex justify-between items-center mt-4 py-4'>
                <button type='button' onClick={() => setOpenArtistDetails(false)} className='text-xl border-black border-2 rounded-lg px-4 py-2 w-1/4 mx-auto mt-4 hover:text-white hover:bg-[#282828]'>Close</button>

                {(portrait.artist.filter((artist: Artist) => artist.id === user?.uid).length < 1 && user?.roles === 'Artist' && user.activeCommissions < user.maxCommissions) && 
                  <button onClick={handleClaim} className='text-xl border-black border-2 rounded-lg px-4 py-2 w-1/4 mx-auto mt-4 hover:text-white hover:bg-[#43b4e4]'>Claim</button>
                }
              </div>
                
          </Dialog>}
      </div>  
    </div>
  )
}
