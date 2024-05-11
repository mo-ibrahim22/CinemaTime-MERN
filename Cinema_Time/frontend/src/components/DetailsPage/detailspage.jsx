import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./css/detailspg.css";

function DetailsPage() {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);
    const { user, apiDomain, handleUnauthorized, networkError } = useAuth();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(
                    `${apiDomain}/api/item/oneitem/${itemId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                setItem(response.data);
            } catch (error) {
                console.error("Error fetching item:", error);
                if (error.request && !error.response) {
                    networkError();
                }
                else if (error.response.status === 401) {
                    handleUnauthorized();
                } else {
                    swal.fire({
                        icon: "error",
                        title: "Item Fetch Error",
                        text: "An error occurred while fetching item details.",
                    });
                }
            }
        };

        fetchItem();
    }, [itemId, user.token, apiDomain, handleUnauthorized]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <FontAwesomeIcon
                        icon={faStar}
                        key={i}
                        className="text-warning"
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon
                        icon={faStar}
                        key={i}
                        className="text-secondary"
                    />
                );
            }
        }
        return stars;
    };

    return (
        <>
            {item && (
                <div className="vh-100 detpagebg">
                    <div className="vh-100 overflow-auto blurdet-bg">
                        <div className="container mt-4 pt-4">
                            <div className="container mt-5 p-5 detcont rounded-4 text-light">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="pe-4"><img
                                            src={item.poster}
                                            alt={item.title}
                                            className="img-fluid rounded-4  w-100 possize "
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-8 m-auto">
                                        <h1 className="text-warning">{item.title}</h1>
                                        <p className="h5">{item.categorie}</p>
                                        <p className="h6"> {item.description}</p>
                                        <p>
                                            {renderStars(item.rating)}
                                        </p>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <a className="btn btn-outline-warning" href={item.trailerLink} target="_blank">Watch Trailer</a>

                                            <a className="btn btn-outline-warning mx-4" href={item.watchingLink} target="_blank">Watch </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default DetailsPage;
