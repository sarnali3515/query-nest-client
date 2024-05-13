import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TbLayoutListFilled } from "react-icons/tb";


const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [gridLayout, setGridLayout] = useState("grid-cols-1");
    const [cardStyle, setCardStyle] = useState("");
    const [cardStyle2, setCardStyle2] = useState("");
    const [cardStyleImg, setCardStyleImg] = useState("");

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`);
            setQueries(data);
        };
        getData();
    }, []);

    useEffect(() => {
        setFilteredQueries(queries.filter(query => query.productName.toLowerCase().includes(searchText.toLowerCase())));
    }, [queries, searchText]);

    const toggleGridLayout = (layout) => {
        setGridLayout(layout);
        setCardStyle(layout === "grid-cols-3" && "h-[680px]");
        setCardStyle2(layout === 'grid-cols-2' && "h-[700px]");
        setCardStyleImg(layout === 'grid-cols-3' && "md:h-60 md:max-w-96");
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="bg-emerald-50 dark:bg-gray-800">
            <div className="flex justify-center  pt-4">
                <div className="relative">
                    <label className="input input-bordered dark:text-white dark:bg-black flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search by product name"
                            value={searchText}
                            onChange={handleSearchChange} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                </div>
            </div>
            <div className="flex justify-center pt-8">
                <button onClick={() => toggleGridLayout("grid-cols-1")} className="btn bg-emerald-600 dark:bg-gray-950 text-white mr-2"><TbLayoutListFilled></TbLayoutListFilled></button>
                <button onClick={() => toggleGridLayout("grid-cols-2")} className="btn bg-emerald-600 dark:bg-gray-950 text-white mr-2"><IoGrid></IoGrid></button>
                <button onClick={() => toggleGridLayout("grid-cols-3")} className="btn bg-emerald-600 dark:bg-gray-950 text-white"><BsFillGrid3X3GapFill></BsFillGrid3X3GapFill></button>
            </div>

            <div className={`grid gap-5 py-8 max-w-7xl mx-auto ${gridLayout}`}>
                {
                    filteredQueries.map(query => (
                        <div key={query._id}>
                            <div className={`card bg-white dark:bg-gray-900 dark:text-white rounded max-w-4xl mx-auto w-full border-2 ${cardStyle} ${cardStyle2}`}>
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
                                    <Link to={`/query/${query._id}`}><button className="btn bg-emerald-200 dark:bg-gray-950 dark:text-white font-bold w-full lg:max-w-3xl lg:mx-auto">Recommend</button></Link>
                                </div>
                                <figure className="px-5  bg-emerald-100 dark:bg-gray-950">
                                    <img src={query.productImage} alt="Shoes" className={`rounded-xl md:max-w-lg ${cardStyleImg}`} />
                                </figure>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}; export default Queries;