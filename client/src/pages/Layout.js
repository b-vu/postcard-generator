import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Layout/Navbar"
import Footer from "./Layout/Footer"

function Layout({ user, setUser, org }) {
  return (
    <div>
      <Navbar user={user} setUser={setUser} org={org} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout