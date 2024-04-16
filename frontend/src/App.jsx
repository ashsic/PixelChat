import './App.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import NavBar from './components/NavBar';
import Login from './components/Login';
import Timeline from "./pages/Timeline";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';
import { gql, useQuery, useReactiveVar } from '@apollo/client';

import { isLoggedInVar } from './graphql/cache';
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


const rootAction = async () => {
  return redirect("/");
}



function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { loading, error, data } = useQuery(VERIFY_JWT);

  if (loading) console.log('loading')

  // // console.log('initial state',isLoggedIn)

  if (error) {
    console.log('error')
    isLoggedInVar(false)
  }

  if (data) {
    console.log('data')
    isLoggedInVar(true)
    console.log(isLoggedIn)
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
        path="/"
        action={rootAction}
        element={<NavBar props={isLoggedIn} />}
        errorElement={<ErrorPage />}
        >
          <Route errorElement={<ErrorPage />}>
            <Route index element={<Timeline />} />
            <Route path="messages/:chatid?" element={<Messages />} />
            <Route path="profile/:username?" element={<Profile />} />
          </Route>
        </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
};

export default App;
