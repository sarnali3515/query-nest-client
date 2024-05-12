import Banner from "./Banner";
import Carousel from "./Carousel";
import RecentQueries from "./RecentQueries";


const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Banner></Banner>
            <RecentQueries></RecentQueries>
        </div>
    );
};

export default Home;