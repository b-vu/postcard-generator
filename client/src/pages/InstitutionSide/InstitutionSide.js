import React from 'react'
import { Routes, Route } from "react-router-dom";
import InstitutionHome from './InstitutionHome';
import InstLogin from '../auth/InstLogin';
import NewRecipient from './NewRecipient';
import NoPage from './NoPage';
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
      <Route path="/org">
        <Route index element={<InstitutionHome />} />
        <Route path="login" element={<InstLogin setUser={setUser}/>} />
        <Route path="new_recipient" element={<NewRecipient />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default InstitutionSide