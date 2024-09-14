import authSlice from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState('https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png');
    const [profileImage, setProfileImage] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const navigate = useNavigate()
    if (authSlice.status) {
        toast.success("You are already logged in.")
        navigate("/")
    }
    else {

    }

    const handleFileChange = (event) => {
        setProfileImage(true);
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };
    const onSubmit = (data) => {
        console.log(data);
        // You can send the data and the image to your backend here
    };
    return (
        // <div>
        //     <div className="flex mx-auto p-2 items-center justify-center dark:bg-teal-900">
        //         <div className="max-w-md w-full p-8 rounded-lg shadow-2xl shadow-accent-foreground">
        //             <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-mono text-center">Sign Up</h2>
        //             <form className="space-y-8">
        //             <div className="flex flex-col items-center justify-center w-full">
        //     {!profileImage && (
        //         <>
        //             <div className="flex items-center justify-center w-full">
        //                 <label
        //                     htmlFor="file-upload"
        //                     className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-white dark:bg-teal-800 text-teal-500 shadow-lg tracking-wide uppercase border border-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white dark:hover:bg-teal-700 dark:hover:text-white transition-all duration-300 ease-in-out"
        //                 >
        //                     <svg
        //                         className="w-8 h-8"
        //                         fill="currentColor"
        //                         viewBox="0 0 24 24"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                     >
        //                         <path
        //                             d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        //                         />
        //                     </svg>
        //                     <span className="mt-2 text-sm leading-normal text-center">Profile Pic</span>
        //                     <input
        //                         id="file-upload"
        //                         type="file"
        //                         accept="image/*"
        //                         className="hidden"
        //                         onChange={handleFileChange}
        //                         required
        //                     />
        //                 </label>
        //             </div>
        //         </>
        //     )}

        //     {profileImage && (
        //         <div className="flex items-center justify-center w-full">
        //             <img
        //                 src={selectedFile}
        //                 alt="Profile"
        //                 className="w-32 h-32 rounded-full object-cover border border-teal-500 shadow-lg"
        //             />
        //         </div>
        //     )}
        // </div>
        //         <div>
        //             <label className="block text-gray-700 dark:text-gray-300  font-mono">Username</label>
        //             <input
        //                 type="name"
        //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
        //                 required

        //             />
        //         </div>
        //         <div>
        //             <label className="block text-gray-700 dark:text-gray-300  font-mono">FullName</label>
        //             <input
        //                 type="name"
        //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label className="block text-gray-700 dark:text-gray-300 font-mono">Email</label>
        //             <input
        //                 type="email"
        //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
        //                 required
        //             />
        //         </div>
        //         <div className="relative">
        //             <label className="block text-gray-700 dark:text-gray-300 font-mono">Password</label>
        //             <input
        //                 type={passwordVisible ? 'text' : 'password'}
        //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
        //                 required
        //             />
        //             <span
        //                 onClick={togglePasswordVisibility}
        //                 className="absolute top-[40px] right-0 pr-3 flex items-center cursor-pointer"
        //             >
        //                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        //             </span>
        //         </div>
        //         <button
        //             type="submit"
        //             className="w-full font-sans bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         >
        //             Sign Up
        //         </button>
        //     </form>
        // </div>
        //     </div >
        // </div >
        <div>
            <div className="flex mx-auto p-2 items-center justify-center dark:bg-teal-900">
                <div className="max-w-md w-full p-8 rounded-lg shadow-2xl shadow-accent-foreground">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-mono text-center">Sign Up</h2>
                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-center justify-center w-full">
                            {!profileImage && (
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

                            {profileImage && (
                                <div className="flex items-center justify-center w-full">
                                    <img
                                        src={selectedFile}
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
                                {...register("username", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                            />
                            {errors.username && <span className="text-red-500">Username is required</span>}
                        </div>

                        {/* Fullname Field */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-mono">FullName</label>
                            <input
                                type="text"
                                {...register("fullname", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                            />
                            {errors.fullname && <span className="text-red-500">Full name is required</span>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-mono">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                            />
                            {errors.email && <span className="text-red-500">Valid email is required</span>}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="block text-gray-700 dark:text-gray-300 font-mono">Password</label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                {...register("password", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                            />
                            {errors.password && <span className="text-red-500">Password is required</span>}
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
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
