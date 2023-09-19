import {useState} from "react";
import { useAuth } from "@/app/firebase/auth";
import { addChatMessage } from "@/app/firebase/firestore";

interface SendMessageProps {
    portraitId: string
}

const SendMessage = ({ portraitId }: SendMessageProps) => {
    
    const { authUser } = useAuth()
    
    const [message, setMessage] = useState('')

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        //check if message is empty
        if (message.trim() === "") {
          alert("Enter valid message")
          return
        }

        const { uid, displayName } = authUser
        
        await addChatMessage(portraitId, message, displayName, uid)

        setMessage("")
    }

    return (
        <form className="send-mesg" onSubmit={(event) => sendMessage(event)}> 

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

            <button type="submit" className="submit-button">Send</button>
        </form>
    );
};

export default SendMessage;