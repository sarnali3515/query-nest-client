import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import './Navbar.css'


const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)

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
            <li className="text-base font-medium"><NavLink to="/">Home</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/queries">Queries</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/recommendation-me">Recommendations
                For Me</NavLink></li>
            <li className="text-base font-medium"><NavLink to="/my-queries">My Queries </NavLink></li>
            <li className="text-base font-medium"><NavLink to="/my-recommendation">My recommendations </NavLink></li>
        </>

    return (
        <div className="bg-emerald-700">
            <div className="navbar  text-white max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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

                    {user ? (
                        <>
                            {/* User profile with hover display name */}
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

                            <Link to="/register"><button className="btn w-14 lg:w-16 bg-transparent text-white border-none hover:bg-none"><p className="flex gap-1"><CiUser></CiUser>Register</p></button></Link>
                            <Link to="/login"><button className="btn ml-2 w-14 lg:w-16 bg-transparent text-white border-none hover:bg-none"><p className="flex gap-1"><IoMdLogIn></IoMdLogIn>Login</p></button></Link>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Navbar;