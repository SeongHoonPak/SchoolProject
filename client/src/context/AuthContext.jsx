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

export function AuthProvider({
  authService,
  authErrorEventBus,
  FileInput,
  children,
}) {
  console.log("Auth 실행ㅎㄴ다");
  const dispatch = useDispatch();
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  // useImperativeHandle(tokenRef, () => (user ? user.token : undefined));
  useImperativeHandle(csrfRef, () => csrfToken);
  useEffect(() => {
    authErrorEventBus.listen(err => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.csrfToken().then(setCsrfToken).catch(console.error);
  }, [authService]);

  useEffect(() => {
    console.log("me 실행한다");
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService.signup(username, password, name, email, url).then(user => {
        setUser(user);
        dispatch(loginAction(user.username));
        window.location.replace("/");
      }),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) => {
      const user = await authService.login(username, password);
      setUser(user);
      dispatch(loginAction(user.username));
      // window.location.replace("/");
      // history.push("/");
    },
    [authService]
  );

  // const logout = useCallback(async () => {
  //   await authService.logout();
  //   setUser(undefined);
  //   dispatch(logoutAction());
  //   history.push("/");
  // }, [authService]);

  return (
    <>
      {
        (console.log("유저체크", user),
        user ? (
          children
        ) : (
          <div className="app">
            <Login onSignUp={signUp} onLogin={logIn} FileInput={FileInput} />
          </div>
        ))
      }
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
