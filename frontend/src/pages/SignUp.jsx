import { login } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegisterUser,useLoginUser } from '@/hooks/user.hook'
const SignUp = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors },isSubmitting } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileImage, setProfileImage] = useState('https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png');
    const { mutateAsync: registerUser } = useRegisterUser();
    const { mutateAsync: loginUser } = useLoginUser();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const navigate = useNavigate()
    if (login.status) {
        toast.success("You are already logged in.")
        navigate("/")
    }

    const handleFileChange = (event) => {
        setProfileImage(true);
        const file = event.target.files[0];
        console.log(file);
        
        if (file) {
            setProfileImage(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if(selectedFile) formData.append('avatar', selectedFile);
        else formData.append('avatar', 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png');
        try {
            const registeredUser = await registerUser(formData);
            if (registeredUser) {
                const loggedInUser = await loginUser({
                    email: data.email,
                    password: data.password,
                });
                if (loggedInUser) {
                    dispatch(login(loggedInUser));
                    navigate("/");
                }
                else{
                    toast.error("Something went wrong while logging in the user.")
                }
            }
            else{
                
                toast.error("An error occurred while registering the user.")
            }
        } catch (error) {
            console.log(error);
            
            toast.error("An error occurred while registering the user.")
            
        }
        };
        return (
            <div>
                <div className="flex mx-auto p-2 items-center justify-center dark:bg-teal-900">
                    <Toaster />
                    <div className="max-w-md w-full p-8 rounded-lg shadow-2xl shadow-accent-foreground">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-mono text-center">Sign Up</h2>
                        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center justify-center w-full">
                                {!selectedFile&& (
                                    <>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="file-upload"
                                                className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-white dark:bg-teal-800 text-teal-500 shadow-lg tracking-wide uppercase border border-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white dark:hover:bg-teal-700 dark:hover:text-white transition-all duration-300 ease-in-out"
                                            >
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                                    />
                                                </svg>
                                                <span className="mt-2 text-sm leading-normal text-center">Profile Pic</span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </>
                                )}

                                {selectedFile && (
                                    <div className="flex items-center justify-center w-full">
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border border-teal-500 shadow-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Username Field */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-mono">Username</label>
                                <input
                                    type="text"
                                    {...register("username", {
                                        required: { value: true, message: 'Username is required' },
                                        maxLength: { value: 10, message: 'Username cannot be greater than 10 characters' },
                                        minLength: { value: 5, message: 'Min length for username is 5' }
                                    })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                                />
                                {errors.username && toast.error(errors.username.message)}
                            </div>

                            {/* Fullname Field */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-mono">FullName</label>
                                <input
                                    type="text"
                                    {...register("fullName", {
                                        required: { value: true, message: 'Full Name is required' },
                                        maxLength: { value: 20, message: 'Fullname cannot be greater than 20 characters' },
                                        minLength: { value: 3, message: 'Min length for Full Name is 5' }
                                    })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                                />
                                {errors.fullName && toast.error(errors.fullName.message)}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 font-mono">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                                />
                                {errors.email && toast.error(errors.email.message)}
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label className="block text-gray-700 dark:text-gray-300 font-mono">Password</label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    {...register("password", {
                                        required: true,
                                        minLength: { value: 8, message: 'Password must have at least 8 characters' },
                                        maxLength: { value: 20, message: 'Password cannot be greater than 20 characters' }
                                    })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                                />
                                {errors.password && toast.error(errors.password.message)}
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-[40px] right-0 pr-3 flex items-center cursor-pointer"
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full font-sans bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {isSubmitting ? 'Loading...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    export default SignUp
