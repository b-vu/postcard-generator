import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    first_name: "",
    last_name: ""
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errors, setErrors] = useState(null);
  const [signupErrors, setSignupErrors] = useState(null)

  let navigate = useNavigate();

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function onLogin(user) {
    setUser(user);
    navigate("/");
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (isSigningUp) {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(r => {
          if(r.ok) {
            r.json()
            .then(user => onLogin(user));
          }
          else {
            r.json()
            .then(data => setSignupErrors(data.errors));
          }
        })
    }
    else {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((r) => {
          if (r.ok) {
            r.json()
              .then(user => onLogin(user));
          }
          else {
            r.json()
            .then(data => setErrors(data.error));
          }
        });
    }
  }

  function handleSignUpStateChange() {
    setIsSigningUp(!isSigningUp);
  }

  return (
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
              <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="First Name"></input>
              <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Last Name"></input>

              {
                signupErrors ?
                  signupErrors.map(error => <p className="text-red-500 font-serif text-center">{error}</p>)
                :
                  null
              }

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

              {
                errors ?
                <p className="text-red-500 font-serif text-center">{errors}</p>
                :
                null
              }

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
  )
}

export default Login