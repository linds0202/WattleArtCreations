import {useEffect, useState} from "react";
import { useAuth } from "@/app/firebase/auth";
import EnlargedImage from "@/app/components/EnlargedImage";
import {ChatMessage} from "./ChatBox" 
import { Timestamp } from "firebase/firestore";

interface Message {
    message: ChatMessage
}

const Message = ( {message}: Message) => {
    const { authUser } = useAuth()

    const [openImage, setOpenImage] = useState(false)
    const [imgSrc, setImgSrc] = useState('')

    useEffect(() => {
        const element = document.getElementById('chatBox')
        if (element) element.scrollTop += 1000
    }, [])

    const handleEnlarge = (src: string) => {
        setImgSrc(src)
        setOpenImage(true)
    }

    return (
        <div
            className={`chat-bubble ${message.uid === authUser?.uid ? "right" : ""}`}>
            <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                {message.text !== '' && <p className="user-message">{message.text}</p>}
                {message.img && 
                    <img
                        alt='images uploaded to chat' 
                        className='w-[64px] h-[64px] object-contain cursor-pointer' 
                        src={message.img} 
                        onClick={() => handleEnlarge(message.img)}
                    />
                }

                {openImage &&
                    <EnlargedImage openImage={openImage} setOpenImage={setOpenImage} src={imgSrc} date={Timestamp.now()} final={false}/>
                }
            </div>
        </div>
    );
};

export default Message;