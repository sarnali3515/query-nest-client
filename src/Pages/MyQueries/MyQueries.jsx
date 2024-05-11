import { Link } from "react-router-dom";
import img from '../../assets/images/query-2.1.jpg'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdEdit, MdOpenInFull, MdDelete } from "react-icons/md";
import axios from "axios";

const MyQueries = () => {
    const { user } = useContext(AuthContext);

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries/${user?.email}`);
            setQueries(data);
        }
        getData()
    }, [user])

    console.log(queries)

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mt-6">
                <div className="hero justify-start min-h-96 rounded" style={{ backgroundImage: `url(${img})` }}>
                    <div className="hero-overlay text-left bg-opacity-0"></div>
                    <div className="">
                        <div className="max-w-md pl-3 lg:pl-10">
                            <h1 className="mb-5 text-5xl font-bold">Any Queries?</h1>
                            <p className="mb-5">Unlock the gateway to your queries realm. Seamlessly add, update, and organize your inquiries in one convenient hub, tailored to your needs.</p>
                            <Link to="/add-queries"><button className="btn bg-emerald-800 text-white font-bold">Add Queries</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/add-queries">Add Queries Now</Link>
            <div className="grid lg:grid-cols-3 gap-5 mb-8">
                {
                    queries.map(query => <div
                        key={query._id}
                    >
                        <div className="card rounded h-[500px] max-w-4xl mx-auto w-full border shadow-xl">
                            <div className="card-body lg:px-14">
                                <h3 className="text-lg font-semibold">{query.queryTitle}</h3>
                                <p className="text-xs">Posted on {query.currentTime}</p>
                                <p><span className="font-semibold">Name:</span> {query.productName}</p>
                                <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                                <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                                <p><span className="font-semibold">Recommendations:</span> {query.recommendationCount}</p>
                                <div className="flex gap-2">
                                    <Link to={`/query/${query._id}`}><button className="btn px-2 bg-emerald-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdOpenInFull> </MdOpenInFull>Details</button></Link>
                                    <Link ><button className="btn px-2 bg-blue-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdEdit></MdEdit>Update</button></Link>
                                    <Link ><button className="btn px-2 bg-red-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdDelete></MdDelete> Delete</button></Link>
                                </div>

                            </div>
                            <figure className="px-5  bg-emerald-50">
                                <img src={query.productImage} alt="Shoes" className="rounded-xl lg:h-40" />
                            </figure>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyQueries;