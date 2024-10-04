import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import UniversalLoader from '@/components/ui/UniversalLoader'
import AllBlogs from './AllBlogs'
import { updateDetails,logout } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { Toaster,toast } from 'react-hot-toast';
const LandingPage = () => {
    return 
        <section>
            <Toaster />
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    
}

export default LandingPage
