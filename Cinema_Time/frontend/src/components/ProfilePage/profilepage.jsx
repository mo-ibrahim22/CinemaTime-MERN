import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import Updateacc from "./updateacc";
import DeleteAccount from "./deleteacc";

function Profilepg() {
    const { user } = useAuth();
    const [userobj, setUserobj] = useState(null);
    const [displayDeleteForm, setDisplayDeleteForm] = useState(false);
    const { email } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${email}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setUserobj(response.data.user);
            } catch (error) {
                console.error("Profile fetch error:", error);
            }
        };

        fetchUserDetails();
    }, [email, user.token]);

    if (!userobj) {
        return <div>Loading...</div>;
    }

    const toggleDeleteForm = () => {
        setDisplayDeleteForm(!displayDeleteForm);
    };

    return (
        <>

            <div className="vh-100 logbg">
                <div className="vh-100 d-flex justify-content-center align-items-center blur-bg ">
                    <div className="container-fluid position-relative">
                        {displayDeleteForm ? <Updateacc userobj={userobj} /> : <DeleteAccount userobj={userobj} />}
                        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4">
                            <a className={displayDeleteForm ? "text-danger text-decoration-none" : "text-warning text-decoration-none"} onClick={toggleDeleteForm}>
                                {displayDeleteForm ? "Delete Account" : "Update Account"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Profilepg;
