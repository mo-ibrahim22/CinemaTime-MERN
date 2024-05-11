import React from "react";
import "./css/itemcard.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";

function ItemCard({ items, userid, category, favpage, searchQuery }) {
    const { user, apiDomain ,networkError,handleUnauthorized } = useAuth();
    const navigate = useNavigate();

    const toggleFavorite = async (itemId, isFavorite) => {
        try {
            if (isFavorite || favpage) {
                await axios.delete(`${apiDomain}/api/user/${userid}/myfavorites/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (favpage) {

                    navigate('/favourites');
                }
                else {
                    navigate(`/itemspage/${category}`);
                }


            } else {
                await axios.post(`${apiDomain}/api/user/${userid}/favorites/${itemId}`, null, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                navigate(`/itemspage/${category}`);
            }



        } catch (error) {
            console.error("Favorite Toggling Error:", error);
            if (error.request && !error.response) {
                networkError();
            }
            else if (error.response.status === 401) {
                handleUnauthorized();
            }
            else {
                swal.fire({
                    icon: "error",
                    title: "Favorite Toggling Error",
                    text: "An error occurred while toggling item favorites.",
                });
            }
        }
    };

    // Function to generate star icons based on rating
    const generateStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="text-warning" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={regularStar} className="text-warning" />);
            }
        }
        return stars;
    };

    // Filter items based on search query
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className="mt-5 container text-center">
                <div className="row">
                    {filteredItems.map((item, index) => (
                        <div key={item._id} className="col-sm-6 col-md-4 col-lg-2 p-3  card-animation">
                            <div className="card rounded-bottom-4 text-light card-bg position-relative ">
                                <img src={item.poster} className="card-img-top item-img photo-animation" alt={item.title} />
                                <div className="card-body">
                                    <p className="card-title h5">{item.title.split(' ').slice(0, 2).join(' ')}{item.title.split(' ').length > 2 ? ' ..' : ''}</p>
                                    <p className="card-text h6">{generateStars(item.rating)}</p>
                                    <Link to={`/detailspage/${item._id}`} className="btn btn-outline-warning border-0 rounded-5">
                                        <FontAwesomeIcon icon={faPlay} /> Watch
                                    </Link>
                                </div>
                                <button className="btn btn-warning  position-absolute top-0 end-0" onClick={() => toggleFavorite(item._id, item.isFavorite)}>
                                    <FontAwesomeIcon icon={item.isFavorite || favpage ? solidStar : regularStar} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ItemCard;
