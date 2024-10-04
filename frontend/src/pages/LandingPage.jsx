import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import AllBlogs from './AllBlogs'

import { Toaster,toast } from 'react-hot-toast';
const LandingPage = () => {
    return (
        <section>
            <Toaster />
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    )
}

export default LandingPage
