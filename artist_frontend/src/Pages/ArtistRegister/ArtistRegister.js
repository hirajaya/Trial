import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtistRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        artistType: '',
        username: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });

    const validateForm = () => {
        let isValid = true;
        let errors = '';

        // Validate name
        if (!formData.name || /\d/.test(formData.name)) {
            errors += 'Name cannot contain numbers.\n';
            isValid = false;
        }

        // Validate username
        if (!formData.username || formData.username.length > 15) {
            errors += 'Username must be less than or equal to 15 characters.\n';
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            errors += 'Invalid email address.\n';
            isValid = false;
        }

        // Validate phone number
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            errors += 'Phone number must be exactly 10 digits.\n';
            isValid = false;
        }

        // Validate password
if (!formData.password || formData.password.length >= 10) {
  errors += 'Password must be less than 10 characters long.\n';
  isValid = false;
}


        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            errors += 'Passwords do not match.\n';
            isValid = false;
        }

        // Validate required fields
        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.artistType || !formData.username || !formData.password || !formData.confirmPassword) {
            errors += 'All fields are required.\n';
            isValid = false;
        }

        if (!isValid) {
            alert(errors);
        }

        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            profileImage: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/artists/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);
            alert('Artist registered successfully!');

            // Reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                artistType: '',
                username: '',
                password: '',
                confirmPassword: '',
                profileImage: null
            });

            // Redirect to another page after a brief delay
            setTimeout(() => {
                navigate('/dashboard/artist-profile'); // Change to the path you want to navigate to
            }, 2000);
        } catch (error) {
            console.error('Error registering artist:', error);
            alert('Error registering artist: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Artist Registration</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistType">Artist Type</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="artistType"
                        name="artistType"
                        value={formData.artistType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select artist type</option>
                        <option value="visual">Visual Artist</option>
                        <option value="musician">Musician</option>
                        <option value="writer">Writer</option>
                        <option value="performer">Performer</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">Profile Image</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="profileImage"
                        type="file"
                        name="profileImage"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArtistRegister;
