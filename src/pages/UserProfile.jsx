import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
import { clearUser,setUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";

function UserProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const handleLogout = async () => {
    try {
      const response = await auth.logoutUser();
      if (response.success) {
        toast.success("Logout Successfully");
        dispatch(clearUser());
        navigate("/");
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
    const imageUrl = user.profileImage
      ? `http://localhost:3000/uploads/${user.profileImage}`
      : "/default-user.png";
    setPreview(imageUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("http://localhost:3000/api/users/upload-profile", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Profile picture updated");
         
        setIsModalOpen(false);
        window.location.reload();
        
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Error uploading image");
      console.error(err);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full  px-5 py-16 relative">
      {/* Profile card */}
      <div className="max-w-sm w-full rounded-lg mx-auto bg-slate-900 p-6 sm:p-10 md:p-14 lg:p-20 text-white text-center">
        <h2 className="text-2xl mb-5">User Profile</h2>

        {/* Circular profile image */}
        <div className="mb-5">
          <img
            src={
              user.profileImage
                ? `http://localhost:3000/uploads/${user.profileImage}`
                : "/default-user.png"
            }
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full object-cover cursor-pointer border-4 border-sky-400 hover:opacity-90 transition"
            onClick={handleImageClick}
          />
          <p className="text-sm mt-2 text-gray-300">Click to preview / change</p>
        </div>

        {/* User Info */}
        <div className="text-left space-y-3">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {formattedDate}</p>
        </div>

        <button
          className="mt-6 w-full bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg text-center relative w-80">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Update Profile Image</h3>
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <input
              type="file"
              accept="image/*"
              className="block w-full mb-4"
              onChange={handleImageChange}
            />
            <button
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
