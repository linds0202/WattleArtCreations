
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
        <div className={`relative w-[100%] h-[70vh] md:h-[50vh] lg:h-[60vh] xl:h-[50vh] pt-[5%] pb-12 bg-gradient-to-b from-black from-65% md:from-45% lg:from-20% xl:from-55% via-[#282828]  via-70% md:via-50% lg:via-25% xl:via-60% to-black to-75% md:to-55% lg:to-30% xl:to-65% overflow-clip`}>
        
            <object type="image/svg+xml" data="/images/footer_drips_dark.svg" className="absolute bottom-[10%] lg:bottom-[40%] xl:bottom-[10%] left-[20%] xl:left-[15%] w-[60%] xl:w-[70%] h-[35%] md:h-[100%] object-contain -z-1"/>

            <object type="image/svg+xml" data="/images/footer_mt2.svg" className="absolute bottom-0 lg:bottom-[25%] xl:-bottom-2 left-0 w-[100%] h-[30%] md:h-[100%] object-contain object-bottom -z-1"/>

            {/* {(currentUrl === '/' || currentUrl === '/corporate')  */}
            <div className='w-full z-30'>
                
                <div className='w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mb-4 flex flex-col md:flex-row md:justify-between items-center z-40'>
                    <Link 
                        href={{
                            pathname: '/',
                            query: {selection: 'Home'},
                            }} 
                        className='flex justify-between items-center no-underline z-50'
                    >
                        <div className='w-11/12 mx-auto xl:w-10/12 flex items-center'>
                            <div className='w-[128px] h-auto'>
                                <img src={'/images/Logo_Circle.png'} alt={'logo'} />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-2xl mb-0 text-white no-underline'>Wattle Art Creations</p>
                                <p style={{fontSize : 10}} className='text-white'>Copyright &#169; {new Date().getFullYear()}</p>
                            </div>
                            
                        </div>
                    </Link>

                    <div className='text-white w-1/2 md:w-1/4 my-4 md:my-0 text-center md:text-left flex flex-col justify-center z-40'>
                        <p className='text-xl font-bold mb-[4px] hover:underline hover:cursor-pointer z-50'>Contact</p>
                        <p className='text-lg font-semibold mb-[4px]  hover:underline hover:cursor-pointer z-50'>Terms of Service</p>
                        <p className='text-lg font-semibold hover:underline hover:cursor-pointer z-50'>FAQ</p>
                    </div>
                    
                    <div className='text-white w-1/2 md:w-1/4 text-center md:text-left flex flex-col justify-center z-50'>
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
            {/* <object type="image/svg+xml" data="/images/footer_mt2.svg" className="absolute bottom-0 lg:bottom-[25%] xl:-bottom-2 md:left-0 w-[100%] h-[25%] object-fill md:object-contain object-bottom -z-1 border border-yellow-600"/> */}
             
        </div>
    )
}