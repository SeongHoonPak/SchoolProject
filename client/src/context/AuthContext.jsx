import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router";
import Login from "../pages/Login";

const AuthContext = createContext({});

const tokenRef = createRef();

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
  FileInput,
}) {
  const history = useHistory();
  const [user, setUser] = useState(undefined);
  useImperativeHandle(tokenRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authErrorEventBus.listen(err => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService
        .signup(username, password, name, email, url)
        .then(user => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then(setUser),
    [authService]
  );

  const logout = useCallback(
    async () =>
      authService.logout().then(
        () => setUser(undefined),

        history.push("/")
      ),
    [authService]
  );

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );
  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Login onSignUp={signUp} onLogin={logIn} FileInput={FileInput} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
