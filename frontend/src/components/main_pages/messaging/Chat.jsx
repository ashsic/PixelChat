import { useContext } from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";
import { LoginStatusContext } from "../../../helpers/contexts";

export default function Chat({ userChats }) {
  const { user } = useContext(LoginStatusContext);
  const { chatid } = useParams();

  const thisChat = userChats.filter((chat) => {
    return chat._id === chatid;
  })

  let { name, messages } = thisChat[0];

  if (name) {
    name = name.filter(n => {
      return n !== user.verifyJwt.username;
    });
  }

  return (
    <div className="flex flex-col flex-1 relative border-slate-300 border-l h-screen justify-between">
      <div className="w-full">
        <div className="border-slate-300 border-b h-16 flex items-center">
          <h3 className="text-lg font-medium pl-8">{name}</h3>
        </div>
      </div>

      <ul className="flex flex-1 flex-col-reverse overflow-y-scroll scroll-smooth">
      
        {messages && messages.toReversed().map((message, i) => {
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