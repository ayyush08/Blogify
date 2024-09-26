import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { Toaster } from 'react-hot-toast'
const SharedLayout = () => {
    return (
        <div id="/" className="flex flex-col min-h-screen bg-teal-300 dark:bg-teal-700">
            <Navbar />
            <Toaster />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default SharedLayout
