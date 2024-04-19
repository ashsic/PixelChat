import { VERIFY_JWT } from "../graphql/queries";
import { useQuery } from '@apollo/client';

import { Navigate, Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ErrorPage from "../pages/ErrorPage";

function LoginCheck() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) return <div>Loading...</div>;
  if (error) return (location.pathname === "/login" ? <Login /> : <SignUp />);
  if (data) return <Navigate to={"/"} />;
  
  return <ErrorPage />
}

export default LoginCheck;
