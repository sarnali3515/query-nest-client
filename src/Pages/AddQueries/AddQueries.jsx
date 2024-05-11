import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddQueries = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddQueries = async e => {
        e.preventDefault();
        const form = e.target;
        const queryTitle = form.title.value;
        const brandName = form.brand.value;
        const productName = form.pname.value;
        const productImage = form.photo.value;
        const alternationReason = form.alternationReason.value;
        const userName = user?.displayName;
        const userEmail = user?.email;
        const userImage = user?.photoURL;

        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const currentTime = formattedDate;

        const recommendationCount = 0;

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
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/queries`, queryData);
            console.log(data);
            toast.success('Added successfully')
            navigate('/my-queries');
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }
    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleAddQueries} className="card-body bg-emerald-100 my-5 rounded">
                <h1 className="text-2xl font-bold text-center text-emerald-800 py-5">Add Your Queries</h1>
                <div className="md:flex md:gap-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input type="text" name="pname" placeholder="Product Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Brand Name</span>
                        </label>
                        <input type="text" name="brand" placeholder="Brand of the Product" className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="Product Image URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Query Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Query Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Reason of Boycotting</span>
                    </label>
                    <input type="text" name="alternationReason" placeholder="Why Boycotting this product?" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-emerald-300 font-bold">Post Queries</button>
                </div>
            </form>

        </div>
    );
};

export default AddQueries;