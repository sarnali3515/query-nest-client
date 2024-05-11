import { Link } from "react-router-dom";
import img from '../../assets/images/query-2.1.jpg'

const MyQueries = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mt-6">
                <div className="hero justify-start min-h-96 rounded" style={{ backgroundImage: `url(${img})` }}>
                    <div className="hero-overlay text-left bg-opacity-0"></div>
                    <div className="">
                        <div className="max-w-md pl-3 lg:pl-10">
                            <h1 className="mb-5 text-5xl font-bold">Any Queries?</h1>
                            <p className="mb-5">Unlock the gateway to your queries realm. Seamlessly add, update, and organize your inquiries in one convenient hub, tailored to your needs.</p>
                            <Link to="/add-queries"><button className="btn bg-emerald-800 text-white font-bold">Add Queries</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/add-queries">Add Queries Now</Link>
        </div>
    );
};

export default MyQueries;