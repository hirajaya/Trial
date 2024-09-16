import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'; // Import useReactToPrint

const ArtistProfile = ({ artistId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const navigate = useNavigate();
  const postsRef = useRef(null); // Create a ref for the posts section

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
      await fetchPosts();
    };

    fetchData();
  }, [artistId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/artists/${artistId}`);
      setProfilePic(response.data.profilePic || '');
    } catch (error) {
      setError(''); // Set the correct error message
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      setError('Error fetching posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      setError('Error deleting post');
      console.error(error);
    }
  };

  const updatePost = (postId) => {
    navigate(`/dashboard/post-update/${postId}`);
  };

  const handlePrint = useReactToPrint({
    content: () => postsRef.current,
  });

  if (loading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-0 sm:p-1">
      <div className="flex flex-col items-center justify-center mb-2">
        <ProfileDescription profilePic={profilePic} />
      </div>
      <AddPostButton />
      <button
        onClick={handlePrint}
        className="py-2 px-2 mb-0  mr-4 ml-96 justify-items-end bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-300"
      >
        Generate Posts PDF
      </button>
      <div className="h-96 overflow-y-auto" ref={postsRef}> {/* Attach the ref here */}
        <PreviousPosts posts={posts} updatePost={updatePost} deletePost={deletePost} />
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

const ProfileDescription = ({ profilePic }) => (
  <div className="text-center">
    <div className="w-24 h-20 rounded-full overflow-hidden mb-2 bg-blue-500 flex items-center justify-center">
      {profilePic ? (
        <img src={`http://localhost:5000/${profilePic}`} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
          <span>Artist</span>
        </div>
      )}
    </div>
    <p className="text-gray-700">Description</p>
  </div>
);

const AddPostButton = () => (
  <a href="artist-post" className="block mb-6">
    <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300">
      Add Post
    </button>
  </a>
);

const PreviousPosts = ({ posts, updatePost, deletePost }) => (
  <div>
    <h3 className="font-semibold mb-4 text-center sm:text-left">Previous Posts</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center col-span-full">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-gray-100 p-4 rounded shadow-sm flex flex-col justify-between">
            {post.image && (
              <div className="h-48 bg-gray-300 mb-3 rounded overflow-hidden">
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
            <p className="text-gray-700 mb-4 flex-grow">{post.content}</p>
            <div className="flex justify-between">
              <button
                onClick={() => updatePost(post._id)}
                className="text-blue-500 hover:text-blue-600 font-medium transition duration-300"
              >
                Update
              </button>
              <button
                onClick={() => deletePost(post._id)}
                className="text-red-500 hover:text-red-600 font-medium transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default ArtistProfile;
