import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';
import Login from './components/Login';
import Timeline from "./pages/Timeline";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';
import { gql, useLazyQuery, useReactiveVar, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { isLoggedInVar } from './graphql/cache';


const VERIFY_JWT = gql`
  query {
  verifyJwt{
    _id
    username
    firstName
    dob
    bio
    picture
    chats
    posts
    followers
    following
  }
}
`;

function VerifyLogin() {
  const { loading, error, data } = useQuery(VERIFY_JWT);
  if (loading) return 'loading...';
  if (error) return <div>error: {error.message}</div>;
  console.log('data',data)
  return (
    <div>
      success!
    </div>
  )
}



function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

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
