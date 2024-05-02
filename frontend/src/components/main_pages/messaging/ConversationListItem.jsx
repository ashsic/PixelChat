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
    variables: { id: conv }
  });

  if (loading) return <p>loading...</p>
  if (error) {
    return <p>error</p>
  } 

  return (
    <ConversationListItemWithData 
    user={user}
    data={data.userChats}
    subscribeToNewMessages={() => 
      subscribeToMore({
        document: MESSAGE_SENT,
        variables: { id: conv },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.messageSent;
          return Object.assign({}, prev, {
            userChats: {
              ...prev.userChats,
              messages: [...prev.userChats.messages, newMessage]
            }
          })
        }
      })}
    />
  );
};
