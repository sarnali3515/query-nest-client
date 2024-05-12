
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img2 from '../../assets/images/carousel1.jpg'
import img1 from '../../assets/images/carousel2.jpg'
import img3 from '../../assets/images/carousel3.jpg'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function Carousel() {
    return (
        <div className='container px-6 pt-10 pb-5 mx-auto rounded-xl'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3800,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide
                        image={img1}
                        title='Discover Your Next Favorite Product'
                        text='Explore our curated selection of top-rated products and find the perfect match for your needs'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={img2}
                        title='Expert Recommendations Just for You'
                        text='Get personalized recommendations from our community of experts and make informed purchasing decisions.'
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={img3}
                        title='Stay Ahead of the Curve'
                        text='Stay updated on the latest trends and innovations in the world of products with our comprehensive guides and reviews.'
                    ></Slide>
                </SwiperSlide>



            </Swiper>
        </div>
    );
}
