import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/table.css';
import { useAuth } from "../../context/AuthContext"; // Assuming your context file is named AuthContext.js
import swal from "sweetalert2";

function Usersdata() {
    const { user } = useAuth();
    const [usersobj, setUsersobj] = useState(null);

    useEffect(() => {
        const fetchUsersDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user`, {
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
                swal.fire({
                    icon: "error",
                    title: "Profile Fetch Error",
                    text: "An error occurred while fetching user details.",
                });
            }
        };

        fetchUsersDetails();
    }, [user.token]);

    if (!usersobj) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid tablecont overflow-auto" >
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
                    {usersobj.map((user, index) => (
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
    );
}

export default Usersdata;
