import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login";
import NewPostcard from "./pages/NewPostcard";
import NewRecipient from "./pages/NewRecipient";
import NoPage from "./pages/NoPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="new_postcard" element={<NewPostcard />} />
          <Route path="new_recipient" element={<NewRecipient />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
