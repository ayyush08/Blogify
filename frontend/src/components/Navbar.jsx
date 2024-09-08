import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { TiAdjustBrightness } from "react-icons/ti";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [rotateState, setRotateState] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const [theme, setTheme] = useState('light');
    // const pathname = window.location.pathname;
    const handleThemeChange = () => {
        setRotateState(!rotateState);
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }


    return (
        <nav className="p-4 bg-teal-200/70 dark:bg-teal-900/70 font-motserrat sticky top-0 backdrop-blur border-b border-gray-300 dark:border-teal-700 z-10">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <div className="text-[2rem] pl-3 font-bold font-motserrat text-gray-900 dark:text-white">Blogify</div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                        Home
                    </Link>
                    <Link to="/about" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                        About
                    </Link>
                    <Link to="/blog" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                        Blog
                    </Link>
                    <Link to="/contact" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                        Contact
                    </Link>
                    <div className="flex items-center">
                        <Button className="mx-1 dark:bg-teal-600 bg-teal-200 text-teal-900 dark:text-teal-50" variant="outline" >Login</Button>
                        <Button className="mx-1 dark:bg-teal-600 bg-teal-200 text-teal-900 dark:text-teal-50" variant="outline">Signup</Button>
                    </div>
                    <div className="flex items-center">
            <div
                className={`cursor-pointer transition-transform duration-300 ease-in-out transform rota ${
                    rotateState ? 'rotate-45' : '-rotate-45'
                }`}
                onClick={handleThemeChange}
            >
                <TiAdjustBrightness size={24} />
            </div>
        </div>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-md focus:outline-none"
                    >
                        <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu with animation */}
            <div
                className={`${isMobileMenuOpen
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                    } overflow-hidden transition-all duration-500 ease-in-out md:hidden flex flex-col space-y-4 mt-4`}>
                <Link to="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                    Home
                </Link>
                <Link to="/about" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                    About
                </Link>
                <Link to="/blog" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                    Blog
                </Link>
                <Link to="/contact" className="hover:scale-105 hover:font-semibold transition-transform duration-300 text-gray-900 dark:text-white">
                    Contact
                </Link>
                <div>
                    <Button className="mx-1 dark:bg-teal-600 bg-teal-200 text-teal-900 dark:text-teal-50" variant="outline">Login</Button>
                    <Button className="mx-1 dark:bg-teal-600 bg-teal-200 text-teal-900 dark:text-teal-50" variant="outline">Signup</Button>
                </div>
                <div className="flex items-center">
            <div
                className={`cursor-pointer transition-transform duration-300 ease-in-out transform rota ${
                    rotateState ? 'rotate-45' : '-rotate-45'
                }`}
                onClick={handleThemeChange}
            >
                <TiAdjustBrightness size={24} />
            </div>
        </div>
            </div>
        </nav>
    );
};

export default Navbar;
