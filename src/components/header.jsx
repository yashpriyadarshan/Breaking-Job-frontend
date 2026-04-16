import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/header.css";
import mainLogo from "../assets/main-logo.png";
import mainName from "../assets/main-name.png";
import defaultProfile from "../assets/default-profile.png";
import dropdownimage from "../assets/dropdown.png";

const list = [
    { title: "Jobs", path: "/jobs" },
    { title: "Company", path: "/company" },
    { title: "Community", path: "/community" }
];

const Header = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate("/");
        setMenuOpen(false);
    };

    return (
        <header>
            <div className="container">
                <img 
                    src={mainLogo}
                    alt="Breaking Job Logo"
                    className="main-logo"
                    onClick={handleHomeClick}
                    draggable="false"
                    role="button"
                    tabIndex={0}
                />
                <img 
                    src={mainName}
                    alt="Breaking Job Name"
                    className="main-name"
                    onClick={handleHomeClick}
                    draggable="false"
                    role="button"
                    tabIndex={0}
                />

                {/* Hamburger */}
                <button
                    type="button"
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div
                    className={`overlay ${menuOpen ? "show" : ""}`}
                    onClick={() => setMenuOpen(false)}
                    role="presentation"
                ></div>

                <div
                    className={`dropdownMenu ${menuOpen ? "active" : ""}`}
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                >
                    <p>For Candidate</p>
                    <img src={dropdownimage} alt="Dropdown" />

                    <div className="invisibleDropmenu"></div>
                    <div 
                        className={`dropMenu ${dropOpen ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/employer');
                            setMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <p>For Employer</p>
                    </div>
                </div>

                <ul className={`nav ${menuOpen ? "active" : ""}`}>
                    {list.map((item, index) => (
                        <li key={index}>
                            <Link 
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                style={{textDecoration: 'none', color: 'inherit'}}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <input
                    className="search-box"
                    type="text"
                    placeholder="Search"
                />

                {profile ? (
                    <img
                        src={profile.profilePicture ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}${profile.profilePicture}` : defaultProfile}
                        alt="Profile"
                        className="profile-picture"
                        draggable="false"
                        onClick={() => {
                            navigate('/profile');
                            setMenuOpen(false);
                        }}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                    />
                ) : (
                    <div 
                        className="login"
                        onClick={() => {
                            navigate("/login");
                            setMenuOpen(false);
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        Login
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;