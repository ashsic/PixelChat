import { useContext } from "react";
import { LoginStatusContext } from "../../../helpers/contexts";
import { GET_POSTS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";

export default function Timeline() {
  const { user } = useContext(LoginStatusContext);

  const { _id, username, firstName, lastName } = user.verifyJwt;

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div>loading...</div>
  if (error) return console.error(error)

  if (data) console.log('data', data);
  
  return (
    <div>
      <h1>Timeline</h1>
      <p onClick={() => console.log('context test', _id, username)} >{ username + firstName + lastName }</p>
    </div>
  );
};
