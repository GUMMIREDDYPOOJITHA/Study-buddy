import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles.css/Navbar.css";


const Navbar = () => {
  const location = useLocation();
  

  // Check if the current path belongs to the "home functionality" routes
  const isHomeFunctionality = ["/home", "/todo", "/pumodoro", "/room","/chat"].includes(location.pathname);
 


  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/home" className="titleName">
          Study Buddy
        </Link>
        <ul className="navbar-links">
          {!isHomeFunctionality ? (
            <>
              <li>
                <Link to="/" className="navbar-link">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/todo" className="navbar-link">Todo</Link>
              </li>
              <li>
                <Link to="/pumodoro" className="navbar-link">Pomodoro</Link>
              </li>
              <li>
                <Link to="/room" className="navbar-link">Study Chat</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
