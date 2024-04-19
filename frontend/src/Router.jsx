import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRouteWrapper } from './components/main_pages/auth/AuthRouteWrapper.jsx';
import ErrorPage from './components/main_pages/error/Page.jsx';
import Messages from './components/main_pages/messages/MessagesPage.jsx';
import Profile from './components/main_pages/profile/ProfilePage.jsx';
import Timeline from './components/main_pages/timeline/Timeline.jsx';
import LoginCheck from './components/main_pages/auth/LoginCheck.jsx';
import LogoutPage from './components/main_pages/auth/LogoutPage.jsx';
import LoadingPage from './components/main_pages/loading/Page.jsx';


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
    path: "/loading",
    element: <LoadingPage/> // remove?
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
