import Image from "next/image"

const Testimonials = () => {
  
    const testimonials = [
        {
            index: 0,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            author: 'Joe'
        },
        {
            index: 1,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            author: 'Alex'
        },
        {
            index: 2,
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a faucibus nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            author: 'Christie'
        },
    ]
  
    return (
        <div className='w-full h-[70vh] flex justify-between items-center'>
            {testimonials.map((testimonial, i) => (
                <div key={i} className="relative w-4/12 h-full flex flex-col justify-center items-center text-black px-12 py-8 mx-4">
                    <p className="text-center">&ldquo;{testimonial.body}&ldquo;</p>
                    <p className='mt-4 text-base font-bold text-right pr-10'>-{testimonial.author}</p>
                    <div className="absolute top-0 left-0  w-full h-full">
                        <div className='relative w-[100%] h-[100%] object-cover'>
                            <Image 
                            src={`/images/drips/testimonial_${i + 1}.png`} 
                            alt="small Wattle Art Creations logo" 
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            priority={true}  
                            />
                        </div>
                    </div>
                    {/* <img src={`./images/drips/testimonial_${i + 1}.png`} className="absolute top-0 left-0 w-full h-full object-fill" alt='testimonial black paint drip frame'/> */}
                </div>
            ))}
        </div>
  )
}

export default Testimonials