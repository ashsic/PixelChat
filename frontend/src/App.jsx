import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';

import NavBar from './components/NavBar';

import Home from "./pages/HomePage";
import Messages from './pages/MessagesPage';
import Profile from './pages/ProfilePage';

const GET_USERS = gql`
  query {
    users {
      username
      email
    }
  }
`;



function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.users.map(({ username, email }, i) => (
    <div key={i}>
      <h3>{username}</h3>
      <br />
      <b>About this user:</b>
      <p>{email}</p>
      <br />
    </div>
  ));
}

function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <>
      <Router>
        <NavBar />
        {/* <div className='flex flex-col'>
          <DisplayLocations />
        </div> */}
        <div className="flex justify-center flex-1">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/messages/:chatid?" element={<Messages />} />
            <Route index path="/profile/:username?" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </>
  )
};

export default App;
