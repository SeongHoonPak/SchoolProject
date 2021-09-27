import React, { memo } from "react";
import { useHistory } from "react-router";

const Header = memo(({ username, onLogout, onAuth }) => {
  const history = useHistory();
  console.log("asdsad", onLogout);
  const onLogout1 = () => {
    if (window.confirm("정말 로그아웃 할거야?")) {
      onLogout();
      onAuth();
      history.push("/");
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <img src="./img/img.jpg" alt="Home Logo" className="logo-img" />
        <h1 className="logo-name">하방</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <button className="menu-item" onClick={onLogout1}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

export default Header;
