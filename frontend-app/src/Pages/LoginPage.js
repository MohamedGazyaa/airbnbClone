import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/currentUserSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.currentUser.loading);
  const status = useSelector((state) => state.currentUser.status);
  const error = useSelector((state) => state.currentUser.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (status === "succeeded") {
        navigate('/')
      }
      if (status === "failed") {
        alert(error);
      }
    }
  }, [status]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex  flex-col mb-32 grow items-center justify-center py-24">
      <h1 className="text-4xl text-center mb-10">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLogin}>
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-2 bg-primary w-full p-2 text-white rounded-2xl"
          type="submit"
        >
          Login
        </button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?
          <Link className="underline text-black" to="/register">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
