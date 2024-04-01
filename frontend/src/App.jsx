import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';

import Home from "./pages/Home";
import Messages from './pages/Messages';

function App() {

  return (
    <>
      <Router>
      <NavBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </>
  )
};

export default App;
