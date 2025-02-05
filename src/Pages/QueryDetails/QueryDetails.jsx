import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from 'axios'
import { toast } from "react-toastify";


const QueryDetails = () => {
    const query = useLoaderData()
    const { user } = useContext(AuthContext)
    // const { _id, productImage, queryTitle, productName, brandName, alternationReason, userName, userEmail, userImage, currentTime, recommendationCount } = query;

    const [recommendations, setRecommendations] = useState([]);
    const [updatedQuery, setUpdatedQuery] = useState(query);
    const { _id, productImage, queryTitle, productName, brandName, alternationReason, userName, userEmail, userImage, currentTime, recommendationCount } = updatedQuery;

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/recommendation`, { withCredentials: true });
        const filteredRecommendations = data.filter(recommendation => recommendation.queryId === _id);
        setRecommendations(filteredRecommendations);
    }

    const handleRecommendations = async e => {
        e.preventDefault();

        if (userEmail === user?.email) {
            toast.error('Cannot recommend on your own queries');
            return;
        }

        const form = e.target;
        const recommendTitle = form.title.value;
        const recommendName = form.name.value;
        const recommendPhoto = form.photo.value;
        const recommendReason = form.reason.value;
        const recommenderName = user.displayName;
        const recommenderEmail = user.email;
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const recommendTime = formattedDate;

        const recommendationData = {
            queryId: _id,
            queryTitle,
            recommendTitle,
            recommendName,
            recommendPhoto,
            recommendReason,
            productName,
            userName,
            userEmail,
            recommenderName,
            recommenderEmail,
            recommendTime
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/recommendation`, recommendationData)
                .then(res => setUpdatedQuery(res.data.updatedQuery));
            toast.success('Recommendation Successful!');
            form.reset();
            // Update recommendation count locally
            setRecommendations(prevRecommendations => [...prevRecommendations, recommendationData]);
        } catch (err) {
            console.log(err);
            toast.error('Failed to submit recommendation. Please try again later.');
        }
    }
    return (
        <div className="dark:bg-gray-800 py-6">
            <div className="max-w-5xl mx-auto bg-white  dark:bg-gray-900 dark:text-white">
                <div className="grid md:grid-cols-2 py-2  border rounded-t">
                    <div>
                        <div className="card rounded-none border-r border-dashed">
                            <div className="card-body lg:px-14">

                                <div className="flex items-center gap-3 lg:gap-5">
                                    <div className="avatar">
                                        <div className="w-14 md:w-16 rounded-full">
                                            <img src={userImage} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="card-title text-lg md:text-2xl font-bold">{userName}</h2>
                                        <p className="text-sm">Posted on {currentTime}</p>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold">{queryTitle}</h3>
                                <p><span className="font-semibold">Name:</span> {productName}</p>
                                <p><span className="font-semibold">Brand:</span> {brandName}</p>
                                <p><span className="font-semibold">Alternation Reason:</span> {alternationReason}</p>

                                <p><span className="font-semibold">Recommendations:</span> {recommendationCount}</p>

                            </div>
                            <figure className="px-5 max-w-xs mx-auto">
                                <img src={productImage} alt="Shoes" className="rounded-xl " />
                            </figure>
                        </div>
                    </div>
                    <div className="">
                        <div className="card max-w-lg">
                            <form onSubmit={handleRecommendations} className="card-body ">
                                <h1 className="text-2xl font-bold text-center text-emerald-800 dark:text-white">Recommendation Box</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text dark:text-white">Title</span>
                                    </label>
                                    <input type="text" name="title" placeholder="title" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text dark:text-white">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Product Name" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text dark:text-white">Image URL</span>
                                    </label>
                                    <input type="text" name="photo" placeholder="Product Image URL" className="input input-bordered" required />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text dark:text-white">Reason of Recommendation</span>
                                    </label>
                                    <input type="text" name="reason" placeholder="Why Recommending this product?" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-emerald-200 font-bold">Recommend</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="border-x border-b rounded-b  bg-emerald-50 dark:bg-gray-800">
                    <h4 className="ml-6 pt-6 font-semibold">All Recommendations ({recommendationCount}) -{">"} </h4>
                    {
                        recommendationCount === 0 && <p className="pl-6 md:pl-8">No Recommendation yet</p>
                    }
                    {
                        recommendations.map(recommendation => <div key={recommendation._id}>
                            {
                                recommendation.queryId === _id &&
                                <div><div>
                                    <div className="card border-b rounded-none border-dashed ">
                                        <div className="card-body lg:px-14">
                                            <div className="flex items-center">
                                                <div>
                                                    <h2 className="card-title text-base md:text-xl font-bold">{recommendation.recommenderName}</h2>
                                                    <p className="text-xs">Recommended on {recommendation.recommendTime}</p>
                                                </div>
                                            </div>
                                            <div className="">

                                                <div className="space-y-3">
                                                    <h3 className="text-base font-semibold">{recommendation.recommendTitle}</h3>
                                                    <p><span className="font-medium">Name:</span> {recommendation.recommendName}</p>
                                                    <figure className="px-5 max-w-36 ">
                                                        <img src={recommendation.recommendPhoto} alt="Shoes" className="rounded-xl " />
                                                    </figure>

                                                    <p><span className="font-medium">Recommend Reason:</span> {recommendation.recommendReason}</p>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div></div>
                            }
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default QueryDetails;