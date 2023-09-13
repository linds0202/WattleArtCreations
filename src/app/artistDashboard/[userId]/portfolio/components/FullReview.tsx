import { Dialog, DialogContent } from '@mui/material';
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
            
            <DialogContent
                style={{height:'80vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                {testimonial.includeImg && <img src={testimonial.imgUrl} className='max-h-[80%] w-auto' alt='thumbnail of final image in customer review'/>}
                <div className='p-8 flex flex-col items-center'>
                    <div className='flex items-center mb-4'>
                        <Rating name="read-only" value={testimonial.stars} readOnly precision={0.5} size="large" />
                        <span className='ml-2'>({testimonial.stars})</span>
                    </div>
                    <p>{testimonial.text}</p>
                    <p className='self-end'>- {testimonial.customerDisplayName}</p>
                </div>
            </DialogContent>
                    
                </Dialog>
    )
}

export default FullReview