import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

const MyRecommendations = () => {

    const { user } = useContext(AuthContext);

    const [myRecommendations, setMyRecommendations] = useState([]);

    useEffect(() => {
        getData()
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/my-recommendation/${user?.email}`);
        setMyRecommendations(data);
    }
    console.log(myRecommendations)
    return (
        <div className="max-w-7xl mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-4">My Recommendations</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Query Information</th>
                            <th>Recommended Product Information</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                        <Link to={`/query/${recommendation.queryId}`}><button className="btn btn-ghost btn-xs text-xl"><GrView></GrView></button></Link>
                                        <button className="btn btn-ghost btn-xs text-2xl"><MdDelete></MdDelete></button>
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