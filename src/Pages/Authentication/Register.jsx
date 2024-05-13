import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Provider/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { GithubAuthProvider, GoogleAuthProvider, updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const { createUser, googlePopup, githubPopup, user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await googlePopup(googleProvider);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            )
            console.log(result);
            toast.success('Registration Successful!');

            const name = result.user.displayName;
            const email = result.user.email;
            const photoURL = result.user.photoURL;
            console.log(name, email, photoURL);

            // Generate JWT token

            console.log(data); // Assuming data contains the JWT token

            navigate(location?.state ? location.state : '/');
        } catch (error) {
            console.error(error);
            toast.error('Registration Failed!');
        }
    }


    const handleGithubSignIn = async () => {
        try {
            const result = await githubPopup(githubProvider);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            )
            console.log(data);
            toast.success('Registration Successful!');

            const name = result.user.displayName;
            const email = result.user.email;
            const photoURL = result.user.photoURL;
            console.log(name, email, photoURL);

            navigate(location?.state ? location.state : '/');
        } catch (error) {
            console.error(error);
            toast.error('Registration Failed!');
        }
    }


    const handleRegister = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photo.value;
        const password = form.password.value;
        console.log(name, email, photoURL, password);

        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const lengthRequirement = password.length >= 6;

        if (!uppercaseRegex.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }

        if (!lowercaseRegex.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        if (!lengthRequirement) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        try {
            const result = await createUser(email, password);
            console.log(result.user);

            // Update profile
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL
            });
            console.log('Profile updated');

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
                { email: result?.user?.email },
                { withCredentials: true }
            )
            console.log(data)
            toast.success('Registration Successful!');
            navigate(location?.state ? location.state : '/');
        } catch (error) {
            console.error(error);
        }
    }
    if (user || loading) return;
    return (
        <div>
            <section className="bg-emerald-50 lg:py-10 dark:bg-gray-800">
                <div className="container flex items-center justify-center min-h-screen  mx-auto">
                    <form onSubmit={handleRegister} className="w-full rounded dark:bg-gray-700 bg-emerald-100 p-5 max-w-md">
                        <p className="text-center text-xl dark:text-white">Welcome to QueryNest!</p>

                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white text-center">Sign Up</h1>

                        {/* Name */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6m6-6H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2z" />
                                </svg>
                            </span>
                            <input type="text" name="name" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        </div>

                        {/* Email */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input type="email" name="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                        </div>

                        {/* Password */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>
                                }
                            </span>
                            <input type={showPassword ? "text" : "password"} name="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                        </div>

                        {/* Photo */}
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0h-3m3 0h3m-3 0l3-3.501M4 19h16a2 2 0 002-2V9a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="text" name="photo" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Photo URL" />
                        </div>


                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-lg  hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-50">
                                Sign Up
                            </button>
                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                                <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or Sign Up with</a>

                                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                            </div>

                            <button onClick={handleGoogleSignIn} className="flex w-full items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500">
                                <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                                <span className="mx-2">Sign Up with Google</span>
                            </button>
                            <button onClick={handleGithubSignIn} className="flex w-full items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500">
                                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.578 0-.285-.01-1.041-.015-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.385-1.334-1.754-1.334-1.754-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.812 1.304 3.498.998.108-.775.417-1.304.759-1.604-2.665-.303-5.466-1.334-5.466-5.93 0-1.312.469-2.384 1.236-3.224-.124-.304-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23.957-.267 1.98-.399 3-.405 1.02.006 2.043.138 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.242 2.872.118 3.176.77.84 1.235 1.912 1.235 3.224 0 4.609-2.805 5.623-5.478 5.918.431.371.812 1.102.812 2.222 0 1.605-.015 2.896-.015 3.287 0 .32.192.695.8.577C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12"></path>
                                </svg>
                                <span className="mx-2">Sign Up with GitHub</span>
                            </button>

                            <div className="mt-6 text-center ">
                                <p className="text-sm dark:text-white">
                                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login.</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Register;