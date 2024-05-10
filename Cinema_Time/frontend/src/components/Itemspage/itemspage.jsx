import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import ItemCard from "./itemcard";
import "./css/itempage.css";
function Itemspage() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const { user, apiDomain, handleUnauthorized } = useAuth();

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
                if (error.response.status === 401) {
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
    }, [category]);
    return (
        <>
            <div className="vh-100 itempagebg">
                <div className="vh-100 overflow-auto bluritem-bg">

                    <ItemCard items={items} />

                </div>
            </div >

        </>
    );
}

export default Itemspage;