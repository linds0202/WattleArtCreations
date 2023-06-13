
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
        <div className='w-10/12 flex justify-between items-center '>
            {testimonials.map((testimonial, i) => (
                <Testimonial key={i} testimonial={testimonial}/>
            ))}
        </div>
  )
}

export default Testimonials