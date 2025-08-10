// src/pages/UserPosts.jsx
import React, { useEffect, useState } from "react";
import posts from "../api/posts";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await posts.myPosts();
        if (response.success) {
          setUserPosts(response.posts);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // red
      cancelButtonColor: "#3085d6", // blue
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await posts.deletePost(postId);

        if (response && response.success) {
          toast.success("Post deleted successfully");

          setUserPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
          );
        } else {
          toast.error("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <>
      <section className=" bg-white w-full pb-4 min-h-screen">
        <div className="mx-auto p-5 max-w-6xl">
          <h2 className="text-center mb-20 mt-9 text-4xl font-semibold font-poppins capitalize">
            Explore the latest posts and updates.
          </h2>

          {/* grid layout */}
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {userPosts.map((Post) => (
              <div className="bg-slate-800 text-white rounded-xl shadow-lg overflow-hidden max-w-xs w-full transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
                {/* Image */}
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:3000/uploads/${Post.image}`}
                  alt={Post.title}
                />

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold leading-snug font-poppins line-clamp-3">
                    {Post.title}
                  </h2>

                  <div className="flex justify-center">
                    <Link
                      className="bg-sky-500 hover:bg-sky-600 text-white text-sm px-4 py-2 rounded-full transition"
                      to={`/post/${Post._id}`}
                    >
                      Read Blog
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-3">
                    <Link
                      className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-2 rounded-full transition"
                      to={`/edit/${Post._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full transition"
                      onClick={() => handleDelete(Post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserPosts;
