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

    let homeLink;
    if (user) {
        if (user.manager_name) {
            homeLink = <Link to="/org/recipients/postcards">Postcards</Link>
        } else {
            homeLink = <Link to="/">Home</Link>
        } 
    } else {
        homeLink = <Link to="/">Home</Link>
    }

    let button;
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
    <nav className='flex justify-between items-center py-8 mx-auto h-20 bg-stone-200 font-sans text-black text-xl sticky top-0 z-30 w-full px-2 sm:px-4 shadow-sm' role='navigation'>
        <div className="flex items-center">
            <h3 className="px-2 text-2xl font-serif font-medium text-black"><Link to="/">POSTCARD CREATOR</Link></h3>
        </div>
        <div className='pr-10 md:block'>
            <button className='p-4 bg-stone-200 hover:bg-stone-400 transition duration-300 ease-in-out font-serif'>
                {homeLink}
            </button>
            <button className='p-4 bg-stone-200 hover:bg-stone-400 transition duration-300 ease-in-out font-serif'>
                {newCreation}
            </button>
            <button className='p-4 bg-stone-200 hover:bg-stone-400 transition duration-300 ease-in-out font-serif'>
                {button}
            </button>
        </div>
    </nav>
    )
}

export default Navbar