import React, { useEffect, useState } from 'react';
import Api from '@/services/axios/api';
import ProductRegistrationForm from '@/components/forms/CreateProduct';
import ProductUpdateForm from '@/components/forms/UpdateProduct';
import ViewProductForm from '@/components/forms/ViewProduct';
import ProtectedRoute from '@/components/utils/ProtectedRoute';


const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
  });

  // State to manage form visibility
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false); // Novo estado para ViewProductForm
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await Api.get(`products/index/10?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.data);
      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    if (page !== pagination.currentPage) {
      fetchProducts(page);
    }
  };

  // Handlers to toggle forms
  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  const openUpdateForm = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const openViewForm = (product) => {
    setSelectedProduct(product);
    setShowViewForm(true);
  };

  const closeForms = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setShowViewForm(false); // Fechar o ViewProductForm
    setSelectedProduct(null);

    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ProtectedRoute>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-5 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Name</th>
              <th className="px-5 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Price</th>
              <th className="px-5 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Category</th>
              <th className="px-5 py-2 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Image</th>
              <th className="px-5 py-2 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={openCreateForm}
                  className="bg-white border-2 border-black rounded-lg text-gray-900 px-6 py-1 text-base hover:border-green-600 hover:text-green-600 cursor-pointer transition"
                >
                  Create
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-xs font-medium leading-5 text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-xs leading-5 text-gray-900">{product.price}</div>
                </td>
                <td className="px-6 py-3 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-xs leading-5 text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-3 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                  <img className="w-10 h-10 rounded-full m-auto" src={product.imageUrl} alt={product.name} />
                </td>
                <td className="px-6 py-3 text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                  <div className="flex space-x-2 justify-center">
                    <button
                      onClick={() => openViewForm(product)} // Abre o ViewProductForm
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold border border-gray-200 text-green-600 bg-white rounded hover:bg-white-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openUpdateForm(product)}
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-800"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showCreateForm && (
          <div className="fixed inset-0 flex items-center justify-center">
            <ProductRegistrationForm onClose={closeForms} />
          </div>
        )}

        {showUpdateForm && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center">
            <ProductUpdateForm initialProduct={selectedProduct} onClose={closeForms} />
          </div>
        )}

        {showViewForm && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center">
            <ViewProductForm product={selectedProduct} onClose={closeForms} />
          </div>
        )}



        <div className="flex items-center bg-white justify-center m-auto py-3 space-x-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`flex items-center px-4 py-2 text-sm font-semibold text-green-600 bg-white rounded-lg shadow-md transition duration-200 
          ${pagination.currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'}`}
          >
            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0l3 3m-3-3l3-3" />
            </svg>
            Previous
          </button>

          <span className="text-sm font-medium text-gray-800">
            Page {pagination.currentPage} of {pagination.lastPage}
          </span>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.lastPage}
            className={`flex items-center px-4 py-2 text-sm font-semibold text-green-600 bg-white rounded-lg shadow-md transition duration-200 
          ${pagination.currentPage === pagination.lastPage ? 'cursor-not-allowed' : 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'}`}
          >
            Next
            <svg className="w-6 h-6 ml-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 0l-3-3m3 3l-3 3" />
            </svg>
          </button>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default ProductsTable;
