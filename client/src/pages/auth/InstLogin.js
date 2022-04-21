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
        <>
            <div className='h-screen flex'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    {
                    isSigningUp ?
                    <form onSubmit={handleFormSubmit}>
                        <h1 className='font-serif text-4xl font-bold text-primary mt-4 mb-12 text-center'>
                        SIGN UP
                        </h1>

                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleFormChange} placeholder="Password Confirmation"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Institution Name"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="manager_name" value={formData.manager_name} onChange={handleFormChange} placeholder="Manager's First Name"></input>

                        <div className='flex justify-center items-center mt-6'>
                            <button className={`font-serif text-center py-2 px-4 bg-stone-200 rounded-full text-base hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"`}>Submit</button>
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button className={`font-serif text-center py-2 px-4 bg-stone-200 rounded-full text-base hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"`} onClick={handleSignUpStateChange}>Already have an account? Login</button>
                        </div>
                    </form>
                    :
                    <form onSubmit={handleFormSubmit}>
                        <h1 className='font-serif text-4xl font-bold text-primary mt-4 mb-12 text-center'>
                            LOGIN
                        </h1>

                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username"></input>
                        <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password"></input>
                        
                        <div className='flex justify-center items-center mt-6'>
                            <button className={`font-serif text-center py-2 px-4 bg-stone-200 rounded-full text-base hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"`}>Submit</button>
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button className={`font-serif text-center py-2 px-4 bg-stone-200 rounded-full text-base hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"`} onClick={handleSignUpStateChange}>Don't have an account? Sign up</button>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </>
    )
}


export default InstLogin