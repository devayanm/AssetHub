import React from "react";
import { Button, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import images from "../../constants/images";

const Home = () => {
    const handleExploreClick = () => {
        window.location.href = "/explore";
    };

    return (
        <>
            <div className=" hero container-fluid mb-3">
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={images.background1}
                            alt="First slide"
                            style={{ maxHeight: "80vh", objectFit: "cover", filter: "blur(5px)" }}
                        />
                        <Carousel.Caption className="text-start d-md-flex align-items-md-center justify-content-md-start h-100">
                            <div className="bg-white bg-opacity-50 p-4 rounded-start text-left" style={{ borderTopRightRadius: "30px", borderBottomRightRadius: "30px", marginTop: "30px" }}>
                                <h1 className="text-dark fw-bold mb-3 display-5">Mere Paas to</h1>
                                <h2 className="text-dark fw-bold mb-4 display-6">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                <h3 className="text-dark mb-5 display-7 d-none d-sm-block">Tumhare Paas Kya Hai, Hain...</h3>
                                <Button variant="outline-dark" size="lg" onClick={handleExploreClick}>Explore</Button>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={images.background2}
                            alt="Second slide"
                            style={{ maxHeight: "80vh", objectFit: "cover", filter: "blur(5px)" }}
                        />
                        <Carousel.Caption className="text-start d-md-flex align-items-md-center justify-content-md-start h-100">
                            <div className="bg-white bg-opacity-50 p-4 rounded-start text-left" style={{ borderTopRightRadius: "30px", borderBottomRightRadius: "30px", marginTop: "30px" }}>
                                <h1 className="text-dark fw-bold mb-3 display-5">Mere Paas to</h1>
                                <h2 className="text-dark fw-bold mb-4 display-6">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                <h3 className="text-dark mb-5 display-7 d-none d-sm-block">Tumhare Paas Kya Hai, Hain...</h3>
                                <Button variant="outline-dark" size="lg" onClick={handleExploreClick}>Explore</Button>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={images.background3}
                            alt="Third slide"
                            style={{ maxHeight: "80vh", objectFit: "cover", filter: "blur(5px)" }}
                        />
                        <Carousel.Caption className="text-start d-md-flex align-items-md-center justify-content-md-start h-100">
                            <div className="bg-white bg-opacity-50 p-4 rounded-start text-left" style={{ borderTopRightRadius: "30px", borderBottomRightRadius: "30px", marginTop: "30px" }}>
                                <h1 className="text-dark fw-bold mb-3 display-5">Mere Paas to</h1>
                                <h2 className="text-dark fw-bold mb-4 display-6">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                <h3 className="text-dark mb-5 display-7 d-none d-sm-block">Tumhare Paas Kya Hai, Hain...</h3>
                                <Button variant="outline-dark" size="lg" onClick={handleExploreClick}>Explore</Button>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h2 style={{ color: "#4CAF50", marginBottom: "20px" }}>Welcome to AssetHub</h2>
                        <p style={{ fontSize: "1.1rem", color: "#888", marginBottom: "20px" }}>
                            Your premier platform for managing and trading real estate assets.
                        </p>
                        <p style={{ fontSize: "1.1rem", color: "#888", marginBottom: "20px" }}>
                            At AssetHub, we provide a comprehensive solution for registering,
                            renting, and auctioning properties, cars, and land. Whether
                            you're a property owner, renter, or investor, AssetHub has the
                            tools you need to streamline your transactions and maximize your
                            returns.
                        </p>
                        <p style={{ fontSize: "1.1rem", color: "#888", marginBottom: "20px" }}>
                            Explore our platform to discover a seamless experience for
                            managing your assets and unlocking new opportunities in the
                            real estate market.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-4">
                        <div className="card border-0 shadow" style={{ backgroundColor: "#F1F8E9", padding: "20px" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title" style={{ color: "#4CAF50", marginBottom: "20px" }}>Efficiency</h5>
                                <p className="card-text" style={{ fontSize: "1.1rem", color: "#555", marginBottom: "0" }}>
                                    Streamline your property transactions with our intuitive
                                    platform.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow" style={{ backgroundColor: "#F1F8E9", padding: "20px" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title" style={{ color: "#4CAF50", marginBottom: "20px" }}>Accessibility</h5>
                                <p className="card-text" style={{ fontSize: "1.1rem", color: "#555", marginBottom: "0" }}>
                                    Access your assets and manage transactions anytime, anywhere.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow" style={{ backgroundColor: "#F1F8E9", padding: "20px" }}>
                            <div className="card-body text-center">
                                <h5 className="card-title" style={{ color: "#4CAF50", marginBottom: "20px" }}>Security</h5>
                                <p className="card-text" style={{ fontSize: "1.1rem", color: "#555", marginBottom: "0" }}>
                                    Ensure the safety and integrity of your transactions with our
                                    robust security measures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <h3 style={{ color: "#4CAF50", marginBottom: "20px" }}>Ready to Manage Your Assets?</h3>
                        <p style={{ fontSize: "1.1rem", color: "#888", marginBottom: "20px" }}>
                            Sign up for a free account today and experience the power of
                            AssetHub.
                        </p>
                        <Link to="/auth/signup" >
                            <button className="btn btn-success btn-lg" style={{ width: "200px" }}>Sign Up Now</button>
                        </Link>                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
