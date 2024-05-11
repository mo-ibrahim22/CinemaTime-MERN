import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import ItemCard from "../ItemCard/itemcard";
import "./css/itempage.css";

function Itemspage() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [userobj, setUserobj] = useState(null);
    const { user, apiDomain, handleUnauthorized, fetchUserDetails,networkError } = useAuth();

    useEffect(() => {
        fetchUserDetails(user.email, user.token, setUserobj);
    }, [user.email, user.token, fetchUserDetails]);

    const userid = userobj ? userobj._id : null;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${apiDomain}/api/item/${category}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setItems(response.data);

            } catch (error) {
                console.error("Error fetching items:", error);
                if(error.request) {
                    networkError();
                }
                else if (error.response && error.response.status === 401) {
                    handleUnauthorized();
                }
                else {
                    swal.fire({
                        icon: "error",
                        title: "Item Fetch Error",
                        text: "An error occurred while fetching item details.",
                    });
                }
            }
        };

        fetchItems();
    }, [category, user.token, apiDomain, handleUnauthorized]);

    return (
        <>
            <div className="vh-100 itempagebg">
                <div className="vh-100 overflow-auto bluritem-bg">
                    <div className="mt-4 container text-center">
                        <div className="row">
                            <ItemCard items={items} userid={userid} category={category} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Itemspage;
