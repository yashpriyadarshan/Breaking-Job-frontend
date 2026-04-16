import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/css/header.css'; // Adjust CSS if necessary

const Profile = () => {
    const { profile, logout, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div className="profile-page"><h2>Loading...</h2></div>;
    }

    if (!profile) {
        return (
            <div className="profile-page" style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>You are not logged in.</h2>
                <button type="button" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Welcome, {profile.username || profile.email}</h2>

            {profile.profilePicture && (
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}${profile.profilePicture}?t=${Date.now()}`}
                    alt="Profile"
                    width="150"
                    style={{ borderRadius: "50%", marginBottom: '1rem' }}
                />
            )}

            <div style={{ marginTop: '2rem' }}>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
