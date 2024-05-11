// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


const Queries = () => {
    // const queries = useLoaderData()
    // const { productImage, queryTitle, productName, brandName, alternationReason } = queries;

    const [queries, setQueries] = useState()

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`)
            setQueries(data)
        }
        getData();
    }, [])

    return (
        <div className="grid gap-5 py-8 max-w-7xl mx-auto">
            {
                queries?.map(query => <div key={query._id}>
                    <div className="card rounded max-w-4xl mx-auto w-full border shadow-xl">
                        <div className="card-body lg:px-14">

                            <div className="flex items-center gap-3 lg:gap-5">
                                <div className="avatar">
                                    <div className="w-14 md:w-16 rounded-full">
                                        <img src={query.userImage} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="card-title text-lg md:text-2xl font-bold">{query.userName}</h2>
                                    <p>{query.currentTime}</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">{query.queryTitle}</h3>
                            <p><span className="font-semibold">Name:</span> {query.productName}</p>
                            <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                            <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                            <p><span className="font-semibold">Recommendations:</span> {query.recommendationCount}</p>
                            <Link to={`/query/${query._id}`}><button className="btn bg-emerald-100 font-bold w-full lg:max-w-3xl lg:mx-auto">Recommend</button></Link>

                        </div>
                        <figure className="px-5  bg-emerald-50">
                            <img src={query.productImage} alt="Shoes" className="rounded-xl lg:max-w-xl" />
                        </figure>
                    </div>
                </div>)

            }
        </div>
    );
};

export default Queries;