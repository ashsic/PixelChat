import NavBar from './components/NavBar.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Messages from './pages/MessagesPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Timeline from './pages/Timeline.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginCheck from './components/LoginCheck.jsx';
import LogoutPage from './components/LogoutPage.jsx';
import { AuthRouteWrapper } from './pages/AuthRouteWrapper.jsx';

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
    element: <LogoutPage/>
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
