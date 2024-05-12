import { Link } from "react-router-dom";
import img from '../../assets/images/query-2.1.jpg'


const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto mb-6">
            <div className="mt-6">
                <div className="hero justify-start min-h-96 rounded" style={{ backgroundImage: `url(${img})` }}>
                    <div className="hero-overlay text-left bg-opacity-0"></div>
                    <div className="">
                        <div className="max-w-lg pl-3 lg:pl-10">
                            <h1 className="mb-5 text-5xl font-bold">Explore All Queries</h1>
                            <p className="mb-5">Empower your decisions with knowledge at your fingertips. Delve into our expansive repository of queries and embark on a journey of discovery.</p>
                            <Link to="/queries"><button className="btn bg-emerald-800 text-white font-bold">All Queries</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;