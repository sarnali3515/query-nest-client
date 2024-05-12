import { Link } from "react-router-dom";
import img from '../../assets/images/query-2.1.jpg'
import { Typewriter } from 'react-simple-typewriter';


const Banner = () => {
    return (
        <div className="max-w-7xl mx-auto mb-6">
            <div className="mt-6">
                <div className="hero justify-start min-h-96 rounded" style={{ backgroundImage: `url(${img})` }}>
                    <div className="hero-overlay text-left bg-opacity-0"></div>
                    <div className="">
                        <div className="max-w-xl pl-3 lg:pl-10">
                            <h1 className="mb-5 text-5xl font-bold">
                                <Typewriter
                                    words={['Explore All Queries', 'Discover New Insights']}
                                    loop={false}
                                    cursor
                                    cursorStyle='_'
                                    typeSpeed={70}
                                    deleteSpeed={80}
                                    delaySpeed={2000}
                                    onType={(text) => (
                                        <h1 className="mb-5 text-5xl font-bold animate__animated animate__shakeX" style={{ fontSize: '3rem' }}>{text}</h1>
                                    )}
                                />
                            </h1>
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