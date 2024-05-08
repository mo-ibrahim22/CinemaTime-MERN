import React from "react";
import { faClapperboard, faTv, faGhost, faFilm } from '@fortawesome/free-solid-svg-icons';
import Cards from "./card";
function Counters() {
    return (
        <>
            <div className="container w-75">
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <Cards icon={faClapperboard} name="Movies" count="200" />

                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <Cards icon={faTv} name="TVShows" count="200" />

                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <Cards icon={faGhost} name="Anime" count="200" />

                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <Cards icon={faFilm} name="Total" count="200" />

                    </div>



                </div>
            </div>

        </>
    );
}

export default Counters;