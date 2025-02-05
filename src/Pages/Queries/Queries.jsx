import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { BsFillGrid3X3GapFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { TbLayoutListFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";


const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [gridLayout, setGridLayout] = useState("grid-cols-1");
    const [cardStyle, setCardStyle] = useState("");
    const [cardStyle2, setCardStyle2] = useState("");
    const [cardStyleImg, setCardStyleImg] = useState("");
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries`);
                setQueries(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                toast.error("Error fetching data. Please try again later.");
            }
        };

        const getFavorites = async () => {
            if (user?.email) {
                try {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites/${user.email}`);
                    const favoriteIds = data.map(fav => fav.queryId);
                    setFavorites(favoriteIds);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                    toast.error("Error fetching favorites. Please try again later.");
                }
            }
        };

        getData();
        getFavorites();
    }, [user]);

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

    const handleAddToFavorites = async (query) => {
        if (!user) {
            navigate("/login");
            return;
        }
        const queryId = query._id;
        console.log(queryId);

        if (favorites.includes(queryId)) {
            toast.error('This query is already in your favorites.');
            return;
        }

        const queryData = {
            queryTitle: query.queryTitle,
            queryId: query._id,
            userName: query.userName,
            recommendationCount: query.recommendationCount,
            userEmail: user?.email,
            brandName: query.brandName,
            productName: query.productName,
            productImage: query.productImage
        };
        console.table(queryData);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, queryData);
            console.log(data);
            setFavorites([...favorites, query._id]);

            toast.success('Added to favorite')
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <div className="bg-emerald-50 dark:bg-gray-800">
            <div className="flex justify-center pt-4">
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
                <button onClick={() => toggleGridLayout("grid-cols-1")} className="btn bg-emerald-600 dark:bg-gray-950 text-white hidden md:inline mr-2"><TbLayoutListFilled /></button>
                <button onClick={() => toggleGridLayout("grid-cols-2")} className="btn bg-emerald-600 dark:bg-gray-950 text-white hidden md:inline mr-2"><IoGrid /></button>
                <button onClick={() => toggleGridLayout("grid-cols-3")} className="btn bg-emerald-600 dark:bg-gray-950 text-white hidden lg:inline"><BsFillGrid3X3GapFill /></button>
            </div>

            {
                loading ? (<div className="text-center my-10 md:my-20">
                    <span className="loading loading-lg loading-spinner text-success"></span>
                </div>) : (<div className={`grid gap-5 py-8 max-w-7xl mx-auto ${gridLayout}`}>
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


                                        <button
                                            className="btn btn-sm w-40"
                                            onClick={() => handleAddToFavorites(query)}
                                        >
                                            {favorites.includes(query._id) ? <>Added <BsHeartFill></BsHeartFill></> : <>Add to Favorite <BsHeart></BsHeart></>}
                                        </button>

                                        <Link to={`/query/${query._id}`}><button className="btn bg-emerald-200 dark:bg-gray-950 dark:text-white font-bold w-full lg:max-w-3xl lg:mx-auto">Recommend</button></Link>
                                    </div>
                                    <figure className="px-5 bg-emerald-100 dark:bg-gray-950">
                                        <img src={query.productImage} alt="Shoes" className={`rounded-xl md:max-w-lg ${cardStyleImg}`} />
                                    </figure>
                                </div>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    );
};

export default Queries;
