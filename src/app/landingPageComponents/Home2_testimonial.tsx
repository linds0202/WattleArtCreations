import { TestimonialType } from "../context/CategoriesContext"

interface TestimonialProps {
    test: TestimonialType
}

const Home2_testimonial = ({ test }: TestimonialProps) => {
   
    return (
        <div className="w-1/3 h-full flex justify-center items-center bg-black" >
            <div 
                className="w-full h-full mx-2 text-white text-xl p-4 rounded-xl border border-[#ffffff]/25 flex flex-col justify-between items-center hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:border-[#ffffff]/50"
            >
                <img src={test.imgUrl} className="w-[250px] h-[250px] object-cover object-top rounded-xl mb-8 top-0 left-0"/>
                <p className="h-full font-light text-xl">&ldquo;{test.text.split(' ').slice(0, 30).join(' ')}{test.text.split(' ').length > 40 ? '...' : ''}&ldquo;</p>
                <p className='self-end font-semibold'>-{test.customerDisplayName}</p>
            </div>
        </div>
    )
}

export default Home2_testimonial