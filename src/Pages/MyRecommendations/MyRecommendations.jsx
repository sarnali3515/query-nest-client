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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`, { withCredentials: true });
            setMyRecommendations(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            toast.error("Error fetching data. Please try again later.");
        }
    };

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
                await axios.delete(`${import.meta.env.VITE_API_URL}/recommendation/${id}`);
                toast.success('Deleted Successfully!');
                // Refresh UI
                getData();
            }
        } catch (error) {
            console.error("Error deleting recommendation:", error);
            toast.error("Error deleting recommendation. Please try again later.");
        }
    };

    return (
        <div className="dark:bg-gray-800 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">My Recommendations</h1>
                {loading ? (
                    <div className="text-center my-10 md:my-20">
                        <span className="loading loading-lg loading-spinner text-success"></span>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-emerald-50 dark:bg-gray-700 dark:text-white">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-emerald-100 dark:bg-gray-900 dark:text-white">
                                <tr className="font-black">
                                    <th className="md:text-sm">Query Information</th>
                                    <th className="md:text-sm">Recommended Product Information</th>
                                    <th className="md:text-sm">Time</th>
                                    <th className="md:text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    myRecommendations.length === 0 &&
                                    <p className="text-lg text-center py-3">No Recommendation available</p>
                                }
                                {myRecommendations.map(recommendation => (
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
                                            <Link to={`/query/${recommendation.queryId}`}>
                                                <button title="View Details" className="btn btn-ghost btn-xs text-xl"><GrView /></button>
                                            </Link>
                                            <button title="Delete" onClick={() => handleDeleteRecommendation(recommendation._id)} className="btn btn-ghost btn-xs text-2xl"><MdDelete /></button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRecommendations;
