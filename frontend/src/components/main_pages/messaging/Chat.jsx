import Message from "./Message";
import { useParams } from "react-router-dom";

export default function Chat(props) {
  const { chatid } = useParams();

  console.log(chatid, props.userChats)



  // if (true) return <div>error</div>

  const messages = props.userChats.filter((conv) => {
    return conv._id === chatid;
  })

  return <div>test</div>

  return (
    <div className="flex flex-1 border-gray-500 border-l scroll-smooth overflow-auto">
      <p>{chatid ?? "Select a conversation!"}</p>
      {chatid && data.userChats.messages && <ul className="flex flex-col-reverse overflow-auto">
        {messages.toReversed().map((message, i) => {
          return (
            <Message key={i} message={message} />
          );
        })}
      </ul>}
    </div>
  );
}