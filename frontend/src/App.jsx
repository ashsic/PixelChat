import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';
import Login from './components/Login';
import Timeline from "./pages/Timeline";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';


const VERIFY_JWT = gql`
  query {
  verifyJwt{
    username
  }
}
`;

function VerifyLogin() {
  const { loading, error, data } = useQuery(VERIFY_JWT);
  if (loading) return 'loading...';
  if (error) return <div>error: {error.message}</div>;
  console.log('data',data)
  return (
    <div>success!</div>
  )
}



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  




  // const testfunc = useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) return false;
    
  //   verifyJwtFunc({ variables: { token: token } });
  
  //   return () => {};
  // }, [verifyJwtFunc]);

  // useEffect(() => {
  //   console.log('data', data)
  //   // If data contains user info, user is logged in
  //   if (data && data.verifyJwtFunc) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [data]);

  console.log(isLoggedIn)

  return (
    <>
      <Router>
        <NavBar />
        <div className="flex justify-center flex-1">
          <VerifyLogin />
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route index path="/home" element={<Timeline />} />
            <Route index path="/messages/:chatid?" element={<Messages />} />
            <Route index path="/profile/:username?" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  )
};

export default App;
