import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Select from "./pages/auth/Select";
import Login from "./pages/Login";
import NewPostcard from "./pages/NewPostcard";
import NewRecipient from "./pages/NewRecipient";
import NoPage from "./pages/NoPage"
import { useEffect, useState } from 'react';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me")
    .then(res => {
      if(res.ok) {
        res.json()
        .then(user => setUser(user))
      }
    })
  }, []);

  // if(!user) {
  //   return <Login></Login>
  // }

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index element={<Home />} />
        <Route path="select" element={<Select />} />
        <Route path="login" element={<Login setUser={setUser}/>} />
        <Route path="new_postcard" element={<NewPostcard />} />
        <Route path="new_recipient" element={<NewRecipient />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
