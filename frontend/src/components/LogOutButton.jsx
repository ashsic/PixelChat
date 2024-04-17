import { LOGOUT } from "../graphql/mutations";
import { VERIFY_JWT } from "../graphql/queries";
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginStatusContext } from "../helpers/contexts";

// TODO: Need to use state to store user instead of context, send state to this 
// component as props then change the props in order to re render NavBar.


export default function LogOutButton() {
  const { user, changeUserData } = useContext(LoginStatusContext);
  console.log('logoutbutton', user)
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [VERIFY_JWT],
    onCompleted: () => {
      changeUserData(null);
      user.props.setIsLoggedIn(false);
      user.props.logoutFunc();
      navigate("/logout");
    } 
  });  // navigate("/logout")});

  return (
    <div className="flex w-32" onClick={logout}>
      <i className="material-icons h-6">logout</i>
      <button
      
      className="hidden h-6 ml-3 items-center lg:flex">
        Log Out
      </button>
    </div>
  );
}
