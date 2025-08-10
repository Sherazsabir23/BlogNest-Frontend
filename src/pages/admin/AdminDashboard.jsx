import React, { useState, useEffect } from "react";
import auth from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import adminApi from "../../api/admin";
import StatsCard from "../../components/StatsCard";

function AdminDashboard() {
  const [totalposts, settotalPosts] = useState(0);
  const [totalusers, settotalUsers] = useState(0);
  const [posts,setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [users,setUsers] = useState([]);
  const [range, setRange] = useState("");
  const navigate = useNavigate();

  // ✅ Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await auth.adminChecker();
        if (response.success) {
          toast.success("Admin Verified");
          const usersData = await adminApi.totalUsers();
          const postsData = await adminApi.totalPosts();

          settotalUsers(usersData.totalUsers);
          settotalPosts(postsData.totalPosts);
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

  const handleChange = async(e) => {
    const selectedRange = e.target.value;
    setRange(selectedRange);
    try{
const response = await adminApi.filterData(selectedRange);
if(response.success){
    setUsers(response.users);
    setPosts(response.posts);
    setComments(response.comments);
}
    }catch(err){
     console.log("Server error:" ,err);
     toast.error(response.err)
     
    }
  };

  return (
    <div className=" w-full  pt-16">
      <h2 className="text-2xl text-center md:text-left font-bold mb-4">
        Admin Dashboard
      </h2>
      <div className="grid sm:grid-cols-2 w-full gap-4">
        <div className="bg-blue-500 text-white w-full p-6 rounded shadow">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-3xl font-bold">{totalusers}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h3 className="text-lg">Total Posts</h3>
          <p className="text-3xl font-bold">{totalposts}</p>
        </div>
      </div>
       <div className="flex justify-center w-full mt-4 pt-5">
             <select
  className="border w-full max-w-md px-5 py-3 outline-none bg-slate-800 text-white rounded-lg "
  value={range}
  onChange={handleChange}
> 
 <option value="today">Today</option>
  <option value="yesterday">Yesterday</option>
  <option value="thisWeek">This Week</option>
  <option value="lastWeek">Last Week</option>
  <option value="thisMonth">This Month</option>
  <option value="lastMonth">Last Month</option>
  <option value="thisYear">This Year</option>
  <option value="lastYear">Last Year</option>
</select>
       </div>
      <div className="grid w-full  md:grid-cols-3 mt-4  gap-4">
        <StatsCard title="Users" counts={users.length} />
        <StatsCard title="Comments" counts={comments.length} />
        <StatsCard title="Posts"  counts={posts.length} /> 
      </div>
    </div>
  );
}

export default AdminDashboard;
