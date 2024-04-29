import { VERIFY_JWT } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { Navigate, useLocation } from "react-router-dom";

import Login from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ErrorPage from "../error/ErrorPage";
import LoadingPage from "../loading/LoadingPage";

export default function LoginCheck() {
  const location = useLocation();
  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) return <LoadingPage />;
  if (error) return (location.pathname === "/login" ? <Login /> : <SignUpPage />);
  if (data) return <Navigate to={"/"} />;
  
  return <ErrorPage />
}
