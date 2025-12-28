import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Todowrapper from "./components/Todowrapper";
import Pomodoro from "./components/Pomodoro";
import Chat  from "./components/Chat";
import Room from "./components/Room";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todo" element={<Todowrapper />} />
        <Route path="/pumodoro" element={<Pomodoro />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default App;
