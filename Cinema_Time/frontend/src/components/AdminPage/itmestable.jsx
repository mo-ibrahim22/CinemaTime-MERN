import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

import './css/table.css';

function Itmestable() {
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
                swal.fire({
                    icon: "success",
                    title: "Item Details Fetched",
                    text: "Item details fetched successfully.",
                });
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
    }, [category, apiDomain, user.token, handleUnauthorized]);

    const deleteItem = async (id) => {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${apiDomain}/api/item/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const updatedItems = items.filter(item => item._id !== id);
                setItems(updatedItems);
                swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } catch (error) {
                console.error("Error deleting item:", error);
                if (error.response.status === 401) {
                    handleUnauthorized();
                }
                else {
                    swal.fire({
                        icon: "error",
                        title: "Delete Error",
                        text: "An error occurred while deleting the item.",
                    });
                }
            }
        } else if (result.dismiss === swal.DismissReason.cancel) {
            swal.fire('Cancelled', 'Your item is safe :)', 'error');
        }
    };

    return (
        <>
            <div className="container-fluid  overflow-auto" >
                <p className="text-warning h2">{category} Data:</p>
                <table className="custom-table text-center text-light w-100">
                    <thead className="h4 text-warning">
                        <tr>
                            <th>Index</th>
                            <th>Title</th>
                            <th>Poster</th>
                            <th>Rating</th>
                            <th>Category</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td><img src={item.poster} alt={item.title} className="posterbg p-2" /></td>
                                <td>{item.rating}</td>
                                <td>{item.categorie}</td>
                                <td><Link to={`/admin/updateitem/${item._id}`} className="btn btn-warning">Edit</Link></td>
                                <td><button onClick={() => deleteItem(item._id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Itmestable;
