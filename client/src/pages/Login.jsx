import React, { useState } from "react";

const Login = ({ onSignUp, onLogin, FileInput }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setURL] = useState("");
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const onFileChange = file => {
    const fileurls = file.url;
    setURL(url => {
      return [fileurls];
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    if (signup) {
      onSignUp(username, password, name, email, url).catch(setError);
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
    switch (name) {
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "name":
        return setName(value);
      case "email":
        return setEmail(value);
      case "url":
        return setURL(value);
      case "signup":
        return setSignup(checked);
      default:
    }
  };

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
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={onChange}
            className="form-input"
            required
          />
        )}
        {signup && (
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="form-input"
            required
          />
        )}
        {signup && (
          <>
            <h3>사진등록</h3>
            <FileInput type="text" onFileChange={onFileChange} />
          </>
        )}

        <div className="form-signup">
          <input
            name="signup"
            id="signup"
            type="checkbox"
            onChange={onChange}
            checked={signup}
          />
          <label htmlFor="signup"> Create a new account?</label>
        </div>
        <button className="form-btn auth-form-btn" type="submit">
          {signup ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
