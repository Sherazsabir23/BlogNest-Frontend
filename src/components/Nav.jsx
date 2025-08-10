import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


function Nav() {
  const user = useSelector((state) => state.user.user);
  const [menu, setMenu] = useState(false);
const location = useLocation();
const isHome = location.pathname ==="/"
  return (
    <nav className={`w-full  z-50 ${isHome ? "absolute top-0 left-0 px-8 py-5" :"sticky  bg-slate-900 px-8 py-5  rounded"}`}>
      <div className="max-w-7xl mx-auto sm:px-10  flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-sky-400">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="sm:h-20 h-16 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex text-sm space-x-4 font-tiktok font-semibold text-sky-400">
          {user ? (
            <>
              <Link to="/" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">Home</Link>
              <Link to="/yourposts" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">My Posts</Link>
              <Link to="/createpost" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">Create Post</Link>
              <Link to="/profile" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">Your Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">Login</Link>
              <Link to="/register" className="border border-sky-400 py-3 px-6 rounded-full hover:bg-sky-400 hover:text-white">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="text-white font-semibold text-4xl z-50 md:hidden"
        >
          {menu ? "✕" : "☰"}
        </button>
      </div>

      {/* Full Screen Slide Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-slate-900/95 backdrop-blur-md text-sky-400 flex flex-col items-center justify-center space-y-6 transition-all duration-500 ease-in-out ${
          menu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } z-40`}
      >
        {user ? (
          <>
            <Link to="/" onClick={() => setMenu(false)} className="text-2xl">Home</Link>
            <Link to="/yourposts" onClick={() => setMenu(false)} className="text-2xl">My Posts</Link>
            <Link to="/createpost" onClick={() => setMenu(false)} className="text-2xl">Create Post</Link>
            <Link to="/profile" onClick={() => setMenu(false)} className="text-2xl">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenu(false)} className="text-2xl">Login</Link>
            <Link to="/register" onClick={() => setMenu(false)} className="text-2xl">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
