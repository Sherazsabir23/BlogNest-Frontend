import React, { useState, useEffect } from "react";
import apiPost from "../../api/posts";
import auth from "../../api/auth"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //admin checker 
  useEffect(() => {
      const checkAdmin = async () => {
        try {
          const response = await auth.adminChecker();
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiPost.allPosts();
        if (response.success) {
          setPosts(response.posts);
        } else {
          console.error("Failed to fetch posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await apiPost.deletePost(postId);
        if (response && response.success) {
          toast.success("Post deleted successfully");
          setPosts((prevPosts) =>
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
    <div className="p-4 md:text-left text-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      <input
        placeholder="Search by title or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse border border-gray-300 text-sm sm:text-base">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-2 border">Sr#</th>
              <th className="p-2 border hidden lg:table-cell">Post Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border whitespace-nowrap">Created AT</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No post found
                </td>
              </tr>
            ) : (
              filteredPosts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="p-4 border text-center">{index + 1}</td>
                  <td className="p-4 border text-center hidden  lg:table-cell break-words">{post.title}</td>
                  <td className="p-4 border text-center">{post.author.email}</td>
                  <td className="p-4 border text-center">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="p-2 border">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                      <Link
                        to={`/edit/${post._id}`}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>

                      <Link
                        to={`/post/${post._id}`}
                        className="text-green-600 hover:text-green-800"
                        title="Read Blog"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
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

export default AdminPosts;
