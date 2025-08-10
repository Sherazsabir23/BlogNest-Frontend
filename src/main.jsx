import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import store from "./redux/store/store";
import Layout from "./Layout.jsx";
import AdminLayout from "./AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostCreate from "./pages/PostCreate.jsx";
import Home from "./pages/Home.jsx";
import PostsDetail from "./pages/PostsDetail.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserPosts from "./pages/UserPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Adminposts from "./pages/admin/AdminPosts.jsx";
import Adminusers from "./pages/admin/AdminUsers.jsx";
import Verify from "./pages/Verify.jsx";
import Comments from "./pages/admin/Comments.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NewPassword from "./pages/NewPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="createpost" element={<PostCreate />} />
        <Route path="post/:id" element={<PostsDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/yourposts" element={<UserPosts />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="posts" element={<Adminposts />} />
        <Route path="users" element={<Adminusers />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={1000} />
  </Provider>
);
