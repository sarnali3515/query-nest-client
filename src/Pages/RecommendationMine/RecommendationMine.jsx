import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { GrView } from "react-icons/gr";

const RecommendationMine = () => {
    const { user } = useContext(AuthContext);

    const [myRecommendations, setMyRecommendations] = useState([]);

    useEffect(() => {
        getData()
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/recommendation-me/${user?.email}`);
        setMyRecommendations(data);
    }
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
                            <th className="md:text-sm">Recommend Reason</th>
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
                                    <td>
                                        <span>{recommendation.recommendReason}</span></td>
                                    <th>
                                        <Link to={`/query/${recommendation.queryId}`}><button title="View Details" className="btn btn-ghost btn-xs text-xl"><GrView></GrView></button></Link>
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

export default RecommendationMine;