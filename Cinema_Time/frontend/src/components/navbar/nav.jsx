import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlackTie } from '@fortawesome/free-brands-svg-icons';
import { faUser, faUserEdit, faSignOutAlt, faStar as faStarSolid, faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext"; // Assuming your context file is named AuthContext.js

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navct() {
  const { user, removeuser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeuser();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg position-fixed  top-0 start-0 end-0 sticky-top navbar-dark navbg px-4">
        <div className="container-fluid">
          <Link className="navbar-brand text-warning" to="/home">
            Cinema Time
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/itemspage/${"Movies"}`}>
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/itemspage/${"TvShows"}`}>
                  TvShows
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={`/itemspage/${"Anime"}`}>
                  Anime
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>

            <div className="d-flex me-4" role="search">
              <div className="input-group">
                <input className="form-control rounded-5 text-start position-relative" type="search" placeholder="Search.." aria-label="Search" />
                <a className="btn btn-warning rounded-5 position-absolute  end-0">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </a>
              </div>
            </div>


            <div className="d-flex justify-content-between">
              <NavLink to="/favourites" className="btn btn-outline-warning rounded-5" activeClassName="btn-warning">
                <FontAwesomeIcon icon={faStar} />
              </NavLink>


              <div className="dropdown px-4">
                <button className="btn btn-outline-warning dropdown-toggle rounded-5 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <ul className="dropdown-menu">
                  {user && user.isAdmin && (<li>
                    <Link to="/admin" className="dropdown-item">
                      <FontAwesomeIcon icon={faBlackTie} /> Admin Page
                    </Link>
                  </li>)}

                  <li>
                    <Link className="dropdown-item" to={`/profile/${user.email}`}>
                      <FontAwesomeIcon icon={faUserEdit} /> Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </li>


                </ul>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navct;
