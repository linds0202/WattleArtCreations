import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Rating, IconButton } from '@mui/material';
import { TestimonialData } from '../page';

interface FullReviewProps {
    openTestimonial: boolean,
    setOpenTestimnonial: Function,
    testimonial: TestimonialData
}

const FullReview = ({openTestimonial, setOpenTestimnonial, testimonial}: FullReviewProps ) => {
    return (
        <Dialog 
            onClose={() => setOpenTestimnonial(false)} 
            open={openTestimonial} 
            fullWidth={true}
            maxWidth='lg'
            PaperProps={{ sx: { maxHeight: '100vh', p: 6, backgroundColor: "white"} }}
        >
            <IconButton onClick={() => setOpenTestimnonial(false)} className='absolute top-2 right-2 text-white'>
                <CloseIcon className='text-black hover:text-red-600'/>
            </IconButton>
            
            <div className='h-[70vh] md:h-[80vh] flex flex-col lg:flex-row justify-bewteen items-center'
                // style={{height:'80vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                {testimonial.includeImg && <img src={testimonial.imgUrl} className='max-h-[80%] w-auto' alt='thumbnail of final image in customer review'/>}
                <div className='w-full md:p-8 flex flex-col items-center'>
                    <div className='mt-4 md:mt-0 flex items-center mb-4'>
                        <Rating name="read-only" value={testimonial.stars} readOnly precision={0.5} size="large" />
                        <span className='ml-2'>({testimonial.stars})</span>
                    </div>
                    <p className='text-xl'>{testimonial.text}</p>
                    <p className='text-2xl font-bold self-end mb-12 md:mb-0'>- {testimonial.customerDisplayName}</p>
                </div>
            </div>
                    
        </Dialog>
    )
}

export default FullReview