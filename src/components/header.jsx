import { useState } from "react"
import "./css/header.css"
import mainLogo from "../assets/main-logo.png"
import mainName from "../assets/main-name.png"
import defaultProfile from "../assets/default-profile.png"

const list = [
    { title: "Community" },
    { title: "Jobs" },
    { title: "Company" },
    { title: "Salary" }
]

function Header({ setActivePage }) {

    const [menuOpen, setMenuOpen] = useState(false);

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

                <img
                    src={defaultProfile}
                    alt="Profile picture"
                    className="profile-picture"
                    onClick={() => {
                        setActivePage("Login")
                        setMenuOpen(false)
                    }}
                    draggable="false"
                />
            </div>
        </header>
    );
}

export default Header