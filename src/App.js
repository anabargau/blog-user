import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/sign-up" element={<Signup />} />
        <Route path="user/log-in" element={<Login />} />
        <Route path="post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
