// src/components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        className="text-black font-semibold text-3xl md:hidden fixed top-5 left-5 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 pt-10 w-64 min-h-screen bg-gray-800 text-white p-5 fixed top-0 left-0 transition-all duration-200`}
      >
        <h2 className="text-2xl mt-10 font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="dashboard" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            Dashboard
          </Link>
          <Link to="users" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            Users
          </Link>
          <Link to="posts" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            Posts
          </Link>
          <Link to="comments" onClick={()=>setIsOpen(false)} className="hover:text-yellow-300">Comments</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
