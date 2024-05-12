import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyRecommendations = () => {

    const { user } = useContext(AuthContext);

    const [myRecommendations, setMyRecommendations] = useState([]);

    useEffect(() => {
        getData()
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`, { withCredentials: true });
        setMyRecommendations(data);
    }

    const handleDeleteRecommendation = async id => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/recommendation/${id}`);
                console.log(data);
                toast.success('Deleted Successfully!');
                // Refresh UI
                getData();
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    };
    return (
        <div className="max-w-7xl mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-4">My Recommendations</h1>
            <div className="overflow-x-auto bg-emerald-50">
                <table className="table">
                    {/* head */}
                    <thead className="bg-emerald-100">
                        <tr className="font-black">

                            <th className="md:text-sm">Query Information</th>
                            <th className="md:text-sm">Recommended Product Information</th>
                            <th className="md:text-sm">Time</th>
                            <th className="md:text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myRecommendations.length <= 0 &&
                            <div className="text-center mt-6">
                                <h4 className="text-xl mb-7">No Recommendation Available</h4>
                            </div>
                        }
                        {/* row 1 */}
                        {
                            myRecommendations.map(recommendation => (
                                <tr key={recommendation._id}>

                                    <td>
                                        <span className="font-bold">{recommendation.queryTitle}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Query By {recommendation.userName}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={recommendation.recommendPhoto} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{recommendation.recommendTitle}</div>
                                                <div className="text-sm opacity-50">{recommendation.recommendName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{recommendation.recommendTime}</td>
                                    <th>
                                        <Link to={`/query/${recommendation.queryId}`}><button title="View Details" className="btn btn-ghost btn-xs text-xl"><GrView></GrView></button></Link>
                                        <button title="Delete" onClick={() => handleDeleteRecommendation(recommendation._id)} className="btn btn-ghost btn-xs text-2xl"><MdDelete></MdDelete></button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRecommendations;