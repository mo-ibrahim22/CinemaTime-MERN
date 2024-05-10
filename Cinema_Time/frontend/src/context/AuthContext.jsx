import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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

    return (
        <AuthContext.Provider value={{ user, apiDomain, createuser, removeuser, handleUnauthorized }}>
            {children}
        </AuthContext.Provider>
    );
};
