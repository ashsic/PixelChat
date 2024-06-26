import { Link } from "react-router-dom";
import timeSinceParser from "../../../helpers/timeSinceParser";
import { useEffect } from "react";

export default function ConversationListItemWithData({ subscribeToNewMessages, data, user }) {

  const { _id, name, messages } = data;

  const otherUsersNames = name.filter(n => {
    return n !== user.verifyJwt.username;
  });

  useEffect(() => subscribeToNewMessages(), []);

  return (
    <li 
    className="hover:bg-slate-50 pl-1 w-20 md:w-full border-slate-100 border-b">
      <Link to={"/messages/" + _id} className="flex items-center">
        <img
        src="../public/Default_pfp.svg.png"
        alt="profile pic"
        className="size-14 m-2 rounded-full">
        </img>
        <div className="hidden md:block">
          <h4 className="mb-1 overflow-ellipsis w-fit">{otherUsersNames}</h4>
          <div className="flex text-xs">
            <div className="flex">
              {
                (
                  messages.length > 0
                ) ? (
                  <>
                    <p>{messages[messages.length - 1].sender + ":"}</p>
                    <p className="ml-1 max-w-24 truncate">{messages[messages.length - 1].text}</p>
                  </>
                ) : (
                  "Send the first message!"
                )
              }
            </div>
            <time className="pl-4">
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
}
