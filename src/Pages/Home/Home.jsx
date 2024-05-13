import Banner from "./Banner";
import Carousel from "./Carousel";
import FaqSection from "./FaqSection";
import Platform from "./Platform";
import RecentQueries from "./RecentQueries";


const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-800">
            <Carousel></Carousel>
            <Banner></Banner>
            <RecentQueries></RecentQueries>
            <Platform></Platform>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;