import React from "react";
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