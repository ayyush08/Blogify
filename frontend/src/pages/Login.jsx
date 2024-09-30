import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { login } from '@/store/authSlice';
import { useLoginUser } from '@/hooks/user.hook';

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, isSubmitting } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { mutateAsync: loginUser,isPending } = useLoginUser();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = async (data) => {
        try {
            const loggedInUser = await loginUser({
                email: data.email,
                password: data.password,
            });
            
            if (loggedInUser) {
                console.log('Logged in user:', loggedInUser);
                
                dispatch(login(loggedInUser.data.user));
                navigate('/');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error(error);
            
        }
    };

    return (
        <div className="flex mx-auto min-h-[80vh] p-2 items-center justify-center dark:bg-teal-900">
            <Toaster />
            <div className="max-w-md w-full p-8 rounded-lg shadow-2xl shadow-accent-foreground">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 font-mono text-center">Login</h2>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-mono">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                        />
                        {errors.email && <div className="text-red-500">Email is required</div>}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 font-mono">Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            {...register("password", {
                                required: { value: true, message: 'Password is required' },
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                maxLength: { value: 20, message: 'Password cannot exceed 20 characters' }
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-white dark:border-gray-600 dark:text-black"
                        />
                        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute top-[40px] right-0 pr-3 flex items-center cursor-pointer"
                        >
                            {passwordVisible ? <FaEyeSlash style={{color:'black'}} /> : <FaEye style={{color:'black'}} />}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full font-sans bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isSubmitting||isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
