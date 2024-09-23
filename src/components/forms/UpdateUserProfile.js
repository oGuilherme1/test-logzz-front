'use client';
import { useState, useEffect } from 'react';
import Api from '@/services/axios/api';
import {showSuccess, showError} from '@/services/sweet/alerts';

const UpdateUserProfile = ({ onClose, userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [idUser, setIdUser] = useState('');
    const [error, setError] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await Api.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setName(response.name);
                setEmail(response.email);
                setPhone(response.phone);
                setIdUser(response.id);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
            }
        };
        fetchUserData();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setErrorEmail('');
        setErrorPhone('');

        try {
            const token = localStorage.getItem('token');

            const updatedUserData = {
                name,
                email,
                phone
            };

            await Api.put(`/user/${idUser}`, updatedUserData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return showSuccess('Profile updated successfully!', () => onClose());
        } catch (err) {
            setError('Failed to update profile. Please check your input.');
            setErrorEmail(err.response.data.email);
            setErrorPhone(err.response.data.phone);
            console.error('Profile update error:', err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-50">
            <div className="relative w-full max-w-md mx-auto p-10 flex flex-col bg-white shadow-xl rounded-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">Update Profile</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="name" className="text-gray-500 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-lg text-black"
                        />
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="email" className="text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-lg text-black"
                        />
                        {errorEmail && <div className="text-red-500 mb-4">{errorEmail}</div>}
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="phone" className="text-gray-500 mb-2">Phone</label>
                        <input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter a your phone"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-lg text-black"
                        />
                        {errorPhone && <div className="text-red-500 mb-4">{errorPhone}</div>}
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="flex flex-col w-full my-5">
                        <button
                            type="submit"
                            className="w-full py-4 bg-green-600 rounded-lg text-blue-100"
                        >
                            <div className="flex flex-row items-center justify-center">
                                <div className="mr-2">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="font-bold">Update Profile</div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserProfile;
