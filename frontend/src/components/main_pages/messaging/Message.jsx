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
    <li 
    className={
      "flex items-end my-2" + (thisUsername === message.sender ? " flex-row-reverse" : "")
    }
    >
      <img
      src="../public/Default_pfp.svg.png"
      alt="profile pic"
      className="size-8 mx-2 rounded-full">
      </img>
      <div className="w-fit max-w-sm">
        <h4 className={"text-xs mb-1" + (thisUsername === message.sender ? " text-end" : "")}>{message.sender}</h4>
        <div className={"flex text-s w-fit items-end px-3 pb-1 pt-1 rounded-xl justify-between"  + (thisUsername === message.sender ? " bg-cyan-300" : " bg-slate-200")}>
          <p className="break-all">{message.text}</p>
          <time className="pl-4 pb-0.5 text-xs">{timeSinceParser(message.timestamp)}</time>
        </div>
      </div>
    </li>
  );
};
