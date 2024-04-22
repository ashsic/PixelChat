import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@apollo/client";


import { LoginStatusContext } from "../../../helpers/contexts";
import { VERIFY_JWT } from "../../../graphql/queries";
import NavBar from "../../navbar/NavBar";
import LoadingPage from "../loading/LoadingPage";

export function AuthRouteWrapper() {

  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) return <LoadingPage />;
  if (error) return <Navigate to="/login" />;

  return (
    <LoginStatusContext.Provider value={{ user:data }}>
      <div className="flex w-full">
        <NavBar /> 
        <Outlet />
      </div>
    </LoginStatusContext.Provider>
  );
}
