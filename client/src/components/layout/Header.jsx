import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header" role="banner">
      <div className="left">
        <Link to="/">
          <h1 className="logo">
            kitch <span>candy</span> <em>Diary</em>
          </h1>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/join">join</Link>
            </li>
            <li>
              <Link to="/logout">logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
