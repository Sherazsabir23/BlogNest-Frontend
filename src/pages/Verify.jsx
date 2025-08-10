// src/pages/VerifyOtp.jsx
import React, { useState } from "react";
import auth from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [disabled,setDisabled] = useState("false");
  const [timeleft,settimeLeft] =useState(30);
  const navigate = useNavigate();
  const location = useLocation();

   const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.verifyOtp({ email, otp });
      if (response && response.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error("Invalid or expired OTP");
      }
    } catch (err) {
      toast.error("Verification failed");
    }
  };

 
  
const handleResendOtp = async () => {
  setDisabled(true);
  settimeLeft(30);
  const response = await auth.resendOtp(email);
  if (response.success) {
    toast.success("OTP sent to your email again");
  } else {
    toast.error(response.message);
  }
};


useEffect(() => {
  let timer;
  if(disabled && timeleft > 0) {
  timer =  setTimeout(()=>{
 settimeLeft((prev)=> prev - 1);
    },1000)
  }

  if(timeleft === 0) {
    setDisabled(false);
  }

   return () => clearTimeout(timer);
}, [disabled,timeleft])


  
  return (
    <div className="w-full min-h-96  p-10 bg-slate-100 flex justify-center items-center">
      <div className=" text-center py-10 max-w-md w-full bg-slate-900 rounded-xl">
      <h2 className="text-center text-2xl text-white font-poppins mb-5">Verify OTP</h2>
      <form className=" px-10 flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          
        />
        <button className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Verify</button>
      </form>
      <button className="text-center mt-5  text-slate-500" onClick={handleResendOtp}>
        {disabled ? `Resend OTP in ${timeleft}s` :"Resend OTP" }
      </button>
      </div>

    </div>
  );
}

export default VerifyOtp;
