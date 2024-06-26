import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { LoginStatusContext } from "../../../helpers/contexts";
import { SEND_MESSAGE } from "../../../graphql/mutations";

// Message functionality

export default function MessageForm() {
  const chatid = useParams();
  const { user } = useContext(LoginStatusContext);
  const [sendMessage, { loading, error, data }] = useMutation(SEND_MESSAGE);

  let textbox;

  const handleMessageSend = (e) => {
    e.preventDefault()
    sendMessage({
      variables: {
        chat: chatid.chatid,
        sender: user.verifyJwt.username,
        text: textbox.value
      }
    })
    textbox.value = '';
  }


  return (
    <form
    className="p-4"
    onSubmit={handleMessageSend}>
      <div className=''>
        <label
        className="text-sm font-semibold w-fit hidden"
        htmlFor="message">
          Message
        </label>
      </div>      
      <input 
      id="message" 
      name="message" 
      placeholder="Message..."
      className='border-2 h-10 rounded-3xl px-2 w-full pl-4'
      ref={node => {
        textbox = node;
      }}
      />
    </form>
  );
};
