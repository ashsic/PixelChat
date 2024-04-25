import { Link } from "react-router-dom";
import timeSinceParser from "../../../helpers/timeSinceParser";
import { useContext } from "react";
import { LoginStatusContext } from "../../../helpers/contexts";

export default function ConversationListItem({ conv }) {
  const { _id, participants, name, messages } = conv;
  const { user } = useContext(LoginStatusContext);
 
  console.log(messages)

  const otherUsersNames = name.filter(n => {
    return n !== user.verifyJwt.username;
  });

  return (
    <li className="hover:bg-slate-50 pl-1 w-20 md:w-full">
      <Link to={"/messages/" + _id} className="flex  items-center">
        <img
        src="../public/Default_pfp.svg.png"
        alt="profile pic"
        className="w-14 h-14 m-2 rounded-full">
        </img>
        <div className="w-full hidden md:block">
          <h4 className="mb-1 overflow-ellipsis w-fit">{otherUsersNames}</h4>
          <div className="flex text-xs w-full">
            <p className=" truncate">
              {
                (
                  messages.length > 0
                ) ? (
                  messages[messages.length - 1].sender + ": " +  messages[messages.length - 1].text
                ) : (
                  "Send the first message!"
                )
              }
            </p>
            <time className="pl-6">
              {
                (
                  messages.length > 0
                ) ? (
                  timeSinceParser(messages[messages.length - 1].timestamp)
                ) : (
                  ""
                )
              }
            </time>
            {/* <time className="pl-6">{timeSinceParser(conv.messages[0].timestamp)}</time> */}
          </div>
        </div>
      </Link>
    </li>
  );
};
