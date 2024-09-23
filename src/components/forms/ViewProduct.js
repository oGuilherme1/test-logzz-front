'use client';
import { useState } from 'react';
import Api from '@/services/axios/api';
import { showSuccess, showError, showConfirmation } from '@/services/sweet/alerts';

const ViewProduct = ({ product, onClose }) => {
    const [error, setError] = useState('');

    const handleDelete = async () => {
        showConfirmation('Are you sure?', 'Do you really want to delete this product?', async () => {
            try {
                const token = localStorage.getItem('token');
                await Api.delete(`/products/${product.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                showSuccess('Product deleted successfully!', () => onClose());
            } catch (err) {
                setError('Failed to delete product.');
                showError('Error deleting product, please try again later.');
                console.error('Error deleting product:', err);
            }
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-50">
            <div className="relative w-full max-w-md mx-auto p-5 flex flex-col bg-white shadow-xl rounded-xl">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">View Product</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                
                <div className="flex flex-col w-full">
                    <div className="my-3">
                        <label className="text-gray-700 mb-1">Name</label>
                        <p className="border-2 text-gray-300 border-gray-00 rounded-lg px-2 py-1">{product.name}</p>
                    </div>
                    <div className="my-3">
                        <label className="text-gray-500 mb-1">Price</label>
                        <p className="border-2 text-gray-300 border-gray-100 rounded-lg px-2 py-1">{product.price}</p>
                    </div>
                    <div className="my-3">
                        <label className="text-gray-500 mb-1">Description</label>
                        <p className="border-2 text-gray-300 border-gray-100 rounded-lg px-2 py-1">{product.description}</p>
                    </div>
                    <div className="my-3">
                        <label className="text-gray-500 mb-1">Category</label>
                        <p className="border-2 text-gray-300 border-gray-100 rounded-lg px-2 py-1">{product.category}</p>
                    </div>
                    {product.imageUrl && (
                        <div className="my-3">
                            <label className="text-gray-500 mb-1">Product Image</label>
                            <img src={product.imageUrl} alt={product.name} className="border-2 border-gray-100 rounded-lg w-24 h-24 object-cover m-auto" />
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleDelete}
                        className="py-2 px-4 bg-red-600 text-white rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
