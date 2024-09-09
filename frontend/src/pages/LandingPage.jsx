import React from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import AllBlogs from './AllBlogs'
const LandingPage = () => {
    return (
        <section>
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    )
}

export default LandingPage
