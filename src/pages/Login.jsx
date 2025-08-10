import React, { useState } from "react";
import auth from "../api/auth"; 
import { useNavigate,Link } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await auth.loginUser({ email, password });
      if(response && response.success){
        toast.success("Login successful");
    
        dispatch(setUser(response.user));

        if(response.user.role ==="admin"){
          navigate("/admin/dashboard")
        }else
        navigate("/");
      }else{
        toast.error("Invalid Email or password")
        if(response.unverified) {
          toast.info("Please verify your email first");
          navigate(`/verify?email=${email}`)
        }
      }
    } catch(error) {
      toast.error("Invalid Email or password")
      console.error("Error during login:", error);
      
    }
  };

  return (
    <div className="w-full min-h-96  sm:p-10 p-5 bg-slate-100 flex justify-center items-center">
      <div className=" py-10 max-w-md w-full bg-slate-900 rounded-xl">
        <h2 className="text-center text-2xl text-white font-poppins mb-5">Login</h2>
        <form className=" sm:px-10 px-5 flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
             className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
             className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <button className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Login</button>
        </form>
        <p className="text-center text-sm text-slate-400 pt-5">
          Forgot Your Password?{" "}
          <Link className="text-sky-500 font-semibold hover:underline" to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
