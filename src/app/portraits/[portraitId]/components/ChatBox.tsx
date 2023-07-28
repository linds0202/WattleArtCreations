import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { getChats } from "@/app/firebase/firestore";

const ChatBox = ({ portraitId }) => {
    const scroll = useRef();
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const foo = async () => {
            const unsubscribe = await getChats(setMessages, portraitId);
            
            return () => unsubscribe();
        }
        foo()
    }, [])

   
    return (
      <main className="w-full relative">
        <div className="messages-wrapper" id="chatBox">
          {messages?.map((message) => (
            <Message key={message.id}  message={message} />
          ))}
        </div>
        <span ref={scroll}></span>
        <SendMessage portraitId={portraitId} />
      </main>
    );
  };
  export default ChatBox;