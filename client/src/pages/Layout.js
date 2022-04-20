import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Layout/Navbar"

function Layout({ user, setUser }) {
  return (
    <div>      
      <h1>Layout</h1>
      <main>
        <Navbar user={user} setUser={setUser} />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout