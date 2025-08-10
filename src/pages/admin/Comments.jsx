import React, { useState, useEffect } from "react";
import commentApi from "../../api/comment";
import posts from "../../api/posts";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import auth from "../../api/auth"

function Comments() {
  const [postsList, setPostsList] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();

  const filteredComments = selectedId
    ? comments.filter((comment) => comment.postId === selectedId)
    : comments;


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
  // 🟢 Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await posts.allPosts();
        if (res.success) {
          setPostsList(res.posts);
        } else {
          console.error("Posts fetch failed:", res.message);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // 🟢 Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await commentApi.getAllUsersComments();
      if (res.success) {
        setComments(res.comments);
      } else {
        toast.error("No comments yet");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 🗑 Handle Delete
  const handleDeleteComment = async (id) => {
    try {
      const res = await commentApi.deleteComment(id);
      if (res.success) {
        toast.success("Comment deleted successfully!");
        setComments((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-full p-5 min-h-screen">
      <h2 className="text-2xl font-semibold text-center md:text-left">
        Comments
      </h2>

      <div className="mt-4 flex flex-col ">
        <h3 className="text-center font-bold">Filter Comments by Post</h3>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="max-w-md w-full truncate mx-auto rounded-lg outline-none border px-3 py-2 mt-3"
        >
          <option value=""> Select Post </option>
          {postsList.map((post) => (
            <option key={post._id} value={post._id}>
                      {post.title}
</option>

          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="border min-w-full table-fixed border-collapse mt-5 text-center">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2 md:table-cell hidden">Comment</th>
              <th className="border p-2">Post Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Comments Found
                </td>
              </tr>
            ) : (
              filteredComments.map((comment, index) => (
                <tr key={comment._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 break-words md:table-cell hidden">{comment.content}</td>
                  <td className="border p-2  whitespace-nowrap">
                    {postsList.find((p) => p._id === comment.postId)?.title ||
                      "N/A"}
                      
                  </td>
                  <td className="border p-2">
                    {comment.author?.name || "Anonymous"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
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

export default Comments;
