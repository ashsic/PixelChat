import { Link } from "react-router-dom";
import timeSinceParser from "../helpers/timeSinceParser";

export default function Conversation(props) {
  const { conv } = props;

  return (
    <li className="hover:bg-slate-50 pl-2">
      <Link to={"/messages/" + conv.id} className="flex w-full items-center">
        <img
        src="../public/Default_pfp.svg.png"
        alt="profile pic"
        className="w-14 h-14 m-2 rounded-full">
        </img>
        <div className="w-full">
          <h4 className="mb-1">{conv.members[0]}</h4>
          <div className="flex text-xs w-full">
            <p className="">{conv.members[0] + ": " + conv.messages[0].text}</p>
            <time className="pl-6">{timeSinceParser(conv.messages[0].timestamp)}</time>
          </div>
        </div>
      </Link>
    </li>
  );
};
