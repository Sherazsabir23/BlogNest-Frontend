// src/layouts/AdminLayout.jsx
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-64 p-6 w-full min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
