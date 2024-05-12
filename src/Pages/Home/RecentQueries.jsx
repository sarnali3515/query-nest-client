import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`);
        setQueries(data);
    }

    console.log(queries)

    return (
        <div className="">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-8 max-w-7xl mx-auto ">
                {
                    queries?.map(query => <div key={query._id}>
                        <Link to={`/query/${query._id}`}>
                            <div className="card  rounded w-full border-2 shadow-xl h-[600px]">
                                <div className="card-body lg:px-6">

                                    <div className="flex items-center gap-2 md:gap-4">
                                        <div className="avatar">
                                            <div className="w-12 md:w-14 rounded-full">
                                                <img src={query.userImage} />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="card-title text-lg md:text-xl font-bold">{query.userName}</h2>
                                            <p className="text-xs">{query.currentTime}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold">{query.queryTitle}</h3>
                                    <p><span className="font-semibold">Name:</span> {query.productName}</p>
                                    <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                                    <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                                    <p><span className="font-semibold">Recommendations:</span> {query.recommendationCount}</p>

                                </div>
                                <figure className="px-5  bg-emerald-100">
                                    <img src={query.productImage} alt="Shoes" className="rounded-xl md:h-60 md:max-w-96" />
                                </figure>
                            </div>
                        </Link>
                    </div>)

                }
            </div>
        </div>
    );
};

export default RecentQueries;