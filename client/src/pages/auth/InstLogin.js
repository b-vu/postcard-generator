import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function InstLogin({ setUser }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        institution_name: "",
        manager_name: ""
    });
    const [isSigningUp, setIsSigningUp] = useState(false);
    
    let navigate = useNavigate();
    
    function handleFormChange(e) {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    }

    function onLogin(user) {
    setUser(user)
    navigate("/org/recipients")
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (isSigningUp) {
            fetch("/inst-signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(user => onLogin(user));
        } 
        else {
            fetch("/inst-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((r) => r.json())
            .then(user => onLogin(user));
        }
    }
    
    function handleSignUpStateChange() {
        setIsSigningUp(!isSigningUp);
    }


    return (
        <div>
            {
            isSigningUp ?
            <form onSubmit={handleFormSubmit}>
                Sign Up
                <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username"></input>
                <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password"></input>
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleFormChange} placeholder="Password Confirmation"></input>
                <input type="text" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email"></input>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Institution Name"></input>
                <input type="text" name="manager_name" value={formData.manager_name} onChange={handleFormChange} placeholder="Manager's First Name"></input>
                <button>Submit</button>

                Already have an account? <button onClick={handleSignUpStateChange}>Login</button>
            </form>
            :
            <form onSubmit={handleFormSubmit}>
                Login
                <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username"></input>
                <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password"></input>
                <button>Submit</button>

                Don't have an account? <button onClick={handleSignUpStateChange}>Sign up</button>
            </form>
            }
        </div>
    )
}


export default InstLogin