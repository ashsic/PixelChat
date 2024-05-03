import { useParams } from "react-router-dom";
import ConversationListItem from "./ConversationListItem";
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

  console.log(chats)

  // const { loading, error, data } = useQuery(USER_CHATS, {
  //   variables: { ids: chats }
  // });

  // if (loading) return <p>loading...</p>
  // if (error) return <p>error</p>
  
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

  return (
    <div className="flex w-full">

      <div className="max-h-full min-h-screen flex-grow-0 w-20 md:w-96">
        <div className="w-64 md:w-96 max-h-screen fixed flex flex-col">
          <h1 className="text-2xl p-3 absolute mt-2.5 hidden md:block">Messages</h1>
          <div className="h-18 flex-row-reverse hidden md:flex pb-2 border-b border-slate-200">
            <button 
              className="mt-4 mr-5 h-11 rounded-md hover:bg-slate-200 active:bg-slate-300"
              onClick={createChat}
            >
              <i className="material-icons px-2 text-3xl">
                create
              </i>
            </button>
          </div>
          <ul className="overflow-y-auto flex-shrink overflow-x-hidden w:20 md:w-full">
          {
            (
              !chats[0]
            ) ? (
              <div>No conversations</div>
            ) : (
              chats.map((chat, i) => {
                return (
                  <ConversationListItem key={ chat._id + String(i) } conv={ chat } />
                );
              })
            )
          }
          </ul>
        </div>
      </div>

      {
        (
          !chatid
        ) ? (
          <div className="border-slate-300 border-l flex flex-1 w-full justify-center items-center">
            <h4 className="text-xl font-medium text-slate-600">Select a conversation</h4>
          </div>
        ) : (
          <Chat chatid={chatid} />
        )
      }

      <ConversationModal />

    </div>
  );
};
