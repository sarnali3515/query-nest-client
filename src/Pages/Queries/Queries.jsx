import { useLoaderData } from "react-router-dom";


const Queries = () => {
    const queries = useLoaderData()
    // const { productImage, queryTitle, productName, brandName, alternationReason } = queries;

    return (
        <div className="grid gap-5 py-8 max-w-7xl mx-auto">
            {
                queries.map(query => <div key={query._id}>
                    <div className="card rounded max-w-4xl mx-auto w-full border shadow-xl">
                        <div className="card-body lg:px-14">

                            <div className="flex items-center gap-3 lg:gap-5">
                                <div className="avatar">
                                    <div className="w-14 md:w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="card-title text-lg md:text-2xl font-bold">Khatuna Jannat Sarnali</h2>
                                    <p>Posted on 10/05/2024</p>
                                </div>
                            </div>


                            <h3 className="text-lg font-semibold">{query.queryTitle}</h3>


                            <p><span className="font-semibold">Name:</span> {query.productName}</p>
                            <p><span className="font-semibold">Brand:</span> {query.brandName}</p>
                            <p><span className="font-semibold">Alternation Reason:</span> {query.alternationReason}</p>

                            <p><span className="font-semibold">Recommendations:</span> 2</p>
                            <button className="btn bg-emerald-100 font-bold w-full lg:max-w-3xl lg:mx-auto">Recommend</button>




                        </div>
                        <figure className="px-5  bg-emerald-50">
                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl lg:max-w-xl" />
                        </figure>
                    </div>
                </div>)

            }
        </div>
    );
};

export default Queries;