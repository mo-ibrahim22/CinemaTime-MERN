import React from "react";
import "./css/nav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserEdit, faSignOutAlt, faStar } from '@fortawesome/free-solid-svg-icons';


function Navct() {
  return (
    <>
      <nav class="navbar navbar-expand-lg position-fixed top-0 start-0 end-0 sticky-top navbar-dark navbg px-4">
        <div class="container-fluid">
          <Link class="navbar-brand text-warning" to="/home">Cinema Time</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/home">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">Movie</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="#">TvShows</Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="#">Anime</Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="/about">About</Link>
              </li>


            </ul>

            <div className="d-flex justify-content-start w-50">
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-warning" type="submit">Search</button>
              </form>
            </div>

            <div className="d-flex justify-content-between">

              <button type="button" class="btn btn-outline-warning rounded-5"><FontAwesomeIcon icon={faStar} /></button>


              <div class="dropdown px-4">
                <a className="btn btn-outline-warning dropdown-toggle rounded-5 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      <FontAwesomeIcon icon={faUserEdit} /> Profile
                    </a>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
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