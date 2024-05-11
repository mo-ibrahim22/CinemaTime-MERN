import React from "react";
import "./css/itemcard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

function ItemCard({ items }) {
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

    return (
        <>
            <div className="mt-5 container text-center">
                <div className="row">
                    {items.map((item, index) => (
                        <div key={item._id} className="col-sm-6 col-md-4 col-lg-2 p-3  card-animation">

                            <div className="card rounded-bottom-4 text-light card-bg">
                                <img src={item.poster} className="card-img-top item-img photo-animation" alt={item.title} />
                                <div className="card-body">
                                    <p className="card-title h5">{item.title.split(' ').slice(0, 2).join(' ')}{item.title.split(' ').length > 2 ? ' ...' : ''}</p>
                                    <p className="card-text h6">{generateStars(item.rating)}</p>
                                    <Link to={`/detailspage/${item._id}`} className="btn btn-outline-warning rounded-5"> <FontAwesomeIcon icon={faPlay} /> Watch </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ItemCard;
