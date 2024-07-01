import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  };

  return (
    <div className="flex  flex-col mb-32 grow items-center justify-center py-24">
      <h1 className="text-4xl text-center mb-10">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="text"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-primary w-full p-2 text-white rounded-2xl"
        >
          Sign Up
        </button>
        <div className="text-center py-2 text-gray-500">
          Already have an account?
          <Link className="underline text-black" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
