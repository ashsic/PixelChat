import { useContext } from "react";
import { LoginStatusContext } from "../helpers/contexts";

export default function Timeline() {
  const { user, changeUserData } = useContext(LoginStatusContext);
  const { _id, username, firstName, lastName } = user.props.data.verifyJwt;

  return (
    <div>
      <h1>Timeline</h1>
      <p onClick={() => console.log('context test', _id, username)} >{ username + firstName + lastName }</p>
    </div>
  );
};
