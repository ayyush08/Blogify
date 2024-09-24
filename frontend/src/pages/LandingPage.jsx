import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import AllBlogs from './AllBlogs'
import { useLogoutUser } from '@/hooks/user.hook'
import { useDispatch,useSelector } from 'react-redux'
import { persistor } from '@/store/store'
import { useNavigate } from 'react-router-dom'
import { useSessionValidator } from '@/hooks/user.hook'
import toast from 'react-hot-toast'
const LandingPage = () => {
    const {data,isLoading,} = useSessionValidator();
    const navigate = useNavigate();
    if(isLoading){
        return <div>Loading...</div>
    }
    if(data){  
        console.log('User is logged in');
        }
    else{
        toast.error('Please login to continue');
        persistor.purge();
        navigate('/login');
    }
    return (
        <section>
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    )
}

export default LandingPage
