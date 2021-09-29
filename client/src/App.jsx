import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./components/home/home";
import ProductAdd from "./components/product/productadd";
import { AuthProvider } from "./context/AuthContext";
import { logoutAction } from "./modules/user";

function App({ FileInput, productService, authErrorEventBus, authService }) {
  const dispatch = useDispatch();
  const logout = useCallback(async () => {
    window.confirm("정말 로그아웃 할거야?");
    await authService.logout();
    dispatch(logoutAction());
  }, [authService]);

  const { username } = useSelector(state => ({
    username: state.user.username,
  }));
  console.log("네임", username);
  return (
    <>
      <Header username={username} onLogout={logout} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/productadd">
        <ProductAdd FileInput={FileInput} productService={productService} />
      </Route>

      <Route exact path="/login">
        <AuthProvider
          authService={authService}
          authErrorEventBus={authErrorEventBus}
          FileInput={FileInput}
        ></AuthProvider>
      </Route>
    </>
  );
}
export default App;
