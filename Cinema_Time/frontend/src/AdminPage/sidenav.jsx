import React from "react";
import './css/sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faTv, faGhost, faBars, faUserEdit, faCirclePlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Sidenav() {
    return (
        <>
            <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><FontAwesomeIcon icon={faBars} /></button>

            <div class="offcanvas offcanvas-start sidenavbg" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title text-warning h3" id="offcanvasRightLabel">Admin Panel :</h5>
                    <button type="button" class="btn-close bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body d-flex flex-column text-light h5 justify-content-around ">
                    <a ><FontAwesomeIcon icon={faClapperboard} /> Movies</a>
                    <a ><FontAwesomeIcon icon={faTv} /> TV Shows</a>
                    <a ><FontAwesomeIcon icon={faGhost} /> Anime</a>
                    <a ><FontAwesomeIcon icon={faCirclePlus} /> Add New Item</a>
                    <a ><FontAwesomeIcon icon={faUserEdit} /> Users</a>
                    <a className="text-danger text-decoration-none"> <FontAwesomeIcon icon={faSignOutAlt} /> Logout </a>

                </div>
            </div>
        </>
    );
}

export default Sidenav;