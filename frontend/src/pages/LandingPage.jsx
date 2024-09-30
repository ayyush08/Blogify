import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import AllBlogs from './AllBlogs'
import { useSessionValidator } from '@/hooks/user.hook';
import { persistor } from '@/store/store';
import { Toaster,toast } from 'react-hot-toast';
const LandingPage = () => {
    const {data:valid,isLoading:sessionChecking} = useSessionValidator();
    useEffect(()=>{
        if (!sessionChecking) {
            if (!valid) {
                persistor.purge();
                toast.error('Please login to continue');
            }
            toast.success("Welcome")
        }
    },[sessionChecking,valid])
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
