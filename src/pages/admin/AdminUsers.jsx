import React, { useState, useEffect } from "react";
import apiAuth from "../../api/auth";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ string, not array
  const navigate = useNavigate();
  // ✅ Correctly filter users by name or email
  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  //admin checker 

  useEffect(() => {
        const checkAdmin = async () => {
          try {
            const response = await apiAuth.adminChecker();
            if (response.success) {
              toast.success("Admin Verified");
            } else {
              toast.error("Not authorized to access admin area.");
              navigate("/");
            }
          } catch (err) {
            console.error("Error:", err);
            toast.error("Not authorized to access admin area.");
            navigate("/");
          }
        };
        checkAdmin();
      }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await apiAuth.allUsers();
      if (res.success) {
        setUsers(res.allUsers);
      } else {
        toast.error("No users found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await apiAuth.deleteUser(id);
      if (res.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:text-left text-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <input
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-100 text-center ">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="border p-2">No.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found
              </td>
            </tr>
          ) : (
            filteredUser.map((user, index) => (
              <tr key={user._id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role || "User"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminUsers;
