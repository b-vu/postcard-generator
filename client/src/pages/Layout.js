import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Layout/Navbar"

function Layout({ user, setUser }) {
  return (
    <div>      
      <main>
        <Navbar user={user} setUser={setUser} />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout