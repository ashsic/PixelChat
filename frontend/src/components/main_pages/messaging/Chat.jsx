import Message from "./Message";
import MessageForm from "./MessageForm";
import { useParams } from "react-router-dom";

export default function Chat(props) {
  const { chatid } = useParams();
  console.log(props.props)
  const thisChat = props.props.userChats.filter((chat) => {
    return chat._id === chatid;
  })
  console.log(thisChat)



  // if (true) return <div>error</div>

  // const messages = props.userChats.filter((conv) => {
  //   return conv._id === chatid;
  // })

  // return <div>test</div>

  return (
    <div className="flex flex-col flex-1 relative border-slate-300 border-l scroll-smooth overflow-auto">
      <div className="w-full">
        <div className="border-slate-300 border-b py-4">
          <h3 className="text-lg font-medium pl-8">{thisChat[0].name + "test"}</h3>
        </div>
      </div>

      <ul className="flex flex-col-reverse overflow-auto">
        {thisChat[0].messages && thisChat[0].messages.toReversed().map((message, i) => {
          return (
            <Message key={i} message={message} />
          );
        })}
      </ul>

      <div className="absolute w-full bottom-0 right-0">
        <MessageForm />
      </div>
    </div>
  );
}