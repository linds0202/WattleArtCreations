
import Testimonial from "./Testimonial"

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
                // <Testimonial key={i} testimonial={testimonial}/>
                <div className="relative w-4/12 h-full flex flex-col justify-center items-center text-black p-8 mx-4">
                    <p className="text-center">&ldquo;{testimonial.body}&ldquo;</p>
                    <p className='mt-4 text-base font-bold text-right pr-10'>-{testimonial.author}</p>
                    <img src={`./drips/testimonial_${i + 1}.png`} className="absolute top-0 left-0 w-full h-full object-fill"/>
                </div>
            ))}
        </div>
  )
}

export default Testimonials