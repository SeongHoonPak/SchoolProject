import {
  createRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router";
import { loginAction, logoutAction } from "../modules/user";
import Login from "../pages/Login";

const csrfRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, FileInput }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  // useImperativeHandle(tokenRef, () => (user ? user.token : undefined));
  useImperativeHandle(csrfRef, () => csrfToken);
  useEffect(() => {
    authErrorEventBus.listen(err => {
      console.log(err);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.csrfToken().then(setCsrfToken).catch(console.error);
  }, [authService]);

  useEffect(() => {
    authService.me().then().catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService
        .signup(username, password, name, email, url)
        .then(history.push("/")),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) => {
      const user = await authService.login(username, password);

      dispatch(loginAction(user.username, logout));

      history.push("/");
    },
    [authService]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    dispatch(logoutAction());
    history.push("/");
  }, [authService]);

  return (
    <>
      <div className="app">
        <Login onSignUp={signUp} onLogin={logIn} FileInput={FileInput} />
      </div>
    </>
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
export const fetchCsrfToken = () => csrfRef.current;
