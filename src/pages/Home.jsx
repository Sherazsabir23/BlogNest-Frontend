import React, { useState, useEffect } from "react";
import posts from "../api/posts";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [Posts, setPosts] = useState([]);
  const [inputtext, setinputText] = useState("");
   const user = useSelector((state) => state.user.user);

     const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/createpost"); // user login hai
      
    } else {
      navigate("/login"); // user login nahi hai
      toast.error("Please login to create post")
    }
  };

  const fetchLatestPosts = async () => {
    try {
      const response = await posts.latestPosts();
      if (response.success) {
        setPosts(response.posts);
      } else {
        console.error("Failed to fetch posts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const handleSearch = async () => {
    if (inputtext.trim() == "") return;
    try {
      const response = await posts.searchPosts(inputtext);
      if (response.success) {
        setPosts(response.posts);
      }
    } catch (err) {
      console.error("Server error", err);
    }
  };

  return (
    <>
      <section
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/4069293/pexels-photo-4069293.jpeg')`,
        }}
        className="relative w-full min-h-screen bg-center bg-no-repeat bg-cover px-5 flex items-center justify-center"
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/90"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center px-4">
          {/* Heading */}
          <h1 className="text-slate-100 sm:text-5xl text-3xl font-semibold font-poppins">
            Your Voice, Your Story — Blog It All Here!
          </h1>

          {/* Paragraph */}
          <p className="text-slate-400 sm:text-xl text-base">
            From tech reviews to travel diaries, fashion tips to motivational
            insights — share your thoughts, stories, and ideas with the world. A
            platform for every voice, every niche, and every passion.
          </p>

          {/* Search Field + Button */}
          <div className="w-full sm:w-96 relative mt-10 ">
            <input
              placeholder="Search Blogs here..."
              className=" bg-slate-100 border-none outline-none rounded-lg px-5 py-3 placeholder:text-gray-500 w-full pr-24"
              type="text"
              value={inputtext}
              onChange={(e) => setinputText(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 h-full px-4 rounded-r-lg bg-sky-400 hover:bg-sky-500 text-white font-semibold"
            >
              Search
            </button>
          </div>

        
        </div>
      </section>

     <section className="p-9 w-full min-h-screen bg-slate-100">
  <div className="container mx-auto mt-5 max-w-5xl">
    <h2 className="text-center mb-12 text-4xl font-semibold font-poppins capitalize">
      {Posts.length > 0 ? "Explore the latest posts and updates." : "No posts found"}
    </h2>

    <div className="grid gap-8  grid-cols-1 pt-4 sm:grid-cols-2 lg:grid-cols-3">
      {Posts.map((Post) => (
        <div
          key={Post._id}
          className="bg-white rounded-lg w-[300px] h-[400px] overflow-hidden shadow-lg flex flex-col justify-between transition-transform hover:scale-105 duration-300"
        >
          <img
            className="w-full h-60 object-fill"
            src={`https://blognest-backend-production.up.railway.app/uploads/${Post.image}`}
            alt={Post.title}
          />
          <div className="p-4 flex-1">
            <h2 className="font-poppins text-xl font-semibold text-gray-800 mb-2">
              {Post.title}
            </h2>
            <p className="text-gray-600 line-clamp-3">{Post.description}</p>
          </div>
          <div className="flex justify-center items-center mb-4">
            <Link
              to={`/post/${Post._id}`}
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded-md transition"
            >
              Read Blog
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <section className="bg-slate-900 border-b border-slate-600 py-16 px-6 text-center text-slate-100">
        <h2 className="text-4xl font-bold mb-4 font-poppins">
          Ready to grow with us?
        </h2>
        <p className="text-lg mb-8 text-slate-400">
          Start your journey today and unlock your full potential.
        </p>
         <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded transition"  onClick={handleClick}>Create Post</button>
      </section>
    </>
  );
}
export default Home;
