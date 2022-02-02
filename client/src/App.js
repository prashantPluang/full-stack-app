import React from 'react';
import NavBar from './components/Navbar';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/screens/home';
import SignIn from './components/screens/signin';
import SignUp from './components/screens/signup';
import Profile from './components/screens/profile';

function App() {
    return (
        <BrowserRouter>
          <NavBar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
    );
}

export default App;
