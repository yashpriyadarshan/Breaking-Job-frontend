import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import '../components/css/login.css';
import mainNameVertical from "../assets/main-name-vertical.png";
import googleLogo from "../assets/google.png";
import githubLogo from "../assets/github.svg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, profile } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            if (response.data && response.data.jwtToken) {
                login(response.data.jwtToken);
                setMessage('Login successful!');
                navigate('/');
            } else {
                setMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Login Error:", error);
            setMessage('An error occurred during login. Please try again later.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await api.post('/auth/signup', {
                email: form.email,
                password: form.password
            });
            if (response.status === 200 || response.status === 201) {
                setEmail(form.email);
                setPassword(form.password);
                setIsSignup(false);
                setMessage('Signup successful. Please login.');
            } else {
                setMessage("Signup failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setMessage('An error occurred during signup.');
        }
    };

    return (
        <div className="profile-page">
            {!profile ? (
                <div className={`login-signup-box ${!isSignup ? "active" : ""}`}>
                    <div className='form-title'>
                        <div 
                            className={`title login-title ${!isSignup ? "active" : ""}`} 
                            onClick={() => setIsSignup(false)}
                            role="button"
                            tabIndex={0}
                        >
                            Login
                        </div>
                        <div 
                            className={`title signup-title ${isSignup ? "active" : ""}`} 
                            onClick={() => setIsSignup(true)}
                            role="button"
                            tabIndex={0}
                        >
                            Sign Up
                        </div>
                    </div>
                    
                    {message && <p className="message-box" style={{textAlign: 'center', color: 'red'}}>{message}</p>}

                    {!isSignup ? (
                        <div className="login-box">
                            <img className="main-name-vertical" src={mainNameVertical} alt="breaking job logo" draggable="false" />
                            <div className="login-signup-form">
                                <form onSubmit={handleLogin}>
                                    <div>
                                        <input
                                            type="text"
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit">Login</button>
                                </form>
                            </div>
                            <div className="forget-bar">
                                <button type="button" className="text-button">Forget password?</button>
                            </div>
                        </div>
                    ) : (
                        <div className="signup-box">
                            <img className="main-name-vertical" src={mainNameVertical} alt="breaking job logo" draggable="false" />
                            <div className="login-signup-form">
                                <form onSubmit={handleSignup}>
                                    <div>
                                        <input
                                            type="text"
                                            name="email"
                                            value={form.email}
                                            placeholder="Email"
                                            onChange={handleChange} />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            placeholder="Password"
                                            onChange={handleChange} />
                                    </div>
                                    <button type="submit">Sign Up</button>
                                </form>
                            </div>
                            <div className="forget-bar">
                                Have an account?
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => setIsSignup(false)}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    )}
                    <div className={`other-login-option`}>
                        <p>or you can login with</p>
                        <div className="other-logo">
                            <img className={`other-login-logo`} src={googleLogo} alt="Google Logo" draggable={`false`} />
                            <img className={`other-login-logo`} src={githubLogo} alt="Github Logo" draggable={`false`} />
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{textAlign: 'center', padding: '2rem'}}>
                    <h3>User Profile</h3>
                    <p>Name: {profile.email || profile.username}</p>
                    {profile.roles && <p>Roles: {profile.roles.join(', ')}</p>}
                    {profile.message && <p>Message: {profile.message}</p>}
                    <button type="button" onClick={() => navigate('/')}>Go to Home</button>
                </div>
            )}
            <div className="profile-footer">
                <Footer />
            </div>
        </div>
    );
};

export default Login;
