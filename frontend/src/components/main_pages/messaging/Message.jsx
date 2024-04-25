import { useContext } from "react";
import timeSinceParser from "../../../helpers/timeSinceParser";
import { LoginStatusContext } from "../../../helpers/contexts";

export default function Message(props) {
  const { message } = props;
  const { user } = useContext(LoginStatusContext);

  const thisUsername = user.verifyJwt.username;
  console.log(thisUsername)

  console.log(message)

  return (
    <li className={"flex w-full items-center" + (thisUsername === message.sender ? " flex-row-reverse" : "")}
    >
      <img
      src="../public/Default_pfp.svg.png"
      alt="profile pic"
      className="w-14 h-14 m-2 rounded-full">
      </img>
      <div className="w-fit">
        <h4 className="text-xs mb-1 w-fit">{message.sender}</h4>
        <div className={"flex text-s w-full items-center px-3 py-1 rounded-xl"  + (thisUsername === message.sender ? " bg-cyan-300" : " bg-slate-200")}>
          <p className="">{message.text}</p>
          <time className="pl-6 text-xs">{timeSinceParser(message.timestamp)}</time>
        </div>
      </div>
    </li>
  );
};
