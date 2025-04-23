import { useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { useUserContext } from './hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="bg-[#0d0f0e] text-white font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-[#0d0f0e] border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <img src="https://placehold.co/20x20" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-white">KEBULA</h1>
        </div>
        <nav>
          <ul className="flex space-x-8 text-sm text-white tracking-wider underline underline-offset-4">
            <li>
              <Link to="/" className="hover:text-yellow-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-yellow-500">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/reservation" className="hover:text-yellow-500">
                Reservation
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <img
            src="src\assets\images\icons8-search-50.png"
            alt="Search"
            className="w-6 h-6 cursor-pointer"/>

           {!user ?

            <>
              <Link
              to="/login"
              className="border border-yellow-500 px-4 py-1 rounded-sm text-sm hover:bg-yellow-500 hover:text-black transition">
              Sign In
              </Link>
            </>
          :
            <>
              <Link to="/profile">Profile</Link>
              <Link
              to="/logout"
              className="border border-yellow-500 px-4 py-1 rounded-sm text-sm hover:bg-yellow-500 hover:text-black transition">
              Sign Out
              </Link>
            </>
          }

        </div>
      </header>
      <main className='p-8'>
        <Outlet />
      </main>
      <footer className="text-center py-8 bg-[#0d0f0e] border-t border-gray-800 text-sm text-gray-500">
        &copy; 2025 Kebula. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
