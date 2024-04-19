import timeSinceParser from "../../../helpers/timeSinceParser";

export default function Message(props) {
  const { message } = props;

  return (
    <li className="flex w-full items-center">
      <img
      src="../public/Default_pfp.svg.png"
      alt="profile pic"
      className="w-14 h-14 m-2 rounded-full">
      </img>
      <div className="w-full">
        <h4 className="mb-1">{message.sender}</h4>
        <div className="flex text-xs w-full">
          <p className="">{message.sender + ": " + message.text}</p>
          <time className="pl-6">{timeSinceParser(message.timestamp)}</time>
        </div>
      </div>
    </li>
  );
};
