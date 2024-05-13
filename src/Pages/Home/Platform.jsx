import gif1 from '../../assets/images/icons8-clock.gif'
import gif2 from '../../assets/images/icons8-delivered-box.gif'
import gif3 from '../../assets/images/icons8-money-box.gif'
import gif4 from '../../assets/images/icons8-trust.gif'

const Platform = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mt-8 mb-8 border-l-4 border-emerald-600 dark:text-white pl-4"> Why Our Platform Matters </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5  pb-8">
                {/* card 1 */}
                <div className="card w-full bg-base-100 border-emerald-500 border-2 dark:bg-gray-600 dark:text-white shadow-xl">

                    <div className="card-body">

                        <img className='w-10' src={gif1} alt="" />
                        <h2 className="card-title">Quick Solutions</h2>
                        <p>Find alternatives swiftly.</p>

                    </div>
                </div>
                {/* card 2 */}
                <div className="card w-full bg-base-100 border-emerald-500 border-2 dark:bg-gray-600 dark:text-white shadow-xl">
                    <div className="card-body">
                        <img className='w-10' src={gif2} alt="" />
                        <h2 className="card-title">Diverse Options</h2>
                        <p>Explore a wide range.</p>

                    </div>
                </div>
                {/* card 3 */}
                <div className="card w-full bg-base-100 border-emerald-500 border-2 dark:bg-gray-600 dark:text-white shadow-xl">
                    <div className="card-body">
                        <img className='w-10' src={gif3} alt="" />
                        <h2 className="card-title">Budget-Friendly</h2>
                        <p>Discover cost-effective options.</p>

                    </div>
                </div>
                {/* card 4 */}
                <div className="card w-full bg-base-100 border-emerald-500 border-2 dark:bg-gray-600 dark:text-white shadow-xl">
                    <div className="card-body">
                        <img className='w-10' src={gif4} alt="" />
                        <h2 className="card-title">Trusted Suggestions</h2>
                        <p>Benefit from user insights.</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platform;