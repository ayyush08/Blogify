import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
const Navbar = () => {
    return (
        <nav className="sticky top-0 z-10 bg-white ... backdrop-filter backdrop-blur-lg ... bg-opacity-30  border-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <span className="text-2xl text-gray-800 font-semibold">
                        <Logo/>
                    </span>
                    <div className="flex space-x-4 text-gray-900">
                        {1&& <Link to="/" className="hover:text-gray-700">Login</Link>}
                        <Link to="/profile" className="hover:text-gray-700">My Profile</Link>
                        <Link to="/posts" className="hover:text-gray-700">Posts</Link>
                        <Link to="/create" className="hover:text-gray-700">Create Post</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
