import { useContext } from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { LoginStatusContext } from "../../../helpers/contexts";
import { useQuery } from "@apollo/client";
import { USER_CHATS } from "../../../graphql/queries";

export default function Chat({ chatid }) {
  const { user } = useContext(LoginStatusContext);
  
  const { loading, error, data } = useQuery(USER_CHATS, {
    variables: { id: chatid }
  });

  if (loading) return <p>loading...</p>
  if (error) return <p>error</p>



  let { name, messages } = data.userChats;

  if (name) {
    name = name.filter(n => {
      return n !== user.verifyJwt.username;
    });
  }

  return (
    <div className="flex flex-col flex-1 relative border-slate-400 border-l h-screen justify-between">
      <div className="w-full">
        <div className="border-slate-200 border-b pb-1">
          <div className="h-16 flex items-center">
            <h3 className="text-lg font-medium pl-8 ">{name}</h3>
          </div>
        </div>
      </div>

      <ul className="flex flex-1 flex-col-reverse overflow-y-scroll scroll-smooth">
      
        {messages && messages.toReversed().map((message, i) => {
          return (
            <Message key={message.sender + message.timestamp + i} message={message} />
          );
        })}
      </ul>

      <div className="w-full">
        <MessageForm />
      </div>
    </div>
  );
}