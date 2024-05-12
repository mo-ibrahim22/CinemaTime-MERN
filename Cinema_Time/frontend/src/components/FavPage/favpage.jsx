import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import "./css/favpage.css";
import ItemCard from "../ItemCard/itemcard";
import { useSearch } from "../../context/SearchContext"; // Import the SearchContext

function FavouritesPage() {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [userobj, setUserobj] = useState(null);
    const { user, apiDomain, handleUnauthorized, fetchUserDetails, networkError } = useAuth();
    const { searchQuery } = useSearch(); // Get searchQuery from SearchContext
    const favpage = true;

    useEffect(() => {
        fetchUserDetails(user.email, user.token, setUserobj);
    }, [user.email, user.token, fetchUserDetails]);

    const userid = userobj ? userobj._id : null;


    useEffect(() => {
        const fetchFavoriteItems = async () => {
            try {
                if (!userid) {
                    return;
                }
                const response = await axios.get(`${apiDomain}/api/user/${userid}/favorites`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setFavoriteItems(response.data);
            } catch (error) {
                console.error("Error fetching favorite items:", error);
                if (error.request && !error.response) {
                    networkError();
                }
                else if (error.response && error.response.status === 401) {
                    handleUnauthorized();
                } else {
                    swal.fire({
                        icon: "error",
                        title: "Favorite Items Fetch Error",
                        text: "An error occurred while fetching favorite items.",
                    });
                }
            }
        };

        fetchFavoriteItems();
    }, [userid, handleUnauthorized]);

    // Filter items based on search query
    const filteredItems = favoriteItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className="vh-100 favpagebg">
                <div className="vh-100 overflow-auto bluritem-bg">
                    <div className="mt-4 container text-center">
                        <div className="row">
                            <ItemCard items={filteredItems} userid={userid} favpage={favpage} searchQuery={searchQuery} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FavouritesPage;
