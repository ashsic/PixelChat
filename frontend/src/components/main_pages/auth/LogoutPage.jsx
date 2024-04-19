import { Navigate, useNavigate } from "react-router-dom";


export default function LogoutPage() {
  const navigate = useNavigate();

  window.setTimeout(() => {
    
    navigate("/login")
  }, 3000);

  return (
    <div>
      <div>logout page</div>
      {/* <Navigate to={"/login"} /> */}
    </div>
  );
}
