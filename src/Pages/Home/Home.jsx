import Banner from "./Banner";
import Carousel from "./Carousel";
import RecentQueries from "./RecentQueries";


const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-800">
            <Carousel></Carousel>
            <Banner></Banner>
            <RecentQueries></RecentQueries>
        </div>
    );
};

export default Home;