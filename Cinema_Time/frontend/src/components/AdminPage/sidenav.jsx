import React from "react";
import './css/sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faTv, faGhost, faBars, faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Sidenav() {
    return (
        <>
            <button class="btn btn-warning my-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><FontAwesomeIcon icon={faBars} /></button>

            <div class="offcanvas offcanvas-start sidenavbg" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title text-warning h3 mt-5" id="offcanvasRightLabel">Admin Panel :</h5>
                    <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body d-flex flex-column text-light h5 justify-content-around ">
                    <Link to="/admin/addnewitem" className="text-light text-decoration-none"><FontAwesomeIcon icon={faCirclePlus} /> Add New Item</Link>
                    <Link to={`/admin/itmestable/${"Movies"}`} className="text-light text-decoration-none" ><FontAwesomeIcon icon={faClapperboard} /> Movies</Link>
                    <Link to={`/admin/itmestable/${"TvShows"}`} className="text-light text-decoration-none" ><FontAwesomeIcon icon={faTv} /> TVShows</Link>
                    <Link to={`/admin/itmestable/${"Anime"}`} className="text-light text-decoration-none" ><FontAwesomeIcon icon={faGhost} /> Anime</Link>
                    <Link to="/admin/usersdata" className="text-light text-decoration-none"><FontAwesomeIcon icon={faUser} /> Users</Link>

                </div>
            </div>
        </>
    );
}

export default Sidenav;