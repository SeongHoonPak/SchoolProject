import { Route, useHistory } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./components/home/home";
import ProductAdd from "./components/product/productadd";
import { useAuth } from "./context/AuthContext";

function App({ productService }) {
  const history = useHistory();
  const { user, logout } = useAuth();

  const onLogout = () => {
    if (window.confirm("정말 로그아웃 하겠습니까?")) {
      logout();
      history.push("/");
    }
  };

  return (
    <>
      <Header username={user.username} onLogout={onLogout} />
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/productadd">
        <ProductAdd productService={productService} />
      </Route>
    </>
  );
}

export default App;
