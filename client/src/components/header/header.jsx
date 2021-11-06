import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction, logoutAction } from "../../modules/user";

const Header = memo(({ onLogout, username, time }) => {
  const dispatch = useDispatch();
  const now = new Date();
  const login = new Date(Date.parse(time));
  const timeend = 3000 - Math.floor((now - login) / 1000);
  Math.floor((now - login) / 1000) > 3000 && dispatch(logoutAction());
  const path = `/${username}`;

  return (
    <header className="header">
      <div className="logo">
        <img src="./img/img.jpg" alt="Home Logo" className="logo-img" />
        <h1>
          <Link to="/">하방</Link>
        </h1>

        {timeend < 300 && <> 곧 자동로그아웃됩니다.</>}
        {username && (
          <span className="logo-user">[{username}]님 환영합니다 </span>
        )}
      </div>
      <Link to={path}>
        <button>내정보</button>
      </Link>
      <Link to="/productRegister">
        <button>상품등록하기</button>
      </Link>
      <Link to="/chatlist">
        <button>내 채팅</button>
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
      <Link to="/cart">
        <button>찜목록</button>
      </Link>
    </header>
  );
});

export default Header;
