

const Slide = ({ image, text, title }) => {
    return (
        <div><div className="hero min-h-screen rounded-xl" style={{ backgroundImage: `url(${image})` }}>
            <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-2xl">
                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">{title}</h1>
                    <p className="mb-5">{text}</p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div></div>
    );
};

export default Slide;