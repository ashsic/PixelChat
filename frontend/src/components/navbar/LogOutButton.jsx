import { LOGOUT } from "../../graphql/mutations";
import { useMutation } from '@apollo/client';
import { useContext } from "react";
import { LoginStatusContext } from "../../helpers/contexts";
import { NavLink } from "react-router-dom";

export default function LogOutButton() {
  const { user, changeUserData } = useContext(LoginStatusContext);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      window.location.reload()
    } 
  }); 

  return (
    <NavLink to="/" className="w-12 lg:w-full h-full p-3" onClick={logout}>
      <div className="flex w-32" >
        <i className="material-icons h-6">logout</i>
        <button
        
        className="hidden h-6 ml-3 items-center lg:flex">
          Log Out
        </button>
      </div>
    </NavLink>
  );
}
