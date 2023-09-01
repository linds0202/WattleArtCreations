import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { getChats } from "@/app/firebase/firestore";
import SendImg from "./SendImg";

const ChatBox = ({ portraitId }) => {
    const scroll = useRef();
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const getMessages = async () => {
            const unsubscribe = await getChats(setMessages, portraitId);
            
            return () => unsubscribe()
        }
        getMessages()
    }, [])

   
    return (
      <main className="w-full relative">
        <div className="messages-wrapper scrollbar-hide" id="chatBox">
          {messages?.map((message) => (
            <Message key={message.id}  message={message} />
          ))}
        </div>
        <span ref={scroll}></span>
        <div className="send-message-container">
          <SendImg portraitId={portraitId} />
          <SendMessage portraitId={portraitId} />
        </div>
        
      </main>
    );
  };
  export default ChatBox;