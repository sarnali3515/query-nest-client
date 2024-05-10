

const AddQueries = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <form className="card-body bg-emerald-100 my-5 rounded">
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
                    <input type="text" name="boycottReason" placeholder="Why Boycotting this product?" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-emerald-300 font-bold">Post Queries</button>
                </div>
            </form>

        </div>
    );
};

export default AddQueries;