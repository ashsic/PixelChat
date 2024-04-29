import { Link } from "react-router-dom";
import timeSinceParser from "../../../helpers/timeSinceParser";
import { useContext } from "react";
import { LoginStatusContext } from "../../../helpers/contexts";
import { USER_CHATS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { MESSAGE_SENT } from "../../../graphql/subscriptions";
import ConversationListItemWithData from "./ConversationListItemWithData";

export default function ConversationListItem({ conv }) {
  
  const { user } = useContext(LoginStatusContext);

  const { subscribeToMore, loading, error, data } = useQuery(USER_CHATS, {
    variables: { ids: conv }
  });

  if (loading) return <p>loading...</p>
  if (error) return <p>error</p>
 
  console.log('convlistitem', data)
  console.log(conv[0])

  const { _id, name, messages } = data.userChats[0];
  //console.log(messages)

  const otherUsersNames = name.filter(n => {
    return n !== user.verifyJwt.username;
  });

  return (
    <ConversationListItemWithData 
    user={user}
    data={data.userChats[0]}
    subscribeToNewMessages={() => 
      subscribeToMore({
        document: MESSAGE_SENT,
        variables: { id: conv[0] },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.messageSent;
          console.log('func', prev, newMessage)
          return Object.assign({}, prev, {
            userChats: {
              ...prev.userChats,
              messages: [newMessage, ...prev.userChats[0].messages]
            }
          })
        }
      })}
    />
  );
};
