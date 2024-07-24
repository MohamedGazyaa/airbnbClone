import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import AccountPage from "./Pages/AccountPage";
import { useSelector } from "react-redux";
import NewPlaceForm from "./Components/NewPlaceForm/NewPlaceForm";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  
  const user = useSelector((state) => state.currentUser.user);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:subpage?" element={user? <AccountPage />: <LoginPage />} />
        <Route path="/account/:subpage/new" element={user? <NewPlaceForm />: <LoginPage />} />
        <Route path="/account/:subpage/:id" element={user? <NewPlaceForm />: <LoginPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
