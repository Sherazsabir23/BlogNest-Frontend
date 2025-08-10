import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/features/userSlice";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import auth from "./api/auth";
import {toast} from "react-toastify"

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await auth.userDetails();
        if (response && response.user) {
          dispatch(setUser(response.user));
        }
      } catch (err) {
        dispatch(clearUser());
        toast.info("Session expired. Please log in again.");
        navigate("/login");
        
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return (
    <>
      <Nav />
      <main>
        
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
