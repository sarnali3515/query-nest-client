
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const UpdateQueries = () => {
    const navigate = useNavigate()
    const query = useLoaderData();
    const { _id, productImage, queryTitle, productName, brandName, alternationReason, currentTime, userName, userEmail, userImage, recommendationCount } = query;
    console.log(productName)

    const handleUpdateQueries = async e => {
        e.preventDefault();
        const form = e.target;
        const queryTitle = form.title.value;
        const brandName = form.brand.value;
        const productName = form.pname.value;
        const productImage = form.photo.value;
        const alternationReason = form.alternationReason.value;

        const queryData = {
            queryTitle,
            brandName,
            productName,
            productImage,
            alternationReason,
            userName,
            userEmail,
            userImage,
            currentTime,
            recommendationCount
        }
        console.table(queryData);
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/query/${_id}`, queryData);
            console.log(data);
            toast.success('Updated successfully')
            navigate('/my-queries');
        }
        catch (err) {
            console.log(err.message)
            toast.error(err.message)
        }
    }

    return (
        <div className="dark:bg-gray-800 py-5">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleUpdateQueries} className="card-body bg-emerald-100 dark:bg-gray-700 dark:text-white rounded">
                    <h1 className="text-2xl font-bold text-center text-emerald-800 dark:text-white py-5">Update Your Queriess</h1>
                    <div className="md:flex md:gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text dark:text-white">Product Name</span>
                            </label>
                            <input type="text" name="pname" defaultValue={productName} className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text dark:text-white">Brand Name</span>
                            </label>
                            <input type="text" name="brand" defaultValue={brandName} placeholder="Brand of the Product" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Image URL</span>
                        </label>
                        <input type="text" name="photo" defaultValue={productImage} placeholder="Product Image URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Query Title</span>
                        </label>
                        <input type="text" name="title" defaultValue={queryTitle} placeholder="Query Title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Reason of Boycotting</span>
                        </label>
                        <input type="text" name="alternationReason" defaultValue={alternationReason} placeholder="Why Boycotting this product?" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-emerald-300 font-bold">Post Queries</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateQueries;