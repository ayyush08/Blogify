import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <p className='mt-10 text-white text-center text-2xl font-bold'>adadsdad</p>
            <Outlet />
        </>
    )
}

export default SharedLayout
