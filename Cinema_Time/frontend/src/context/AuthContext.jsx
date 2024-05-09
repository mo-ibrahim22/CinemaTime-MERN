import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context to manage user authentication
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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

    return (
        <AuthContext.Provider value={{ user, createuser, removeuser }}>
            {children}
        </AuthContext.Provider>
    );
};
