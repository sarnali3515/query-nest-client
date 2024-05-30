import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import Swal from "sweetalert2";
import { IoHeartDislikeSharp } from "react-icons/io5";

const MyFavorite = () => {
    const { user } = useContext(AuthContext);

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(favorites);

    useEffect(() => {
        getData()
    }, [user]);

    const getData = async () => {

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/favorites/${user?.email}`, { withCredentials: true });
            setFavorites(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            toast.error("Error fetching data. Please try again later.");
        }
    }

    const handleRemoveFavorite = async id => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/favorite/${id}`, { withCredentials: true });
                toast.success('Removed Successfully!');
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
                <h2 className="flex items-center justify-center text-3xl mb-5 gap-3">My Favorites <BsHeart></BsHeart></h2>
                <div className="overflow-x-auto bg-emerald-50 dark:bg-gray-700 dark:text-white">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-emerald-100 dark:bg-gray-900 dark:text-white">
                            <tr>
                                <th className="md:text-sm">Query Information</th>
                                <th className="md:text-sm">Product Information</th>

                                <th className="md:text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                favorites.map(favorite =>
                                    <tr key={favorite._id}>
                                        <td>
                                            <span className="font-bold">{favorite.queryTitle}</span>
                                            <br />
                                            <span className="badge badge-ghost badge-sm">Query By {favorite.userName}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={favorite.productImage} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{favorite.productName}</div>
                                                    <div className="text-sm opacity-50">{favorite.brandName}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <th>
                                            <Link to={`/query/${favorite.queryId}`}>
                                                <button title="View Details" className="btn btn-ghost btn-xs text-xl"><GrView /></button>
                                            </Link>
                                            <button title="Remove From Favorites" onClick={() => handleRemoveFavorite(favorite._id)} className="btn btn-ghost btn-xs text-2xl"><IoHeartDislikeSharp></IoHeartDislikeSharp></button>
                                        </th>
                                    </tr>
                                )
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyFavorite;