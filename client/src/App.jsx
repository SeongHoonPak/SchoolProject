import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/cart/cart";
import Chat from "./components/chat/chat";
import Chatlist from "./components/chatlist/chatlist";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Order from "./components/order/order";
import { AuthProvider } from "./context/AuthContext";
import { logoutAction } from "./modules/user";
import MyProducts from "./pages/MyProduct";
import ProductRegister from "./pages/ProductRegister";
import ThisProducts from "./pages/ThisProducts";

function App({
  FileInput,
  productService,
  cartService,
  authErrorEventBus,
  authService,
  orderService,
  httpClient,
}) {
  const { username, time } = useSelector(state => ({
    username: state.user.username,
    time: state.user.time,
  }));
  const dispatch = useDispatch();
  const onLogout = useCallback(async () => {
    if (window.confirm("정말 로그아웃 할거야?")) {
      await authService.logout();
      dispatch(logoutAction());
      window.location.replace("/");
    }
  }, [authService]);
  return (
    <>
      <Header onLogout={onLogout} username={username} time={time} />

      <Route exact path="/">
        <Home productService={productService} FileInput={FileInput} />
      </Route>
      <Switch>
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
        <Route exact path="/chatlist">
          <AuthProvider
            authService={authService}
            authErrorEventBus={authErrorEventBus}
            FileInput={FileInput}
          >
            <Chatlist
              username={username}
              orderService={orderService}
              productService={productService}
            />
          </AuthProvider>
        </Route>
        <Route exact path="/order">
          <AuthProvider
            authService={authService}
            authErrorEventBus={authErrorEventBus}
            FileInput={FileInput}
          >
            <Order orderService={orderService} httpClient={httpClient} />
          </AuthProvider>
        </Route>
        <Route exact path="/chat/:id">
          <AuthProvider
            authService={authService}
            authErrorEventBus={authErrorEventBus}
            FileInput={FileInput}
          >
            <Chat httpClient={httpClient} />
          </AuthProvider>
        </Route>
        <Route exact path="/product/:id">
          <AuthProvider
            authService={authService}
            authErrorEventBus={authErrorEventBus}
            FileInput={FileInput}
          >
            <ThisProducts
              productService={productService}
              cartService={cartService}
            />
          </AuthProvider>
        </Route>

        <Route exact path="/:username">
          <AuthProvider
            authService={authService}
            authErrorEventBus={authErrorEventBus}
            FileInput={FileInput}
          >
            <MyProducts
              authService={authService}
              productService={productService}
            />
          </AuthProvider>
        </Route>
      </Switch>
    </>
  );
}
export default App;
