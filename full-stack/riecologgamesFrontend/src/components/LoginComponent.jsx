import React, { useState } from "react";
import { login} from "../services/AuthService";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- qui

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ username, password })
      .then((res) => {
        localStorage.setItem("token", res.data); // salva JWT
        setIsLoggedIn(true); // <-- ora esiste
        setErrorMessage("");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Login fallito");
        setIsLoggedIn(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="container mt-4">
      {isLoggedIn ? (
        <>
          <h2>Benvenuto, {username}!</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
