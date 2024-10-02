import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import UniversalLoader from '@/components/ui/UniversalLoader'
import AllBlogs from './AllBlogs'
import { useSessionValidator } from '@/hooks/user.hook';
import { updateDetails,logout } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { Toaster,toast } from 'react-hot-toast';
const LandingPage = () => {
    const {data:valid,isLoading:sessionChecking} = useSessionValidator();
    const dispatch = useDispatch();
    useEffect(()=>{
        if (!sessionChecking) {
            if (!valid) {
                dispatch(logout());
                
            }else{

                toast.success("Welcome")
            }
        }
    },[sessionChecking])
    if(sessionChecking){
        return <div className='flex justify-center items-center min-h-screen'>
            <UniversalLoader/>
        </div>
    }
    return (!sessionChecking &&
        <section>
            <Toaster />
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    )
}

export default LandingPage
