import { Form } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../../../graphql/mutations";
import { useContext } from "react";

export default function ConversationModal() {
  const [createChat, { loading, error, data }] = useMutation(CREATE_CHAT);
  const { user, changeUserData } = useContext(LoginStatusContext);
  console.log(user)

  const submitChatForm = (e) => {
    e.preventDefault();
    createChat({
      variables: {
        participants: 'test'
      }
    })

  }

  e => {
    e.preventDefault();
    login({ 
      variables: {
        email: "use1r@example.com",
        password: "test"
      }
    }).then((result) => {
      console.log(result);
      console.log('logged in === true')
    }).catch((err) => {
      console.error(err);
    });
  }




  const closeModal = () => {
    const modal = document.querySelector("#conversationModal");
    modal.style.display = "none";
  }

  return (
    <dialog id="conversationModal" 
    className="hidden fixed top-0 left-0 w-full h-full bg-black/30 border z-10 justify-center flex-col">
      <div className="mx-auto bg-slate-100 h-2/3 max-h rounded-lg max-w-xl flex flex-col">

        <div className="flex rounded-lg">
          <div className="size-14"></div>
          <div className="flex-grow flex flex-col justify-center pt-2 w-96 mx-16">
            <p className="font-bold text-lg text-center pb-2">
              New Message
            </p>
          </div>
          <div className="size-14 flex items-center justify-center">
            <button onClick={closeModal}>
              <i className="material-icons text-3xl">close</i>
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col">

          <div className="h-10 border flex align-center pl-4 pr-6">
            <label className="mt-1.5 pr-4" htmlFor="searchUser">
              To:
            </label>
            <input className="bg-slate-100 my-2 pl-2 flex-grow outline-none text-sm" type="text" placeholder="Search..." />
          </div>

          <div>
            {/* <p>search results go here</p> */}

            <Form onSubmit={submitChatForm} action="" method="POST" className="flex flex-col">

              <div>
                <label className="" htmlFor="user">
                  To:
                </label>
                <input
                className="bg-slate-100 my-2 pl-2 flex-grow outline-none text-sm"
                type="text"
                name="user"
                id="user"
                placeholder="Enter user name" />
              </div>

              <div>
                <label className="" htmlFor="message">
                  Chat Name:
                </label>
                <input
                className="bg-slate-100 my-2 pl-2 flex-grow outline-none text-sm"
                type="text"
                name="message"
                id="message"
                placeholder="Enter name" />
              </div>

              <button
              type="submit"
              className="w-32 rounded-lg py-2 bg-cyan-300">
                Submit
              </button>

            </Form>
          </div>

        </div>

        <div className="flex justify-center">
          <button
          className="m-4 border w-full rounded-lg py-3 font-medium text-lg bg-cyan-300">
            Chat
          </button>
        </div>

      </div>
    </dialog>
  );
};
