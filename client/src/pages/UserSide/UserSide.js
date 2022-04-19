import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout"
import Home from "./Home";
import Login from "../auth/Login";
import Select from "../auth/Select";
import NewPostcard from "./NewPostcard";
// import NoPage from "./NoPage";
import { useEffect, useState } from 'react';

function UserSide() {

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

    return (
        <Routes>
            <Route path="/" element={<Layout user={user} setUser={setUser} />}>
                <Route index element={<Home />} />
                <Route path="select" element={<Select />} />
                <Route path="login" element={<Login setUser={setUser}/>} />
                <Route path="new_postcard" element={<NewPostcard />} />
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default UserSide