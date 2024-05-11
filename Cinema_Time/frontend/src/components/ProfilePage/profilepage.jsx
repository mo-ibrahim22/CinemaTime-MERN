import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import Updateacc from "./updateacc";
import DeleteAccount from "./deleteacc";

import './css/profilebg.css';

function Profilepg() {
    const { user, apiDomain, handleUnauthorized, networkError } = useAuth();
    const [userobj, setUserobj] = useState(null);
    const [displayUpdateForm, setDisplayUpdateForm] = useState(true); // Changed state name
    const { email } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${apiDomain}/api/user/${email}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUserobj(response.data.user);
                swal.fire({
                    icon: "success",
                    title: "User Details Fetched",
                    text: "User details fetched successfully.",
                });
            } catch (error) {
                console.error("Profile fetch error:", error);
                if (error.request) {
                    networkError();
                }
                else if (error.response.status === 401) {
                    handleUnauthorized();
                }
                else {

                    swal.fire({
                        icon: "error",
                        title: "Profile Fetch Error",
                        text: "An error occurred while fetching user details.",
                    });
                }
            }
        };

        fetchUserDetails();
    }, [email, user.token]);

    if (!userobj) {
        return;
    }

    const toggleUpdateForm = () => { // Changed function name
        setDisplayUpdateForm(!displayUpdateForm); // Changed state name
    };

    return (
        <>

            <div className="vh-100 logbg">
                <div className="vh-100 d-flex justify-content-center align-items-center blur-bg overflow-auto">
                    <div className="container-fluid position-relative">
                        {displayUpdateForm ? <Updateacc userobj={userobj} /> : <DeleteAccount userobj={userobj} />}
                        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4">
                            <a className={displayUpdateForm ? "text-danger text-decoration-none cursorp" : "text-warning text-decoration-none cursorp"} onClick={toggleUpdateForm}> {/* Changed class and text condition */}
                                {displayUpdateForm ? "Delete Account" : "Update Account"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Profilepg;
