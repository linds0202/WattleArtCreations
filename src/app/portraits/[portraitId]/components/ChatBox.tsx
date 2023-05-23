import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./sendMessage";
import { getChats } from "@/app/firebase/firestore";

const ChatBox = () => {
    const scroll = useRef();
    
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const foo = async () => {
            const unsubscribe = await getChats(setMessages);
            
            return () => unsubscribe();
        }
        foo()
    }, [])


  
    return (
      <main className="w-full relative">
        <div className="messages-wrapper">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll} />
      </main>
    );
  };
  export default ChatBox;