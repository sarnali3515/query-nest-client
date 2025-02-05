import { Link } from "react-router-dom";
import img from '../../assets/images/banners1.jpg'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdEdit, MdOpenInFull, MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import 'animate.css'

const MyQueries = () => {
    const { user } = useContext(AuthContext);

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, [user]);

    const getData = async () => {

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/queries/${user?.email}`, { withCredentials: true });
            setQueries(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            toast.error("Error fetching data. Please try again later.");
        }
    }

    const handleDeleteQuery = async id => {
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
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/query/${id}`, { withCredentials: true });
                console.log(data);
                toast.success('Deleted Successfully!');
                // Refresh UI
                getData();
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    };



    return (
        <div className="dark:bg-gray-800 py-6 dark:text-white">
            <div className="max-w-7xl mx-auto">
                <div className="">
                    <div className="hero justify-start min-h-80 rounded" style={{ backgroundImage: `url(${img})` }}>
                        <div className="hero-overlay text-left bg-opacity-0"></div>
                        <div className="">
                            <div className="max-w-md pl-3 lg:pl-10 dark:text-black">
                                <h1 className="mb-5 text-5xl font-bold animate__animated animate__bounce">Any Queries?</h1>
                                <p className="mb-5">Unlock the gateway to your queries realm. Seamlessly add, update, and organize your inquiries in one convenient hub, tailored to your needs.</p>
                                <Link to="/add-queries"><button className="btn bg-emerald-800 text-white font-bold">+ Add Queries</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading ? (
                        <div className="text-center my-10 md:my-20">
                            <span className="loading loading-lg loading-spinner text-success"></span>
                        </div>
                    ) : (
                        <div> <h1 className="text-4xl font-bold text-center mt-8 pb-5 ">My Queries</h1>
                            {
                                queries.length <= 0 &&
                                <div className="text-center mt-6">
                                    <h4 className="text-xl mb-7">No Queries Added</h4>
                                    <Link to="/add-queries" className="border-4 text-bold hover:text-emerald-500 border-dotted px-5 py-3">+ Add Queries Now</Link>
                                </div>
                            }

                            <div data-aos="flip-left" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    queries.map(query => <div
                                        key={query._id}
                                    >
                                        <div className="card rounded h-[600px] max-w-4xl mx-auto w-full border shadow-xl">
                                            <div className="card-body lg:px-8">
                                                <h3 className="text-lg font-semibold">{query.queryTitle}</h3>
                                                <p className="text-xs">Posted on {query.currentTime}</p>
                                                <p><span className="font-semibold">Name:</span> {query.productName}</p>
                                                <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                                                <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                                                <p><span className="font-semibold">Recommendations:</span> {query.recommendationCount}</p>
                                                <div className="flex gap-2">
                                                    <Link to={`/query/${query._id}`}><button className="btn px-2 bg-emerald-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdOpenInFull> </MdOpenInFull>Details</button></Link>
                                                    <Link to={`/update/${query._id}`} ><button className="btn px-2 bg-blue-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdEdit></MdEdit>Update</button></Link>
                                                    <Link ><button onClick={() => { handleDeleteQuery(query._id) }} className="btn px-2 bg-red-200 font-bold w-full lg:max-w-3xl lg:mx-auto"><MdDelete></MdDelete> Delete</button></Link>
                                                </div>
                                            </div>
                                            <figure className="px-5  bg-emerald-50 dark:bg-gray-900">
                                                <img src={query.productImage} alt="Shoes" className="rounded-xl md:h-60 md:max-w-96" />
                                            </figure>
                                        </div>
                                    </div>)
                                }
                            </div></div>)
                }
            </div>
        </div>
    );
};

export default MyQueries;