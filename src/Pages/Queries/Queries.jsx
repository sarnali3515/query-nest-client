// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


const Queries = () => {
    // const queries = useLoaderData()
    // const { productImage, queryTitle, productName, brandName, alternationReason } = queries;

    const [queries, setQueries] = useState()
    const [gridLayout, setGridLayout] = useState("grid-cols-1");
    const [cardStyle, setCardStyle] = useState("");
    const [cardStyle2, setCardStyle2] = useState("");
    const [cardStyleImg, setCardStyleImg] = useState("");

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`)
            setQueries(data)
        }
        getData();
    }, [])

    const toggleGridLayout = (layout) => {
        setGridLayout(layout);
        setCardStyle(layout === "grid-cols-3" ? "h-[680px]" : "h-auto")
        setCardStyle2(layout === 'grid-cols-2' && "h-[700px]");
        setCardStyleImg(layout === 'grid-cols-3' && "md:h-60 md:max-w-96");
    };

    return (
        <div className="bg-emerald-50">
            <div className="flex justify-center pt-5">
                <button onClick={() => toggleGridLayout("grid-cols-1")} className="btn mr-2">1 Column</button>
                <button onClick={() => toggleGridLayout("grid-cols-2")} className="btn mr-2">2 Columns</button>
                <button onClick={() => toggleGridLayout("grid-cols-3")} className="btn">3 Columns</button>
            </div>
            <div className={`grid gap-5 py-8 max-w-7xl mx-auto ${gridLayout}`}>
                {
                    queries?.map(query => <div key={query._id}>
                        <div className={`card bg-white rounded max-w-4xl mx-auto w-full border-2 ${cardStyle} ${cardStyle2}`}>
                            <div className="card-body lg:px-14">

                                <div className="flex items-center gap-3 lg:gap-5">
                                    <div className="avatar">
                                        <div className="w-14 md:w-16 rounded-full">
                                            <img src={query.userImage} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title text-lg md:text-2xl font-bold">{query.userName}</h2>
                                        <p className="text-base">{query.currentTime}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold">{query.queryTitle}</h3>
                                <p><span className="font-semibold">Name:</span> {query.productName}</p>
                                <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                                <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                                <p><span className="font-semibold">Recommendations:</span> {query.recommendationCount}</p>
                                <Link to={`/query/${query._id}`}><button className="btn bg-emerald-200 font-bold w-full lg:max-w-3xl lg:mx-auto">Recommend</button></Link>
                            </div>
                            <figure className="px-5  bg-emerald-100">
                                <img src={query.productImage} alt="Shoes" className={`rounded-xl lg:max-w-lg ${cardStyleImg}`} />
                            </figure>
                        </div>
                    </div>)

                }
            </div>

        </div>
    );
};

export default Queries;