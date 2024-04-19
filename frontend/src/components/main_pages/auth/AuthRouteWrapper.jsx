import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import { VERIFY_JWT } from "../../../graphql/queries";
import NavBar from "../../navbar/NavBar";
import LoadingPage from "../loading/Page";

export function AuthRouteWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const { loading, error, data, refetch } = useQuery(VERIFY_JWT);

  const logoutFunc = () => {
    refetch();
  }

  // if (loading) return <div>Loading...</div>; // eventually make loading screen to return here
  // if (error) return <Navigate to="/login" />;
  if (loading) return <LoadingPage />;
  if (error) return <Navigate to="/login" />;

  return (
    <NavBar props={ { data, setIsLoggedIn, logoutFunc } } />
  );
}
