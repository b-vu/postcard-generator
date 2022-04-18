import React from 'react'
import { Outlet, useNavigate } from "react-router-dom"

function Layout({ user, setUser }) {
  let navigate = useNavigate()

  function handleLogout () {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  function onLogout() {
    setUser(null)
    navigate('/')
  }

  function handleLogin() {
    navigate("/login")
  }

  let button
  if (user){
    button = <button onClick={handleLogout}>Logout</button>
  } else {
    button = <button onClick={handleLogin}>Login</button>
  }


  return (
    <div>      
      <h1>Layout</h1>
      <main>
        {button}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout