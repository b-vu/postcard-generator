import React from 'react'
import { useNavigate } from 'react-router-dom'

function Select() {
    let navigate = useNavigate()

    function handleRedirect(e) {
        e.target.value === "user" ? navigate("/login") : console.log("not yet")
    }

  return (
    <div>
        <h2>Are you a single user or and organization?</h2>
        <button value="user" onClick={handleRedirect}>user</button>
        <button value="organization" onClick={handleRedirect}>organization</button>
    </div>
  )
}

export default Select