import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../firebase.js";

const Header = () => {
  //userSlice에 있는 user값 가져오기
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

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
        {user.accessToken === "" ? (
          <nav className="nav">
            <ul>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/join">join</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="nav">
            <ul>
              <li>
                <span>{user.displayName}</span>님 반갑습니다! ^^
              </li>
              <li>
                <Link onClick={() => LogoutHandler()}>logout</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
