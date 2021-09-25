import { useHistory } from "react-router";
import Products from "./components/products/products";
import { useAuth } from "./context/AuthContext";

function App() {
  const history = useHistory();
  const { logout } = useAuth();

  const onLogout = () => {
    if (window.confirm("정말 로그아웃 하겠습니까?")) {
      logout();
      history.push("/");
    }
  };

  return <Products onLogout={onLogout} />;
}

export default App;
