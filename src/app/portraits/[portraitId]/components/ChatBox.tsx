import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { getChats } from "@/app/firebase/firestore";
import SendImg from "./SendImg";
import { Timestamp } from "firebase/firestore";

interface ChatBoxProps {
  portraitId: string
}

export interface ChatMessage {
  createdAt: Timestamp,
  name: string,
  portraitId: string,
  text: string,
  img: string,
  uid: string,
  id: string
}

const ChatBox = ({ portraitId }: ChatBoxProps) => {
    const scroll = useRef<HTMLInputElement>(null);
    
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);
    
    useEffect(() => {
        const getMessages = async () => {
            const unsubscribe = await getChats(setMessages, portraitId);
            
            return () => unsubscribe()
        }
        getMessages()
    }, [])

   console.log('messages in chatbox is: ', messages)
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