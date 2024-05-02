import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LoginStatusContext } from "../../../helpers/contexts";
import { VERIFY_JWT } from "../../../graphql/queries";
import NavBar from "../../navbar/NavBar";
import LoadingPage from "../loading/LoadingPage";
import { CHAT_CREATED } from "../../../graphql/subscriptions";

export function AuthRouteWrapper() {

  const { subscribeToMore, loading, error, data } = useQuery(VERIFY_JWT);
  
  if (loading) return <LoadingPage />;
  if (error) return <Navigate to="/login" />;

  console.log(data)

  return (
    <LoginStatusContext.Provider 
      value={{ user:data }}
    >
      <div className="flex w-full">
        <NavBar
          subscribeToNewChats={() => 
            subscribeToMore({
              document: CHAT_CREATED,
              variables: { id: data.verifyJwt.username },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newChat = subscriptionData.data.chatCreated._id;
                console.log('chat created')
                
                return Object.assign({}, prev, {
                  verifyJwt: {
                    ...prev.verifyJwt,
                    chats: [...prev.verifyJwt.chats, newChat]
                  }
                })
              }
            })
          }
        /> 
        <Outlet />
      </div>
    </LoginStatusContext.Provider>
  );
}
