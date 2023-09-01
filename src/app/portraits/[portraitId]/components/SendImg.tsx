import { useAuth } from "@/app/firebase/auth";
import { addChatImage } from "@/app/firebase/firestore";
import PhotoIcon from '@mui/icons-material/Photo';
import { uploadImage } from "@/app/firebase/storage";

const SendImg = ({ portraitId }) => {
    
    const { authUser } = useAuth()
 

    const sendImg = async (e) => {
        e.preventDefault();

        const { uid, displayName } = authUser
        
        const imageBucket = await uploadImage(e.target.files[0], portraitId)

        const chatUrls = await addChatImage(portraitId, imageBucket, displayName, uid)
    }

    return (
        <form onSubmit={(event) => sendImg(event)} className="">
            <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => sendImg(e)}
            />
            <label htmlFor="file" className="flex justify-start items-center mr-2">
                <PhotoIcon fontSize="large" className="text-white cursor-pointer hover:text-[#0075FF] z-10"/>
            </label>
        </form>
    );
};

export default SendImg;