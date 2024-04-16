import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import NavBar from './components/NavBar.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Messages from './pages/MessagesPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Timeline from './pages/Timeline.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import { useContext } from 'react';
import LoginCheck from './components/LoginCheck.jsx';

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

const router = createBrowserRouter([
  {
    path: "/login/*",
    element: <LoginCheck/>,
  },
  {
    path: "/signup",
    element: <LoginCheck/>,
  },
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Timeline /> },
      {
        path: "messages/:chatid?",
        element: <Messages />,
      },
      {
        path: "profile/:username?",
        element: <Profile />,
      },

    ]
  }
])

export function Router() {

  return (
    <RouterProvider router={router} />
  );
}
