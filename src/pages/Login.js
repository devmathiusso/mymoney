import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { usePost } from "../utils/rest";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzSxKD2z98O0znIt3zMRXkParN78baoz8";

const Login = () => {
  const [postData, signIn] = usePost(url);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  useEffect(() => {
    if (postData.data.idToken) {
      localStorage.setItem("token", postData.data.idToken);
      localStorage.setItem("userEmail", postData.data.email);

      window.location.reload();
    }
  }, [postData]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) setAuthenticated(true);
  }, []);

  const login = async () => {
    setValidEmail(!!email);
    setValidPassword(!!password);

    if (!email || !password) return;

    await signIn({
      email,
      password,
      returnSecureToken: true
    });
  };

  const onChangeEmail = evt => setEmail(evt.target.value);
  const onChangePassword = evt => setPassword(evt.target.value);

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="col-sm-12 col-md-5 mt-4">
          <div
            className="d-flex justify-content-center align-items-center bg-light shadow-sm pt-4 pb-4"
            style={{ flexDirection: "column" }}
          >
            <div className="form-group w-75">
              <label htmlFor="email" className="label-control">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="john@doe.com"
                className={`form-control w-100 ${!validEmail && "is-invalid"}`}
              />
              {!validEmail && (
                <div className="invalid-feedback">
                  Please provide an e-mail.
                </div>
              )}
            </div>

            <div className="form-group w-75">
              <label htmlFor="password" className="label-control">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChangePassword}
                placeholder="********"
                className={`form-control w-100 ${!validPassword &&
                  "is-invalid"}`}
              />
              {!validPassword && (
                <div className="invalid-feedback">
                  Please provide a password.
                </div>
              )}
            </div>

            {postData.error &&
              postData.error.length &&
              validEmail &&
              validPassword && (
                <div className="w-75">
                  <p className="alert alert-danger text-center">
                    The e-mail and the password don't match!
                  </p>
                </div>
              )}

            <button className="btn btn-primary btn-sm w-75" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
