// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import {toast} from "react-toastify"
import { useSelector } from "react-redux";
import posts from "../api/posts";
import commentAPI from "../api/comment"
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [post, setPost] = useState(null);
  const [comment,setComment] = useState("");
  const [allcomment,setAllComment] = useState([]);

  const data={
    postId:id,
   content: comment,
  }
 

const handleCommentSubmit = async (e) =>{
  e.preventDefault();
  try{
   const response = await commentAPI.createComment(data);
   if(response && response.success){
    console.log("comment created succesfully");
    setComment('');
    await fetchallcomments();
   }else{
    toast.error(" Please Login to add comment")
   }
  }catch(err) {
console.error("internal server error:",err)
  }
}
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await posts.getPostById(id);
        if (response.success) {
          setPost(response.post);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchSinglePost();
  }, [id]);

   const fetchallcomments = async()=>{
  try{
      const response = await commentAPI.getComment(id);
      if(response && response.success){
        console.log("Fetched comments:", response.comments);
        setAllComment(response.comments);
      
    }else{
      console.log(response.message);
    }
  }catch(err){
        console.error("internal server error",err)
      }
    }

  useEffect(() => {
   
  
  fetchallcomments();
  
  },[id])

  
  

  if(!post) return <p>Loading....</p>

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="post-detail-container">
      <div className="post-detail-box">
        <h2>{post.title}</h2>
        <p className="meta">
          <strong>By:</strong> {post.author.name || "Unknown"} &nbsp;|&nbsp;
          <strong>Date:</strong> {formattedDate}
        </p>

       

        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
        
        <pre className="description">{post.content}</pre>

        <div >
          <form className="w-full max-w-md flex justify-center items-center" onSubmit={handleCommentSubmit}>
            <input  className=" mt-5 py-3 w-full px-6 rounded-l-lg bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white" type="text" placeholder="Leave Your Comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
            <button className=" mt-5 text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-r-lg" type="submit">Submit</button>
          </form>
        </div>
        {/* comment content container */}
        <div className="max-w-md text-white mt-4">
       {allcomment.map((comment, i) => (
  <div key={i} className="flex border bg-slate-900 rounded-lg g p-5 gap-4 mt-5 mb-4">
    <img className="w-10 h-10 object-cover rounded-full" src={`http://localhost:3000/uploads/${comment.author.profileImage}`} alt="Author" />
    <div>
      <p className="font-semibold">{comment.author.name}</p>
      <p className="text-sm text-slate-400">{comment.content}</p>
    </div>
  </div>
))}

          
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
