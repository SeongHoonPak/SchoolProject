import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../modules/user";

const Header = memo(({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="./img/img.jpg" alt="Home Logo" className="logo-img" />
        <h1 className="logo-name">하방</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {(username && (
        <nav className="menu">
          <button className="menu-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )) || (
        <>
          <Link to="/login">
            <button>로그인</button>
          </Link>
        </>
      )}
    </header>
  );
});

export default Header;
