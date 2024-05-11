import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faTv, faGhost, faFilm } from '@fortawesome/free-solid-svg-icons';
import Cards from "./card";
import swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

function Counters() {
    const { user, apiDomain, handleUnauthorized, networkError } = useAuth();
    const [counters, setCounters] = useState({
        Movies: 0,
        TvShows: 0,
        Anime: 0,
        Total: 0
    });

    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const response = await axios.get(`${apiDomain}/api/item`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setCounters(response.data);
            } catch (error) {
                console.error("Error fetching counters:", error);
                if (error.request && !error.response) {
                    networkError();
                }
                else if (error.response.status === 401) {
                    handleUnauthorized();
                }
                else {
                    swal.fire({
                        icon: "error",
                        title: "Counter Fetch Error",
                        text: "An error occurred while fetching counters.",
                    });
                }
            }
        };

        fetchCounters();
    }, [user.token, apiDomain, handleUnauthorized, networkError, setCounters]);

    return (
        <div className="container w-75 my-5">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <Cards icon={faClapperboard} name="Movies" count={counters.Movies} />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <Cards icon={faTv} name="TvShows" count={counters.TvShows} />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <Cards icon={faGhost} name="Anime" count={counters.Anime} />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <Cards icon={faFilm} name="Total" count={counters.Total} />
                </div>
            </div>
        </div>
    );
}

export default Counters;
