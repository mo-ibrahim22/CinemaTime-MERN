// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

// Create a context to manage user authentication
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //api domain
    const apiDomain = 'http://localhost:3000';

    // Check if user is already logged in
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to createuser
    const createuser = (token, email, isAdmin) => {
        const newUser = { token, email, isAdmin };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    // Function to removeuser
    const removeuser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Function to fetch user details
    const fetchUserDetails = async (email, token, setUserobj) => {
        try {
            const response = await axios.get(`${apiDomain}/api/user/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserobj(response.data.user);

        } catch (error) {
            console.error("Profile fetch error:", error);
            if(error.request) {
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

    //function to handle unauthorized access
    const handleUnauthorized = () => {
        removeuser();
        swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Your session has expired. Please login again to continue..",
        }).then(() => {
            navigate("/");
        });
    };

    const networkError = () => {
        swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please check your internet connection and try again.",
        });
    };

    return (
        <AuthContext.Provider value={{ user, apiDomain, createuser, removeuser, handleUnauthorized, fetchUserDetails,networkError }}>
            {children}
        </AuthContext.Provider>
    );
};
