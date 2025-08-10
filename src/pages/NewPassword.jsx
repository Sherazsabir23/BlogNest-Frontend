import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../api/auth'; // Assuming you have an API endpoint
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await auth.resetPassword(token,newPassword);

      if (response.success) {
        toast.success("Password Update successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Reset failed");
      }
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("An error occurred. Try again.");
    }
  };

  return (
    <div className="w-full min-h-96 sm:p-10 p-5 bg-slate-100 flex justify-center items-center">
      <div className="py-10 max-w-md w-full bg-slate-900 rounded-xl">
        <h2 className="text-center text-2xl text-white font-poppins mb-5">Reset Password</h2>
        <form
          className="sm:px-10 px-5 flex w-full justify-center items-center flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white"
          />
          <button
            className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
