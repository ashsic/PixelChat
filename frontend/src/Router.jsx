import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRouteWrapper } from './pages/AuthRouteWrapper.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Messages from './pages/MessagesPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Timeline from './pages/Timeline.jsx';
import LoginCheck from './components/LoginCheck.jsx';
import LogoutPage from './components/LogoutPage.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginCheck/>,
  },
  {
    path: "/signup",
    element: <LoginCheck/>,
  },
  {
    path: "/logout",
    element: <LogoutPage/> // remove?
  },
  {
    path: "/",
    element: <AuthRouteWrapper />,
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
