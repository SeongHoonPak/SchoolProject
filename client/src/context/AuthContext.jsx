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
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";
import { loginAction, logoutAction } from "../modules/user";
import Login from "../pages/Login";

const AuthContext = createContext({});

const tokenRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, FileInput }) {
  const dispatch = useDispatch();
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
    async (username, password) => {
      const user = await authService.login(username, password);
      console.log("user찍", user.username);
      dispatch(loginAction(user.username, logout));
      setUser(user);

      history.push("/");
    },
    [authService]
  );

  const logout = useCallback(async () => {
    console.log("로그아웃 실행");
    await authService.logout();
    setUser(undefined);
    dispatch(logoutAction());
    history.push("/");
  }, [authService]);

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn]
  );
  return (
    <div className="app">
      <Login onSignUp={signUp} onLogin={logIn} FileInput={FileInput} />
    </div>
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
