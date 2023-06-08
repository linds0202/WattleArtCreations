

const Testimonial = ({ testimonial }) => {
  return (
    <div className="w-3/12 border-2 border-black text-black p-4">
        <p>"{testimonial.body}"</p>
        <p className=' text-base font-bold text-right pr-10'>-{testimonial.author}</p>
    </div>
  )
}

export default Testimonial