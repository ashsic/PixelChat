import { Link } from "react-router-dom";
import timeSinceParser from "../../../helpers/timeSinceParser";

export default function ConversationListItem({ conv }) {
  const { _id, participants, name, messages } = conv;

  return (
    <li className="hover:bg-slate-50 pl-2">
      <Link to={"/messages/" + _id} className="flex w-full items-center">
        <img
        src="../public/Default_pfp.svg.png"
        alt="profile pic"
        className="w-14 h-14 m-2 rounded-full">
        </img>
        <div className="w-full">
          <h4 className="mb-1">{name}</h4>
          <div className="flex text-xs w-full">
            <p className="">{participants[0] + ": " + messages.length > 0 ? messages[0].text : ""}</p>
            <time className="pl-6">{timeSinceParser(Date.now())}</time>
            {/* <time className="pl-6">{timeSinceParser(conv.messages[0].timestamp)}</time> */}
          </div>
        </div>
      </Link>
    </li>
  );
};
