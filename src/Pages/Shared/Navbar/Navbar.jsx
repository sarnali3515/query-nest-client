import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import './Navbar.css'
import { useTheme } from "../../Hook/UseTheme";
import { FaHome } from 'react-icons/fa';



const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const { changeTheme } = useTheme()

    const handleSignOut = () => {
        logOut()
            .then(
                result => {
                    console.log(result)
                    toast.success('Logout Successful')
                }
            )
            .catch();
    };
    if (loading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-lg loading-spinner text-success"></span>
            </div>
        );
    }

    const navLinks =
        <>
            <li className="text-base font-medium"><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/queries">Queries</NavLink></li>
            {
                user &&
                <>
                    <li className="text-base font-medium"><NavLink to="/recommendation-me">Recommendations
                        For Me</NavLink></li>
                    <li className="text-base font-medium"><NavLink to="/my-queries">My Queries </NavLink></li>
                    <li className="text-base font-medium"><NavLink to="/my-recommendation">My recommendations </NavLink></li>
                    <li className="text-base font-medium"><NavLink to="/my-favorites">Favorites </NavLink></li>
                </>
            }
        </>

    return (
        <div className="bg-emerald-700 dark:bg-gray-900">
            <div className="navbar text-white max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost px-1 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-emerald-600 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost ml-0 pl-0 "><img className="h-8 lg:h-14" src="https://i.ibb.co/D1BgPjW/query2-removebg-preview-1.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="swap swap-rotate mr-3 md:mr-4">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox"
                            onChange={changeTheme}

                        />

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-5 md:w-10 h-5 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-off fill-current w-5 md:w-10 h-5 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>

                    {user ? (
                        <>

                            <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full" title={user.displayName}>
                                        <img alt={user.displayName} src={user.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                                    <li><button className="btn bg-cyan-500 text-white">{user.displayName}</button></li>
                                    <li><button onClick={handleSignOut} className="btn bg-cyan-500 text-white"><RiLogoutCircleLine></RiLogoutCircleLine>Log Out</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/register"><button className="btn w-14 lg:w-16 bg-transparent text-white  border-none hover:bg-none"><p className="flex gap-1"><CiUser></CiUser>Register</p></button></Link>
                            <Link to="/login"><button className="btn ml-2 lg:ml-4 w-14 lg:w-16 bg-transparent text-white  border-none hover:bg-none"><p className="flex gap-1"><IoMdLogIn></IoMdLogIn>Login</p></button></Link>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;