import Message from "./Message";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";

export default function Chat({ userChats }) {

  const { chatid } = useParams();
  const thisChat = userChats.filter((chat) => {
    return chat._id === chatid;
  })
  console.log(thisChat)



  return (
    <div className="flex flex-col flex-1 relative border-slate-300 border-l h-screen justify-between">
      <div className="w-full">
        <div className="border-slate-300 border-b h-16 flex items-center">
          <h3 className="text-lg font-medium pl-8">{thisChat[0].name}</h3>
        </div>
      </div>

      <ul className="flex flex-1 flex-col-reverse overflow-y-scroll scroll-smooth">
      
        {thisChat[0].messages && thisChat[0].messages.toReversed().map((message, i) => {
          return (
            <Message key={i} message={message} />
          );
        })}
      </ul>

      <div className="w-full">
        <MessageForm />
      </div>
    </div>
  );
}