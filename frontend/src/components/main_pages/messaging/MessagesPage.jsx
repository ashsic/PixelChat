import { Link, useParams } from "react-router-dom";
import ConversationListItem from "./ConversationListItem";
import Message from "./Message";
import ConversationModal from "./ConversationModal";
import { useContext } from "react";
import { LoginStatusContext } from "../../../helpers/contexts";
import { useQuery } from '@apollo/client';
import { USER_CHATS } from "../../../graphql/queries";
import MessageForm from "./MessageForm";
import Chat from "./Chat";


export default function Messages() {
  const { chatid } = useParams();
  const { user } = useContext(LoginStatusContext);
  const { _id, chats } = user.verifyJwt;
  const { loading, error, data } = useQuery(USER_CHATS, {
    variables: { ids: chats }
  });

  if (loading) return <p>loading...</p>
  if (error) return <p>error</p>
  

  // Modal functions

  window.onclick = (event) => {
    const modal = document.querySelector("#conversationModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 

  const createChat = () => {
    const modal = document.querySelector("#conversationModal");
    modal.style.display = "flex";
  }
  console.log(data)

  return (
    <div className="flex w-full">

      <div className="max-h-full min-h-screen flex-grow-0 w-20 md:w-96">
        <div className="w-64 md:w-96 max-h-screen fixed flex flex-col">
          <h1 className="text-2xl p-3 absolute mt-2.5 hidden md:block">Messages</h1>
          <div className="min-h-16 flex-row-reverse hidden md:flex mb-2">
            <button className="mt-4 mr-5 h-11 rounded-md hover:bg-slate-200 active:bg-slate-300"
            onClick={createChat}>
              <i className="material-icons px-2 text-3xl">
                create
              </i>
            </button>
          </div>
          <ul className="overflow-y-auto flex-shrink overflow-x-hidden">
          {
          !data.userChats[0] ? <div>No conversations</div> :
            data.userChats.map((conv) => {
              return (
                <ConversationListItem key={conv._id} conv={conv} />
              );
            })
          }
          </ul>
        </div>
      </div>

      

    
      {!chatid ? (
        <div className="border-gray-500 border-l flex flex-1 w-full justify-center items-center">
          <h4 className="text-xl font-medium text-slate-600">Select a conversation</h4>
        </div>
      ) : (
        <Chat userChats={data.userChats} />
        // <div className="flex flex-col flex-1 relative border-slate-300 border-l scroll-smooth overflow-auto">
        //   <div className="w-full">
        //     <div className="border-slate-300 border-b py-4">
        //       <h3 className="text-lg font-medium pl-8">{data.userChats[0].name}</h3>
        //     </div>
        //   </div>

        //   <ul className="flex flex-col-reverse overflow-auto">
        //     {data.userChats[0].messages.toReversed().map((message, i) => {
        //       return (
        //         <Message key={i} message={message} />
        //       );
        //     })}
        //   </ul>

        //   <div className="absolute w-full bottom-0 right-0">
        //     <MessageForm />
        //   </div>
        // </div>
      )}


      <ConversationModal />

    </div>
  );
};
