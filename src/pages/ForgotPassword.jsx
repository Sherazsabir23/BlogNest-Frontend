import React, { useState } from 'react'
import { toast } from 'react-toastify';
import authApi from "../api/auth"
function ForgotPassword() {
const [email,setEmail ] = useState('');



  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
    const response = await authApi.forgotPassword(email);
    if(response.success)
      {
        toast.success("Reset Link Has Sent Successfully");
      }else{
        toast.error(response.message)
      }
    }catch(err){
  console.error("something went wrong",err)
    }

         
  }
     return (
    <div className="w-full min-h-96  sm:p-10 p-5 bg-slate-100 flex justify-center items-center">
      <div className="py-10 max-w-md w-full bg-slate-900 rounded-xl">
        <h2 className="text-center text-2xl text-white font-poppins mb-5">Forgot Password</h2>
        <form className=" md:px-10 px-5 flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
          <input
          type='Email'
            placeholder="Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
         
          <button className="text-white hover:bg-sky-500 bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Forgot Password</button>
        </form>
      </div>
    </div>
  );
  
}

export default ForgotPassword;