import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '@/components/About'
import AllBlogs from './AllBlogs'
import { useLogoutUser } from '@/hooks/user.hook'
import { useDispatch,useSelector } from 'react-redux'
import { persistor } from '@/store/store'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()
//     const {mutateAsync:logoutUser} = useLogoutUser();
//     const authStatus = useSelector(state => state.auth);
//     useEffect(()=>{
//         if(document.cookie.includes('refreshToken')){
//             console.log('Refresh token exists');
//     }else{
//         console.log('Refresh token does not exist');
//         logoutUser().then(()=>{
//             console.log('Logged out');
            
//         });
//         dispatch(logout());
//         persistor.purge();
//         navigate('/');
//     }
// },[])
console.log(document.cookie.);

    return (
        <section>
            <Hero />
            <About/>
            <AllBlogs/>
        </section>
    )
}

export default LandingPage
