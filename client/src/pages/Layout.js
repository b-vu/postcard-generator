import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./Layout/Navbar"
import Footer from "./Layout/Footer"

function Layout({ user, setUser }) {
  return (
    <div className="">
      <Navbar user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout