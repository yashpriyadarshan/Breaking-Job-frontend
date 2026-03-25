import { useState, useEffect } from 'react'
import './css/header.css'

function Profile({user, setUser}) {

    const [activeForm, setActiveForm] = useState('signup')
    const [loading, setLoading] = useState(true)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)

    useEffect(() => {

        fetch("http://localhost:8080/auth/me", {
            credentials: "include"
        })
        .then(res => {
            if(!res.ok) throw new Error()
            return res.json()
        })
        .then(data => {
            setUser(data)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })

    }, [])

    const handleSignup = async (e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append(
            "user",
            new Blob(
                [JSON.stringify({
                    username,
                    password,
                    enabled: true,
                    authority: "ADMIN"
                })],
                {type: "application/json"}
            )
        )

        if(profilePicture) {
            formData.append("profilePicture", profilePicture)
        }

        await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            body: formData
        })
    }

    const handleLogin = async (e) => {

        e.preventDefault()

        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if(res.ok) {
            const data = await res.json()
            setUser(data)
        }
    }

    if(loading) {
        return <div className="profile-page"><h2>Loading...</h2></div>
    }

    if(user) {
        return (
            <div className="profile-page">

                <h2>Welcome {user.username}</h2>

                {user.profilePicture && (
                    <img
                        src={`http://localhost:8080${user.profilePicture}?t=${Date.now()}`}
                        alt="Profile"
                        width="150"
                        style={{borderRadius: "50%"}}
                    />
                )}

                <button
                    onClick={async () => {

                        await fetch("http://localhost:8080/auth/logout", {
                            method: "POST",
                            credentials: "include"
                        })

                        setUser(null)
                        setActivePage("Home")
                    }}
                >
            Logout
        </button>

            </div>
        )
    }

    return (
        <div className="profile-page">

            <div className="LSmenu">
                <button
                    className='SButton'
                    onClick={() => setActiveForm('signup')}
                >
                    Signup
                </button>

                <button
                    className='LButton'
                    onClick={() => setActiveForm('login')}
                >
                    Login
                </button>
            </div>

            <div className="LSOptions">

                {activeForm === "signup" && (
                    <div className="signup">

                        <h2>Sign Up</h2>

                        <form onSubmit={handleSignup}>

                            <input
                                type="text"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setProfilePicture(e.target.files[0])}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button type="submit">
                                Sign Up
                            </button>

                        </form>

                    </div>
                )}

                {activeForm === "login" && (
                    <div className="login">

                        <h2>Login</h2>

                        <form onSubmit={handleLogin}>

                            <input
                                type="text"
                                placeholder="username"
                                onChange={e => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button type="submit">
                                Login
                            </button>

                        </form>

                    </div>
                )}

            </div>

        </div>
    )
}

export default Profile