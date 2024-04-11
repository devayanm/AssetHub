import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Add your authentication logic here
        // For example, you might check if a token is present in localStorage or cookies
        // You can also check if the user is logged in by making an API request

        const isAuthenticated = localStorage.getItem('accessToken') !== null;
        setIsLoggedIn(isAuthenticated);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/signin" />;
    }

    return children;
};

export default ProtectedRoute;
