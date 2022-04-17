import React from 'react'
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>      
      <h1>Layout</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout