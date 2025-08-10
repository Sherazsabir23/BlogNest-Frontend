import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import posts from '../api/posts'
import {toast} from "react-toastify"

function EditPost() {
    const [title,settitle] = useState('')
    const [content, setcontent] = useState('')
    const [image, setimage] = useState('')
const navigate = useNavigate();
    const {id } = useParams();

     

     useEffect(() => {
        const fillData = async ()=>{
     const response = await posts.getPostById(id);
     if(response.success){
        settitle(response.post.title);
        setcontent(response.post.content);
        setimage(response.post.image);
     }
     
        }
      
       fillData();
    
     }, [id])

     const postData = {
        title,
        content,
        image,
     }
     const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await posts.updatePost(id,postData)
            if(response.success){
                toast.success("Blog Updated Successfully");
                navigate("/yourposts")
            }
        }catch(err){
            console.error("Error is :" ,err)
          

        }

     }

     

   return (
    <div className="w-full min-h-96  p-5 bg-slate-100 flex justify-center items-center">
      <div className="py-10 px-4 max-w-xl w-full bg-slate-900 rounded-xl">
        <h2 className='text-center text-2xl text-white font-poppins mb-5'>Edit Blog</h2>
        <form  className=" flex w-full justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
          <div className='w-full relative'>
             <input
            type="text"
            placeholder="Enter blog title"
            maxLength={45}
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
             className="w-full py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
         <span className="text-sm text-white  absolute  top-14 right-5">{title.length}/45</span>
          </div>
         
          <textarea
          style={{scrollbarWidth:"none"}}
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            required
            
             className="w-full py-3 px-6 resize-none overflow-y-scroll h-32 rounded-xl bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          ></textarea>
          <input
            type="file"
            accept="image/*"
            placeholder='Upload Image'
            onChange={(e) => setimage(e.target.files[0])}
            required
             className="w-full  py-3 px-6 rounded-full bg-gray-700 outline-none border-none placeholder:text-white caret-sky-400 text-white "
          />
          <button className="text-white bg-sky-400 border-none outline-none px-6 py-3 rounded-full" type="submit">Update Blog</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost