import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./components/home/home";
import ProductAdd from "./components/product/productadd";
import { useAuth } from "./context/AuthContext";

function App({ FileInput, productService }) {
  const { user, logout } = useAuth();
  return (
    <>
      {console.log("aacc", user)}
      <Header username={user && user.username} onLogout={logout} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/productadd">
        <ProductAdd FileInput={FileInput} productService={productService} />
      </Route>
    </>
  );
}
export default App;
