import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import gitHubIcon from "../github.png";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthenticated(true);
      setUserEmail(localStorage.getItem("userEmail"));
    } else {
      setAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-light bg-light border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            width="32"
            height="32"
            className="d-inline-block"
            alt="MyMoney"
          />
          MyMoney
        </Link>
        <ul
          className="navbar-nav ml-auto d-flex justify-content-center align-items-center"
          style={{ flexDirection: "row" }}
        >
          {authenticated && (
            <>
              <li className="nav-item">{userEmail}</li>
              <li className="nav-item ml-2">
                <button
                  type="button"
                  className="nav-link btn btn-link btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li className="nav-item ml-2">
            <a href="https://github.com/devmathiusso/mymoney" target="_blank">
              <img
                src={gitHubIcon}
                width="32"
                height="32"
                className="d-inline-block"
                title="Follow me at GitHub"
                alt="Follow me at GitHub"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
