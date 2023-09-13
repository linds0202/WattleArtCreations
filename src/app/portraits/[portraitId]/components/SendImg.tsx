import { useAuth } from "@/app/firebase/auth";
import { addChatImage } from "@/app/firebase/firestore";
import PhotoIcon from '@mui/icons-material/Photo';
import { uploadImage } from "@/app/firebase/storage";

interface SendImgProps {
    portraitId: string
}

const SendImg = ({ portraitId }: SendImgProps) => {
    
    const { authUser } = useAuth()
 

    const sendImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { uid, displayName } = authUser
        
        if (e.target.files) {
            const imageBucket = await uploadImage(e.target.files[0], portraitId)

            const chatUrls = await addChatImage(portraitId, imageBucket, displayName, uid)
        }
        
    }
//onSubmit={(event) => sendImg(event)}
    return (
        <form  className="">
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