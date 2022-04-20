import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function Navbar( {user, setUser} ) {

    let navigate = useNavigate()

    function handleLogout () {
        if (user.manager_name) {
            fetch("/inst-logout", {
            method: "DELETE",
            }).then(() => onLogout());
        } 
        else {
            fetch("/logout", {
            method: "DELETE",
            }).then(() => onLogout());
        }
    }

    function onLogout() {
        setUser(null)
        navigate('/')
    }

    function handleLogin() {
        navigate("/select")
    }

    let homeLink
    if (user) {
        if (user.manager_name) {
            homeLink = <Link to="/org">Home</Link>
        } else {
            homeLink = <Link to="/">Home</Link>
        } 
    } else {
        homeLink = <Link to="/">Home</Link>
    }

    let button
    if (user){
        button = <button onClick={handleLogout}>Logout</button>
    } else {
        button = <button onClick={handleLogin}>Login</button>
    }

    // Conditional rendering of the new postcard/recipient     
    let newCreation;
    if (user){
        if(user.manager_name){
            newCreation = <Link to="/org/recipients">Recipients</Link>
        } else {
            newCreation = <Link to="/new_postcard">New Postcard</Link>
        }
    } else {
        newCreation = <Link to="/login">New Postcard</Link>
    }


    return (
    <nav>
        {homeLink}
        {newCreation}
        {button}
    </nav>
    )
}

export default Navbar