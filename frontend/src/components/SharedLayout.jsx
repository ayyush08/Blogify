import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
const SharedLayout = () => {
    return (
        <>

            <Navbar />
            <Outlet />
            <Footer/>
        </>
    )
}

export default SharedLayout
