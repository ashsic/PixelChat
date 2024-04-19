import { VERIFY_JWT } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';

import { Navigate, Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./LoginPage";
import SignUp from "./SignUpPage";
import ErrorPage from "../error/Page";
import LoadingPage from "../loading/Page";

function LoginCheck() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) return <LoadingPage />;
  if (error) return (location.pathname === "/login" ? <Login /> : <SignUp />);
  if (data) return <Navigate to={"/"} />;
  
  return <ErrorPage />
}

export default LoginCheck;

