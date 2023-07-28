import React, {useEffect} from "react";
import { useAuth } from "@/app/firebase/auth";

interface Message {
    message: {
        portraitId: String,
        name: String,
        text: String,
        uid: String
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
                <p className="user-message">{message.text}</p>
            </div>
        </div>
    );
};

export default Message;