
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link'
import Image from 'next/image';
import Logo from '../../../public/images/Logo_Circle.png'
import CorpLogo from '../../../public/images/corporate.png'
import PersonalLogo from '../../../public/images/HIWIcons/artwork2.png'

export default function Footer(){
    const currentUrl = usePathname()
    // footer add into classes on line 16
    return (
        <div className={`relative w-[100%] h-[50vh] pt-[5%] bg-gradient-to-b from-black from-55% via-[#282828] via-60% to-black to-65% overflow-clip `}>
        
            <object type="image/svg+xml" data="/images/footer_drips_dark.svg" className="absolute bottom-[10%] left-[15%] w-[70%] h-auto -z-1"></object>
            <object type="image/svg+xml" data="/images/footer_mt2.svg" className="absolute bottom-0 left-0 w-[100%] h-auto -z-1"></object>

            {/* {(currentUrl === '/' || currentUrl === '/corporate')  */}
            <div className='w-full z-30'>
                
                <div className='w-1/2 mx-auto flex justify-between z-40'>
                    <Link 
                        href={{
                            pathname: '/',
                            query: {selection: 'Home'},
                            }} 
                        className='flex justify-between items-center no-underline z-50'
                    >
                        <div className='w-10/12 flex items-center'>
                            <div className='w-[128px] h-auto'>
                                <img src={'/images/Logo_Circle.png'} alt={'logo'} />
                                {/* <Image 
                                    src={Logo} 
                                    alt="small Wattle Art Creations logo"
                                    fill
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    priority={true}  
                                /> */}
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-2xl mb-0 text-white no-underline'>Wattle Art Creations</p>
                                <p style={{fontSize : 10}} className='text-white'>Copyright &#169; {new Date().getFullYear()}</p>
                            </div>
                            
                        </div>
                    </Link>

                    <div className='text-white w-1/4 flex flex-col justify-center z-40'>
                        <p className='text-xl font-bold mb-[4px] hover:underline hover:cursor-pointer z-50'>Contact</p>
                        <p className='text-lg font-semibold mb-[4px]  hover:underline hover:cursor-pointer z-50'>Terms of Service</p>
                        <p className='text-lg font-semibold hover:underline hover:cursor-pointer z-50'>FAQ</p>
                    </div>
                    
                    <div className='text-white w-1/4 flex flex-col justify-center z-50'>
                        <p className='mb-0 text-xl'>Follow us:</p>
                        <div className='flex mt-2'>
                            <SocialIcon url="https://www.instagram.com/wattleartcreations/" target="_blank" fgColor={'#FFFFFF'} style={{width: '50px', height: '50px', marginRight: 15}} className='hover:scale-125 transition ease-in-out duration-300'/>
                            <SocialIcon url="https://www.behance.net/wattleartcreations?tracking_source=search_projects" target="_blank" fgColor={'#FFFFFF'} style={{width: '50px', height: '50px', marginRight: 15}} className='hover:scale-125 transition ease-in-out duration-300'/>
                            <div className='hover:scale-125 transition ease-in-out duration-300'>
                                {currentUrl !== '/corporate' && 
                                <Link href={'/corporate'} className='hover:scale-125 transition ease-in-out duration-300'>
                                    <div className='relative w-[50px] h-[50px] object-cover'>
                                        <Image 
                                            className='w-full h-auto rounded-lg mx-auto'
                                            src={CorpLogo} 
                                            alt="corporate art orders icon" 
                                            fill
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            priority={true}  
                                        />
                                    </div>
                                    {/* <img className='w-[25px] h-[25px]' src='./corporate.png' alt='Corporate Art Orders' title='Corporate Art Orders' /> */}
                                </Link>
                                }
                                {currentUrl === '/corporate' && 
                                <Link href={'/'} className=''>
                                    <div className='relative w-[25px] h-[25px] object-cover'>
                                        <Image 
                                            className='w-full h-auto rounded-lg mx-auto '
                                            src={PersonalLogo} 
                                            alt="personal art orders icon" 
                                            fill
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            priority={true}  
                                        />
                                    </div>
                                </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             
        </div>
    )
}