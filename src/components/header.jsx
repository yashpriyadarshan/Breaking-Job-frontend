import { useState } from "react"
import "./css/header.css"
import mainLogo from "../assets/main-logo.png"
import mainName from "../assets/main-name.png"
import defaultProfile from "../assets/default-profile.png"
import dropdownimage from "../assets/dropdown.png"

const list = [
    { title: "Jobs" },
    { title: "Company" },
    { title: "Community" }
]

function Header({ setActivePage, profile }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);

    return (
        <header>
            <div className="container">
                <img src={mainLogo}
                    alt="Breaking Job Logo"
                    className="main-logo"
                    onClick={(e) => {
                        e.preventDefault()
                        setActivePage("Home")
                        setMenuOpen(false)
                    }}
                    draggable="false"
                />
                <img src={mainName}
                    alt="Breaking Job Name"
                    className="main-name"
                    onClick={(e) => {
                        e.preventDefault()
                        setActivePage("Home")
                        setMenuOpen(false)
                    }}
                    draggable="false"
                />

                 {/*Hamburger */}
                <button
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(true)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div
                    className={`overlay ${menuOpen ? "show" : ""}`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                <div
                    className={`dropdownMenu ${menuOpen ? "active" : ""}`}
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                >
                    <p>For Candidate</p>
                    <img src={dropdownimage} alt="Dropdown" />

                    <div className="invisibleDropmenu"></div>
                    <div className={`dropMenu ${dropOpen ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault()
                            setActivePage('Employer')
                            setMenuOpen(false);
                        }}>
                        <p>For Employer</p>
                    </div>
                </div>

                <ul className={`nav ${menuOpen ? "active" : ""}`}>
                    {list.map((item, index) => (
                        <li key={index}
                            onClick={(e) => {
                                    e.preventDefault();
                                    setActivePage(item.title)
                                    setMenuOpen(false);
                                }}
                        >
                            
                                {item.title}
                            
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
                        src={defaultProfile}
                        alt="Profile picture"
                        className="profile-picture"
                        draggable="false"
                    />
                ) : (
                    <div className="login"
                            onClick={() => {
                                setActivePage("Login")
                                setMenuOpen(false)
                            }}
                        >Login
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header