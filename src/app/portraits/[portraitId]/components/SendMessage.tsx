import {useState} from "react";
import { useAuth } from "@/app/firebase/auth";
import { addChatMessage, addChatImage } from "@/app/firebase/firestore";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { uploadImage } from "@/app/firebase/storage";

const SendMessage = ({ portraitId }) => {
    
    const { authUser } = useAuth()
    
    const [message, setMessage] = useState('')
    const [img, setImg] = useState(null);
  
    const sendMessage = async (event) => {
        event.preventDefault();
        
        //check if message is empty
        if (message.trim() === "" && !img) {
          alert("Enter valid message")
          return
        }

        const { uid, displayName } = authUser
        
        if (img) {
            const imageBucket = await uploadImage(img, portraitId)

            const chatUrls = await addChatImage(portraitId, imageBucket, message, displayName, uid)
          } else {
            await addChatMessage(portraitId, message, displayName, uid)
          }
        
        setMessage("")
        setImg(null)
    }

    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
            <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file" className="flex justify-center items-center mr-2">
                <PhotoCameraIcon fontSize="large" className={`${img ? "text-[#2DD42B]" : "text-white"} cursor-pointer hover:text-[#0075FF]`}/>
            </label>

            <label htmlFor="messageInput" hidden>
                Enter Message
            </label>
            <input
                id="messageInput"
                name="messageInput"
                type="text"
                className="form-input__input"
                placeholder="type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">Send</button>
        </form>
    );
};

export default SendMessage;