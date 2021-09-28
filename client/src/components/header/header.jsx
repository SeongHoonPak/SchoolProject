import React, { memo } from "react";
import { useHistory } from "react-router";

const Header = memo(({ username, onLogout }) => {
  const history = useHistory();

  return (
    <header className="header">
      <div className="logo">
        <img src="./img/img.jpg" alt="Home Logo" className="logo-img" />
        <h1 className="logo-name">하방</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <button className="menu-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

export default Header;
