import {
  createRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loginAction, logoutAction } from "../modules/user";
import Login from "../pages/Login";

const tokenRef = createRef();
const csrfRef = createRef();

export function AuthProvider({
  authService,
  authErrorEventBus,
  FileInput,
  children,
}) {
  const { usernamed } = useSelector(state => ({
    usernamed: state.user.username,
  }));
  const dispatch = useDispatch();
  const history = useHistory("");
  const { edit } = history.location.state ? history.location.state : "";
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  useImperativeHandle(tokenRef, () => (user ? user.token : undefined));
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
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, name, email, number) =>
      authService.signup(username, password, name, email, number).then(user => {
        dispatch(loginAction(user.username));
        window.location.replace("/");
      }),
    [authService]
  );

  const update = useCallback(
    async (username, password, name, email, number) =>
      authService
        .update(usernamed, username, password, name, email, number)
        .then(user => {
          dispatch(loginAction(user.username));
          window.location.replace("/");
        }),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) => {
      const user = await authService.login(username, password);
      dispatch(loginAction(user.username));
      history.push("/");
    },
    [authService]
  );

  // const logout = useCallback(async () => {
  //   await authService.logout();
  //   dispatch(logoutAction());
  // }, [authService]);

  return (
    <>
      {edit ? (
        <Login username={usernamed} onChanged={update} edit={edit} />
      ) : usernamed ? (
        children
      ) : (
        <div className="app">
          <Login onSignUp={signUp} onLogin={logIn} FileInput={FileInput} />
        </div>
      )}
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
export const fetchToken = () => tokenRef.current;
export const fetchCsrfToken = () => csrfRef.current;
