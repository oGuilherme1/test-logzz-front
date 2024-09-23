'use client';
import { useState } from 'react';
import Api from '@/services/axios/api';
import {showSuccess, showError} from '@/services/sweet/alerts';
import { useRouter } from 'next/navigation';

const CreateProductForm = ({ onClose }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setErrorName('');

        const uploadImageForm = new FormData();
        uploadImageForm.append('image', image);

        try {
            const token = localStorage.getItem('token');
            
            if(image) {
                const uploadImage = await Api.post('/uploadImage/', uploadImageForm, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                    },
                });
      
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('description', description);
                formData.append('category', category);
                formData.append('imageUrl', uploadImage.imageUrl)
    
                await Api.post('/products/', formData, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                });

                return showSuccess('Product created successfully!', () => onClose());

            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('imageUrl', image)

            await Api.post('/products/', formData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            return showSuccess('Product created successfully!', () => onClose());

        } catch (err) {
            setError('Failed to register product. Please check your input.');
            setErrorName(err.response.data.name);
            console.error('Product registration error:', err);
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
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">Create Product</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="name" className="text-gray-500 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                        />
                        {errorName && <div className="text-red-500 mb-4">{errorName}</div>}
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="price" className="text-gray-500 mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product price"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                        />
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="description" className="text-gray-500 mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                        />
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="category" className="text-gray-500 mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter product category"
                            required
                            className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg text-black"
                        />
                    </div>
                    <div className="flex flex-col w-full my-5">
                        <label htmlFor="image" className="text-gray-500 mb-2">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border-2 border-gray-100 rounded-lg px-4 py-3 text-black"
                        />
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

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
                                <div className="font-bold">Create Product</div>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
