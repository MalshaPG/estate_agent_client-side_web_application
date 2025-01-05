import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg align-items-center w-100">
        <div class="container">
          <div class="navbar-brand d-flex">
            <img
              src="images/logo.svg"
              className="img-fluid me-3 float-start logo"
              alt="logo"
            />

            <div>
              <h3 className="mb-0">Right move</h3>
              <h5 className="text-muted mb-0 fs-6">find your dream home</h5>
            </div>
          </div>

          <div className="justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link px-3" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link px-3" to="/Houses">
                  Houses
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link px-3" to="/Flats">
                  Flats
                </Link>
              </li>

              <li className="nav-item float-end">
                <Link className="nav-link px-3" to="/Login">
                  <img src="images/user.png" alt="user" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
