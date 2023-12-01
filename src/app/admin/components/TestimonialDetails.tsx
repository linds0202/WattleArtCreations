import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { TestimonialType } from '@/app/context/CategoriesContext';

interface TestimonialDetailsProps {
    testimonial: TestimonialType,
    openDetails: boolean,
    setOpenDetails: Function
}

const TestimonialDetails = ({ testimonial, openDetails, setOpenDetails }: TestimonialDetailsProps) => {

    const handleCancel = () => {
        setOpenDetails(false)
    }
    
    return (
        <Dialog 
        onClose={() => setOpenDetails(false)} 
        open={openDetails} 
        fullWidth={true}
        maxWidth='lg'
        PaperProps={{ sx: { p: 4, backgroundColor: "white"} }}
    >   
        <div className="flex justify-center items-center">
            
            <div className='absolute top-2 right-2 w-1/12 mb-4'>
                <IconButton onClick={() => setOpenDetails(false)} className='absolute top-2 right-2 text-white'>
                    <CloseIcon className='text-black hover:text-red-600'/>
                </IconButton>
            </div>
            
            
            <img src={testimonial.imgUrl} className="w-1/3 h-auto object-cover border border-red-600"/>
            <div className="w-2/3 ml-10 flex flex-col justify-around items-center">
                <p className="text-2xl font-bold text-center">{testimonial.category}</p>
                <div className='w-1/4 mx-auto mt-2 flex justify-around items-center'>
                    <Rating 
                        name="read-only" 
                        value={testimonial.stars} 
                        readOnly 
                        precision={0.5} 
                        emptyIcon={<StarBorderOutlinedIcon style={{ color: '#E5E5E5' }} fontSize="inherit" />}
                    />
                    <span>({testimonial.stars})</span>
                </div>
                <div className='w-10/12 mt-4'>
                    <p className='text-lg'>{testimonial.text}</p>
                    <p className='text-xl text-right font-bold'>~ {testimonial.customerDisplayName}</p>
                </div>
                
                
            </div>
        </div>
        
    </Dialog>
    );
}

export default TestimonialDetails