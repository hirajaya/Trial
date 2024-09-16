import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        if (response.data.image) {
          setImageUrl(`http://localhost:5000/${response.data.image}`);
        }
      } catch (error) {
        console.error('Error fetching post:', error.response ? error.response.data : error.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setImage(file);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      const response = await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/dashboard/artist-profile');
    } catch (error) {
      console.error('Error updating post:', error.response ? error.response.data : error.message);
    }
  };

  const formatButtons = [
    { label: 'B', className: 'font-bold', ariaLabel: 'Bold' },
    { label: 'i', className: 'italic', ariaLabel: 'Italic' },
    { label: 'U', className: 'underline', ariaLabel: 'Underline' },
    { label: 'T', className: '', ariaLabel: 'Text' },
    { label: 'T', className: '', ariaLabel: 'Title' },
    { label: 'A', className: '', ariaLabel: 'Alignment' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 mb-6 rounded-lg shadow-lg"
      >
        <div className="text-center font-bold text-white text-2xl">LOGO</div>
      </motion.div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Post</h1>
      <form onSubmit={handleUpdate}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 sm:gap-4 mb-4 sm:mb-0">
            {formatButtons.map((button, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={`${button.className} w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                aria-label={button.ariaLabel}
              >
                {button.label}
              </motion.button>
            ))}
          </div>
          <div className="flex-grow space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" className="max-w-full h-12 object-cover rounded-lg mb-4" />
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              )}
              <label htmlFor="image-upload" className="cursor-pointer inline-block mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                Upload Image
              </label>
              <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </div>
            <textarea
              placeholder="Write your post content here..."
              className="w-full p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              type="submit"
            >
              Update Post
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
