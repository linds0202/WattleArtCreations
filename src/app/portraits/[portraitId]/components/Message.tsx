import React, {useEffect} from "react";
import { useAuth } from "@/app/firebase/auth";

interface Message {
    message: {
        portraitId: string,
        name: string,
        text: string,
        uid: string,
        img: string
    }
}

const Message = ( {message}: Message) => {
    const { authUser } = useAuth()

    useEffect(() => {
        const element = document.getElementById('chatBox')
        element.scrollTop += 1000
    }, [])

    return (
        <div
            className={`chat-bubble ${message.uid === authUser?.uid ? "right" : ""}`}>
            <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                {message.text !== '' && <p className="user-message">{message.text}</p>}
                {message.img && <img className='w-[64px] h-[64px]' src={message.img} />}
            </div>
        </div>
    );
};

export default Message;