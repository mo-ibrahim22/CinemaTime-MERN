import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/table.css';
import { useAuth } from "../../context/AuthContext"; // Assuming your context file is named AuthContext.js
import swal from "sweetalert2";
import { useSearch } from "../../context/SearchContext"; // Import the SearchContext

function Usersdata() {
    const { user, apiDomain, handleUnauthorized, networkError } = useAuth();
    const [usersobj, setUsersobj] = useState(null);
    const { searchQuery } = useSearch(); // Get searchQuery from SearchContext

    useEffect(() => {
        const fetchUsersDetails = async () => {
            try {
                const response = await axios.get(`${apiDomain}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUsersobj(response.data.users);
                swal.fire({
                    icon: "success",
                    title: "User Details Fetched",
                    text: "User details fetched successfully.",
                });
            } catch (error) {
                console.error("Profile fetch error:", error);
                if (error.request && !error.response) {
                    networkError();
                }
                else if (error.response.status === 401) {
                    handleUnauthorized();
                } else {
                    swal.fire({
                        icon: "error",
                        title: "Profile Fetch Error",
                        text: "An error occurred while fetching user details.",
                    });
                }
            }
        };

        fetchUsersDetails();
    }, [user.token, apiDomain, handleUnauthorized, networkError]);

    if (!usersobj) {
        return <div>Loading...</div>;
    }

    // Filter users based on search query
    const filteredUsers = usersobj.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <div className="container-fluid overflow-auto" >
                <p className="text-warning h2">Users Data:</p>
                <table className="custom-table text-center text-light w-100">
                    <thead className="h4 text-warning">
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Usersdata;
