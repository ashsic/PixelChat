import { Link, useParams } from "react-router-dom";
import ConversationListItem from "./ConversationListItem";
import Message from "./Message";
import ConversationModal from "./ConversationModal";
import { useContext } from "react";
import { LoginStatusContext } from "../../../helpers/contexts";
import { useQuery } from '@apollo/client';
import { USER_CHATS } from "../../../graphql/queries";
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
    <div className="flex">

      <div className="max-h-full min-h-screen w-64 lg:w-96 pr-0.5">
        <div className="w-64 lg:w-96 max-h-screen fixed flex flex-col">
          <h1 className="text-2xl p-3 absolute mt-2.5">Messages</h1>
          <div className="min-h-16 flex flex-row-reverse">
            <button className="mt-4 mr-5 h-11 rounded-md hover:bg-slate-200 active:bg-slate-300"
            onClick={createChat}>
              <i className="material-icons px-2 text-3xl">
                create
              </i>
            </button>
          </div>
          <ul className="overflow-y-auto flex-shrink">
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
          <div className="border-gray-500 border-l flex justify-center items-center pl-20">
            <h4 className="text-xl font-medium text-slate-600">Select a conversation</h4>
          </div>
        ) : (
          <div className="flex flex-col flex-1 border-gray-500 border-l scroll-smooth overflow-auto">
            <div className="w-full border-slate-500 border-b">test</div>
            <ul className="flex flex-col-reverse overflow-auto">
              {data.userChats[0].messages.toReversed().map((message, i) => {
                return (
                  <Message key={i} message={message} />
                );
              })}
            </ul>
          </div>
        )}


      <ConversationModal />

    </div>
  );
};
