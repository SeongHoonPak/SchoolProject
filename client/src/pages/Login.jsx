import React, { useEffect, useState } from "react";

const Login = ({ onSignUp, onLogin, edit, onChanged }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    if (edit) {
      onChanged(username, password, name, email, number).catch(setError);
    } else if (signup) {
      onSignUp(username, password, name, email, number).catch(setError);
    } else {
      onLogin(username, password).catch(setError);
    }
  };

  const setError = error => {
    setText(error.toString());
    setIsAlert(true);
  };

  const onChange = event => {
    const {
      target: { name, value, checked },
    } = event;
    console.log(name, value);
    switch (name) {
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "number":
        return setNumber(value);
      case "signup":
        return setSignup(checked);
      default:
    }
  };

  useEffect(() => {
    edit && setSignup(true);
  }, []);
  return (
    <>
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Id"
          value={username}
          onChange={onChange}
          className="form-input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          className="form-input"
          onChange={onChange}
        />
        {signup && (
          <>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChange}
              className="form-input"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
              className="form-input"
              required
            />
            <input
              name="number"
              type="tel"
              placeholder="Phone Number"
              value={number}
              onChange={onChange}
              className="form-input"
              required
            />
          </>
        )}

        {edit || (
          <div className="form-signup">
            <input
              name="signup"
              id="signup"
              type="checkbox"
              onChange={onChange}
              checked={signup}
            />
            <label htmlFor="signup"> 회원가입 하시겠습니까?</label>
          </div>
        )}
        {(edit && (
          <button className="form-btn auth-form-btn" type="submit">
            수정하기
          </button>
        )) || (
          <button className="form-btn auth-form-btn" type="submit">
            {signup ? "Sign Up" : "Sign In"}
          </button>
        )}
      </form>
    </>
  );
};

export default Login;
