import gif from '../../assets/images/faqicon2.gif'
import 'animate.css'

const FaqSection = () => {
    return (
        <div className='max-w-7xl mx-auto py-10'>
            <h1 className="text-3xl font-bold mt-8 mb-8 border-l-4 border-emerald-600 dark:text-white pl-4 "> FAQ</h1>
            <div className='flex flex-col-reverse md:flex-row md:gap-24'>

                <div className='lg:pl-6'>
                    <div className="collapse collapse-arrow bg-emerald-100 dark:bg-gray-600 dark:text-white">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What is the purpose of this website?
                        </div>
                        <div className="collapse-content">
                            <p>Our website aims to provide users with alternative product recommendations, helping them make informed purchasing decisions.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-emerald-100 dark:bg-gray-600 dark:text-white">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-xl font-medium">
                            How do I add a query to the system?
                        </div>
                        <div className="collapse-content">
                            <p>To add a query, navigate to the Add Query page and fill out the form with details such as the product name, brand, and reason for seeking alternatives.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-emerald-100 dark:bg-gray-600 dark:text-white">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-xl font-medium">
                            Can I trust the recommendations provided by other users?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, our platform fosters a community of trust where users share their experiences and recommendations, ensuring reliable suggestions.</p>
                        </div>
                    </div>

                </div>
                <div className='flex items-center justify-center'>
                    <img src={gif} className='w-40 md:w-72' alt="" />
                </div>
            </div>
        </div>
    );
};

export default FaqSection;