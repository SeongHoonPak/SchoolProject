import React, { memo } from "react";
import { Link } from "react-router-dom";

const Header = memo(({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="./img/img.jpg" alt="Home Logo" className="logo-img" />
        <h1 className="logo-name">하방</h1>
        {username && (
          <span className="logo-user">[{username}]님 환영합니다 </span>
        )}
      </div>
      <Link to="/productRegister">
        <button>상품등록하기</button>
      </Link>
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
