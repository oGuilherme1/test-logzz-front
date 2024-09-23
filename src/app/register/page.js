// pages/register.js
'use client'
import Link from 'next/link';
import { useState } from 'react';
import Api from '@/services/axios/api';
import { useRouter } from 'next/navigation';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorUsername('');
        setErrorEmail('');
        setErrorPhone('');
        setErrorPassword('');

        try {
            const response = await Api.post('/register', {
                name: username,
                email,
                phone,
                password,
            });

            router.push('/')

        } catch (err) {
            setErrorUsername(err.response.data.name);
            setErrorEmail(err.response.data.email);
            setErrorPhone(err.response.data.phone);
            setErrorPassword(err.response.data.password);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-md mx-auto p-10 bg-white flex flex-col shadow-xl rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">Sign Up</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="username" className="text-gray-500 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Please insert your username"
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                            required
                        />
                        {errorUsername && <div className="text-red-500 mb-4">{errorUsername}</div>}
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="email" className="text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please insert your email"
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                            required
                        />
                        {errorEmail && <div className="text-red-500 mb-4">{errorEmail}</div>}
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="phone" className="text-gray-500 mb-2">Phone</label>
                        <input
                            type="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Please insert your phone"
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                        />
                        {errorPhone && <div className="text-red-500 mb-4">{errorPhone}</div>}
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="password" className="text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Please insert your password"
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                            required
                        />
                        {errorPassword && <div className="text-red-500 mb-4">{errorPassword}</div>}
                    </div>

                    <div className="flex flex-col w-full my-5">
                        <button
                            type="submit"
                            className="w-full py-4 bg-green-600 rounded-lg text-green-100"
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
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="font-bold">Sign Up</div>
                            </div>
                        </button>
                        <div className="flex justify-evenly mt-5">
                            <Link href="/" className="w-full text-center font-medium text-gray-500">
                                Already have an account? Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
