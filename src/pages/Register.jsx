// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {toast} from "react-toastify"
import auth from "../api/auth";


function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.registerUser(form);
      if (response && response.success) {
        toast.success("OTP sent to your email");
        navigate(`/verify?email=${form.email}`);
      } else {
        alert("Registration failed: " + (response.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="w-full min-h-96  sm:p-10 p-5 bg-slate-100 flex justify-center items-center">
      <div className="py-10 max-w-md w-full bg-slate-900 rounded-xl">
        <h2 className="text-center text-2xl text-white font-poppins mb-5">Register</h2>
        <form className=" md:px-10 px-5 flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
                        className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
                        className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <button className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Register</button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
  Already have an account?{" "}
  <Link to="/login" className="text-sky-500 font-semibold hover:underline">
    Login
  </Link>
</p>
      </div>
    </div>
  );
}

export default Register;
