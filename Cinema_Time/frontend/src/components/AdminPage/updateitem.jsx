import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import UpdateItemForm from "./updateitemform";

function UpdateItem() {
    const { user, apiDomain, handleUnauthorized,networkError } = useAuth();
    const [item, setItem] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${apiDomain}/api/item/oneitem/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setItem(response.data);
                swal.fire({
                    icon: "success",
                    title: "Item Details Fetched",
                    text: "Item details fetched successfully.",
                });
            } catch (error) {
                console.error("Item fetch error:", error);
                if(error.request) {
                    networkError();
                }
                else if (error.response.status === 401) {
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

        fetchItem();
    }, [itemId, user.token]);

    if (!item) {
        return <div className="text-light">{itemId}</div>;
    }

    return (
        <>

            <UpdateItemForm item={item} />
        </>
    );
}

export default UpdateItem;
