import { LOGOUT } from "../graphql/mutations";
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// TODO: Need to use state to store user instead of context, send state to this 
// component as props then change the props in order to re render NavBar.


export default function LogOutButton() {
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT, { onCompleted: () => navigate("/logout")});

  return (
    <div className="flex w-32">
      <i className="material-icons h-6">logout</i>
      <button
      onClick={logout}
      className="hidden h-6 ml-3 items-center lg:flex">
        Log Out
      </button>
    </div>
  );
}
