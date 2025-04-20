import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    // Listen to our custom event
    window.addEventListener('loginStatusChanged', updateLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', updateLoginStatus);
    };
  }, []);

  return (
    <header className="bg-green-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Waste Management</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/buy" className="hover:text-gray-300">Buy</Link>
          <Link to="/maps" className="hover:text-gray-300">Nearest Centers</Link>
          <Link to="/our-mission" className="hover:text-gray-300">Our Mission</Link>

          {!isLoggedIn && (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}

          <Link to="/register" className="hover:text-gray-300">Register</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
