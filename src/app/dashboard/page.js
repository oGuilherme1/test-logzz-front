'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/components/dashboard/tables/ProductsTable';
import ProtectedRoute from '@/components/utils/ProtectedRoute';
import Api from '@/services/axios/api';
import UpdateUserProfile from '@/components/forms/UpdateUserProfile';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const router = useRouter(); 

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
        await Api.post(`/logout`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        localStorage.removeItem('token');

        router.push('/'); 
    } catch (err) {
        console.error('Logout failed:', err);
        alert('Failed to logout. Please try again.');
    }
  };

  const openUpdateUserForm = async () => {
    setShowUpdateUserForm(true);
    setDropdownOpen(false)
  }

  const closeForms = () => {
    setShowUpdateUserForm(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-200">
        {/* Overlay for sidebar in mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
            } lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <span className="mx-2 text-2xl font-semibold text-black">Log<span className=" text-2xl font-semibold text-green-600">zz</span></span>

            </div>
          </div>

          <nav className="mt-10">
            <a
              className="flex items-center px-6 py-2 mt-4 text-gray-500 bg-gray-200 border-l-4 border-green-600"
              href="#"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z" /></svg>
              <span className="mx-3">Products</span>
            </a>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-green-600">
            <div className="flex items-center">
              <button
                className="text-gray-500 focus:outline-none lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512" className="w-5 h-5">
                    <path fill="#6b7280" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      onClick={() => setDropdownOpen(false)}
                      className="fixed inset-0 z-10 w-full h-full"
                    ></div>

                    <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
                      <button
                      onClick={openUpdateUserForm}
                        href="#"
                        className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        href="#"
                        className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-green-600 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {showUpdateUserForm && (
            <div className="fixed inset-0 flex items-center justify-center">
              <UpdateUserProfile onClose={closeForms} />
            </div>
          )}

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-1 mx-auto">
              <div className="mt-8"></div>
              <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <ProductsTable />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
