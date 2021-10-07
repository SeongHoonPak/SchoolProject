import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Cart from "./components/cart/cart";
import Header from "./components/header/header";
import Home from "./components/home/home";
import { AuthProvider } from "./context/AuthContext";
import { logoutAction } from "./modules/user";
import ProductRegister from "./pages/ProductRegister";
import ThisProducts from "./pages/ThisProducts";

function App({
  FileInput,
  productService,
  cartService,
  authErrorEventBus,
  authService,
}) {
  const dispatch = useDispatch();
  const { username } = useSelector(state => ({
    username: state.user.username,
  }));

  const onLogout = useCallback(async () => {
    if (window.confirm("정말 로그아웃 할거야?")) {
      await authService.logout();
      dispatch(logoutAction());
      window.location.replace("/");
    }
  }, [authService]);

  return (
    <>
      <Header username={username} onLogout={onLogout} />
      <Route exact path="/">
        <Home
          username={username}
          productService={productService}
          FileInput={FileInput}
        />
      </Route>
      <Route exact path="/:id">
        <ThisProducts
          productService={productService}
          cartService={cartService}
        />
      </Route>
      <Route exact path="/productRegister">
        <AuthProvider
          authService={authService}
          authErrorEventBus={authErrorEventBus}
          FileInput={FileInput}
        >
          <ProductRegister
            FileInput={FileInput}
            productService={productService}
          />
        </AuthProvider>
      </Route>
      <Route exact path="/login">
        <AuthProvider
          authService={authService}
          authErrorEventBus={authErrorEventBus}
          FileInput={FileInput}
        ></AuthProvider>
      </Route>
      <Route exact path="/cart">
        <AuthProvider
          authService={authService}
          authErrorEventBus={authErrorEventBus}
          FileInput={FileInput}
        >
          <Cart cartService={cartService} />
        </AuthProvider>
      </Route>
    </>
  );
}
export default App;
