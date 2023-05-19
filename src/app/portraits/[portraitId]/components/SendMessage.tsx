import {useState} from "react";
import { useAuth } from "@/app/firebase/auth";
import { addChatMessage } from "@/app/firebase/firestore";

const SendMessage = ({ scroll }) => {
    const { authUser } = useAuth()
    const [message, setMessage] = useState('')
  
    const sendMessage = async (event) => {
        event.preventDefault();
        
        //check if message is empty
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }

        const { uid, email } = authUser;
        
        await addChatMessage(message, email, uid);
        
        setMessage(""); 
        scroll.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
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