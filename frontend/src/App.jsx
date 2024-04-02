import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';

import Home from "./pages/Home";
import Messages from './pages/Messages';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Router>
      <NavBar />
        <div className=" flex justify-center flex-1">
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
