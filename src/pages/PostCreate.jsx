import React from 'react'
import { useNavigate } from 'react-router-dom';   
import posts from '../api/posts'; 
import { setPost } from '../redux/features/postSlice';
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux';

function PostCreate() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      image
    };
    try {
      const response = await posts.createPost(postData);
      if (response && response.success) {
        toast.success("Post created successfully");
        dispatch(setPost(response.post));
        navigate("/");
      } else {
        console.error("error message:", response.message);
      }
    } catch (error) {
      console.log("Error creating post:", error);
      
    }
  };

  return (
    <div className="w-full min-h-96  p-5 bg-slate-100 flex justify-center items-center">
      <div className="py-10 px-4 max-w-xl w-full bg-slate-900 rounded-xl">
        <h2 className='text-center text-2xl text-white font-poppins mb-5'>Create New Blog</h2>
        <form  className=" flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
          <div className='w-full relative'>
          <input
            type="text"
            placeholder="Enter blog title"
            maxLength={45}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
             className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <span className="text-sm text-white  absolute  top-14 right-5">{title.length}/45</span>
          </div>

          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            
             className="w-full mt-4 py-3 px-6 resize-none h-24 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          ></textarea>
          <input
            type="file"
            accept="image/*"
            placeholder='Upload Image'
            onChange={(e) => setImage(e.target.files[0])}
            required
             className="w-full  py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <button className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostCreate;
