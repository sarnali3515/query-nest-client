import { Link } from "react-router-dom";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className="bg-emerald-800 dark:bg-gray-950 text-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <Link to="/" className="btn btn-ghost"><img className="h-8 lg:h-14" src="https://i.ibb.co/D1BgPjW/query2-removebg-preview-1.png" alt="" /></Link>
                        <h1 className="max-w-lg text-xl font-semibold tracking-tight xl:text-2xl text-white">Subscribe our newsletter to get update.</h1>

                        <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                            <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" />

                            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-emerald-50 transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-emerald-950 rounded-lg hover:bg-emerald-600 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="md:mt-5">
                        <p className="font-semibold text-white">Quick Link</p>

                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className="text-white transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-emerald-400">Home</a>
                            <a href="#" className="text-white transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-emerald-400">Queries</a>
                            <a href="#" className="text-white transition-colors duration-300 dark:hover:text-blue-400 hover:underline hover:text-emerald-400">My Queries</a>
                        </div>
                    </div>

                    <div className="md:mt-5">
                        <h2 className="text-xl mb-6">Social Links</h2>
                        <div className="flex -mx-2">
                            <a href="#" className="mx-2 text-xl text-white transition-colors duration-300 hover:text-emerald-400 dark:hover:text-blue-400" aria-label="Reddit">
                                <FaSquareFacebook></FaSquareFacebook>
                            </a>

                            <a href="#" className="mx-2 text-xl text-white transition-colors duration-300 hover:text-emerald-400 dark:hover:text-blue-400" aria-label="Facebook">
                                <FaLinkedin></FaLinkedin>
                            </a>


                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />


                <p className="text-center">Copyright © 2024 - All right reserved by QueryNest</p>
            </div>
        </footer>
    );
}

export default Footer;
