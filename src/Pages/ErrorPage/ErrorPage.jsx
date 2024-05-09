// import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-9xl mb-5">404!</h1>
            <h2 className="text-5xl mb-7">Page Not Found!</h2>
            <Link className="btn text-xl bg-lime-700 text-white" to="/">Back To Home</Link>
            {/* <Helmet>
                <title>Urban Charm | Error</title>
            </Helmet> */}
        </div>
    );
};

export default ErrorPage;