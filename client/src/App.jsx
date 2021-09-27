import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./components/home/home";
import ProductAdd from "./components/product/productadd";
import { AuthProvider } from "./context/AuthContext";

function App({ FileInput, productService, authService, authErrorEventBus }) {
  const [Auth, setAuth] = useState({});
  const onAuth = text => {
    setAuth(text);
  };
  const user = Auth && Auth.user;
  const logout = Auth && Auth.logout;
  console.log("로그아웃", logout);

  return (
    <>
      {console.log("aacc", user)}
      <Header
        username={user && user.username}
        onLogout={logout}
        onAuth={onAuth}
      />
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/productadd">
        <AuthProvider
          authService={authService}
          authErrorEventBus={authErrorEventBus}
          FileInput={FileInput}
        >
          <ProductAdd
            FileInput={FileInput}
            onAuth={onAuth}
            productService={productService}
          />
        </AuthProvider>
      </Route>
    </>
  );
}

export default App;
