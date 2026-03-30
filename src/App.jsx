import './components/css/App.css'
import {useState} from "react";
import Header from './components/header'
import Home from './components/home'
import Login from './components/login'
import Job from './components/job'
import Community from './components/community'
import Company from './components/company'
import Salary from './components/salary'

function App() {
    const [activePage, setActivePage] = useState("Home");
    const [jwt, setJwt] = useState('')
    const [profile, setProfile] = useState(null);

  return (
    <div className="App">
        <Header setActivePage={setActivePage} profile={profile} />

        {activePage === "Home" && <Home />}
        {/* {activePage === "Employer" && <Company />} */}
        {activePage === "Jobs" && <Job />}
        {activePage === "Company" && <Company />}
        {activePage === "Salary" && <Salary />}
        {activePage === "Community" && <Community />}
        {/*{activePage === "Profile" && <Profile user={user} setUser={setUser} />}*/}
        {activePage === "Login" && <Login jwt={jwt} setJwt={setJwt} profile={profile} setProfile={setProfile} />}
    </div>  
  )
}

export default App
