import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [jwt, setJwt] = useState(localStorage.getItem('jwtToken') || '');
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            // Using the api interceptor, so no need to pass Authorization header manually if token exists
            const response = await api.get('/user/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (jwt) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [jwt]);

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        setJwt(token);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setJwt('');
        setProfile(null);
    };

    const value = {
        profile,
        jwt,
        login,
        logout,
        loading,
        fetchUserProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
