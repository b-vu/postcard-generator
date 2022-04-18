import React, { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    first_name: "",
    last_name: ""
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    console.log(formData)
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data));
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
          <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="First Name"></input>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Last Name"></input>
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

export default Login