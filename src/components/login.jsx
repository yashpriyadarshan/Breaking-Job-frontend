import React, {useState} from "react";
import './css/login.css'
import mainNameVertical from "../assets/main-name-vertical.png"
import googleLogo from "../assets/google.png"
import githubLogo from "../assets/github.svg"
import Footer from "./footer.jsx"

const Login = ({jwt, setJwt, profile, setProfile}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({
        username: "",
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

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            if(response.ok) {
                const data = await response.json();
                console.log('Login successful:', data)
                setJwt(data.jwtToken)
                setMessage('Login successful!');
                fetchUserProfile(data.jwtToken);

            } else {
                setMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Error: " + error);
            setMessage('An error occurred during login. Please try again later.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append("username", form.username);
            params.append("password", form.password);
            params.append("role", 'USER');

            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });

            if (response.ok) {
                const data = await response.text();
                // setMessage(data);

                setUsername(form.username);
                setPassword(form.password);
            } else {
                setMessage("Signup failed");
            }

        } catch (error) {
            console.log("Error: " + error);
            setMessage('An error occured during signup');
        }
    };

    const fetchUserProfile = async (token) => {

        try {
            const response = await fetch('http://localhost:8080/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if(response.ok) {
                const data = await response.json();
                console.log('Profile fetched successfully:', data)
                console.log('Profile set successfully:', data)
                setProfile(data)
            } else {
                setMessage('Failed to fetch profile. Please check your credentials.');
            }
        } catch (error) {
            console.error("Error: " + error);
            setMessage('An error occurred while fetching the profile. Please try again later.');
        }
    };

    return (
        <div className="profile-page">
            {!profile ? (
                <div className={`login-signup-box ${!isSignup ? "active" : ""}`}>
                    <div className='form-title'>
                        <div className={`title login-title ${!isSignup ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setIsSignup(false);
                        }}>Login</div>
                        <div className={`title signup-title ${isSignup ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setIsSignup(true);
                        }}>Sign Up</div>
                    </div>
                    {!isSignup ? (
                        <div className="login-box">
                            <img className="main-name-vertical" src={mainNameVertical} alt="breaking job logo" draggable="false" />
                            <div className="login-signup-form">
                                <form onSubmit={handleLogin}>
                                    <div>
                                        <input
                                            type="text"
                                            value={username}
                                            placeholder="Username or E-mail"
                                            onChange={(e) => setUsername(e.target.value)} />
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
                                <a href="#">Forget password?</a>
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
                                            name="username"
                                            value={form.username}
                                            placeholder="Username or E-mail"
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
                                <a href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSignup(false);
                                    }}
                                >Login</a>
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
                <div>
                    <h3>User Profile</h3>
                    <p>Name: {profile.username}</p>
                    <p>Roles: {profile.roles.join(', ')}</p>
                    <p>Message: {profile.message}</p>
                </div>
            )}
            {jwt && <p>{jwt}</p>}
            <div className="profile-footer">
                <Footer />
            </div>
        </div>
    )
}

export default Login;