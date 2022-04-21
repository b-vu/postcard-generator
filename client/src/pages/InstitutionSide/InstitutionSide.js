import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout"
import InstLogin from '../auth/InstLogin';
import Recipients from './Recipients'
import Postcards from './Postcards'
import { useEffect, useState } from 'react';


function InstitutionSide() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/inst")
    .then(res => {
      if(res.ok) {
        res.json()
        .then(user => setUser(user))
      }
    })
  }, []);

  return (
    <Routes>
      <Route path="/org" element={<Layout user={user} setUser={setUser} />}>
        <Route path="login" element={<InstLogin setUser={setUser}/>} />
        <Route path="recipients">
          <Route index element={<Recipients user={user} />} />
          <Route path="postcards" element={<Postcards />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default InstitutionSide
