import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';
import Login from './components/Login';
import Timeline from "./pages/Timeline";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';

// const GET_USERS = gql`
//   query {
//     users {
//       username
//       email
//     }
//   }
// `;

// function DisplayUsers() {
//   const { loading, error, data } = useQuery(GET_USERS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   return data.users.map(({ username, email }, i) => (
//     <div key={i}>
//       <h3>{username}</h3>
//       <br />
//       <b>About this user:</b>
//       <p>{email}</p>
//       <br />
//     </div>
//   ));
// }

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  return true;
}


function App() {
  return (
    <>
      <Router>
        {isAuthenticated() && <NavBar />}
        <div className="flex justify-center flex-1">
          <Routes>
            <Route index path="/" element={<div>homepage dashboard...</div>} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/feed" element={<Timeline />} />
            <Route index path="/messages/:chatid?" element={<Messages />} />
            <Route index path="/profile/:username?" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  )
};

export default App;
