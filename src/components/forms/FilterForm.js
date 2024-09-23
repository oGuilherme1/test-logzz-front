'use client';
import { useState } from 'react';

const FilterForm = ({ onFilter, onClose }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [imageFilter, setImageFilter] = useState('none');

    const handleFilterChange = () => {
        onFilter({ name, category, imageFilter });
        onClose()
    };

    const handleImageFilterChange = (e) => {
        setImageFilter(e.target.value);
        if (e.target.value !== 'none') {
            setName('');
            setCategory('');
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center" onClick={onClose}>
            <div
                className="flex flex-col p-5 bg-white shadow-md rounded-lg w-96 relative"
                onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do formulário
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-lg text-black font-bold mb-4">Filter Products</h2>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="text-gray-500 mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={imageFilter === 'none' ? name : ''}
                        onChange={(e) => imageFilter === 'none' && setName(e.target.value)}
                        placeholder="Enter product name"
                        className="appearance-none border-2 border-gray-200 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        disabled={imageFilter !== 'none'}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="category" className="text-gray-500 mb-2">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={imageFilter === 'none' ? category : ''}
                        onChange={(e) => imageFilter === 'none' && setCategory(e.target.value)}
                        placeholder="Enter product category"
                        className="appearance-none border-2 border-gray-200 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        disabled={imageFilter !== 'none'}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-500 mb-2">Image</label>
                    <div className="flex flex-col space-y-2">
                        <label>
                            <input
                                type="radio"
                                value="none"
                                checked={imageFilter === 'none'}
                                onChange={handleImageFilterChange}
                            />
                            None
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="withImage"
                                checked={imageFilter === 'withImage'}
                                onChange={handleImageFilterChange}
                            />
                            With Image
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="notWithImage"
                                checked={imageFilter === 'notWithImage'}
                                onChange={handleImageFilterChange}
                            />
                            Not With Image
                        </label>
                    </div>
                </div>
                <button
                    onClick={handleFilterChange}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterForm;
