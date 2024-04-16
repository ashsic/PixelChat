import './App.css'
import { createBrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';
import Login from './components/Login';
import Timeline from "./pages/Timeline";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';
import { gql, useLazyQuery, useReactiveVar, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
// import { isLoggedInVar } from './graphql/cache';
import SignUp from './components/SignUp';
import ErrorPage from './pages/ErrorPage';


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


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <NavBar />,
//   }
// ])


// <div className="flex justify-center flex-1">
// <Route index path="/" element={<Timeline />} />
// <Route index path="/home" element={<Timeline />} />
// <Route index path="/messages/:chatid?" element={<Messages />} />
// <Route index path="/profile/:username?" element={<Profile />} />
// </div>


function App() {
  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) console.log('loading')

  // // console.log('initial state',isLoggedIn)

  if (error) console.log('error')

  if (data) console.log('data')


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
          path="/"
          element={<NavBar />}
          errorElement={<ErrorPage />}
          props={data}
          >
            <Route errorElement={<ErrorPage />}>
              <Route index element={<Timeline />} />
              <Route path="messages/:chatid?" element={<Messages />} />
              <Route path="profile/:username?" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
};

export default App;
