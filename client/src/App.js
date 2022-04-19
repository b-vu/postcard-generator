import './App.css';
// import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import InstitutionSide from './pages/InstitutionSide/InstitutionSide';
import UserSide from './pages/UserSide/UserSide';
// import { useEffect, useState } from 'react';


function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/me")
  //   .then(res => {
  //     if(res.ok) {
  //       res.json()
  //       .then(user => setUser(user))
  //     }
  //   })
  // }, []);

  // if(!user) {
  //   return <Login></Login>
  // }

  return (
    <div>
      <Layout />
      <UserSide />
      <InstitutionSide />
    </div>
    // <Routes>
    //   <Route path="/" element={<Layout user={user} setUser={setUser} />}>
    //     <Route index element={<Home />} />
    //     <Route path="select" element={<Select />} />
    //     <Route path="login" element={<Login setUser={setUser}/>} />
    //     <Route path="org">
    //       <Route path="login" element={<OrgLogin setUser={setUser}/>} />
    //       <Route path="new_recipient" element={<NewRecipient />} />
    //     </Route>
    //     <Route path="new_postcard" element={<NewPostcard />} />
    //     <Route path="*" element={<NoPage />} />
    //   </Route>
    // </Routes>
  );
}

export default App;
