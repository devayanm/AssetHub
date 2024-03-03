import React from "react";
import { Button } from "react-bootstrap";
import images from "../../constants/images";

const Home = () => {

    const handleExploreClick = () => {
        window.location.href = "/explore";
    };

    const carouselStyle = {
        width: "100%",
        margin: "auto",
        borderRadius: "10px",
        overflow: "hidden"
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
    };

    const captionStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        zIndex: 1,
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    };

    const subtitleStyle = {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    };

    const exploreButtonStyle = {
        fontSize: "1rem",
        fontWeight: "bold",
    };

    return (
        <div className="container mb-3">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div id="home-carousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500" style={carouselStyle}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={images.background} className="d-block w-100 img-fluid" alt="Image 1" />
                                <div style={overlayStyle}></div>
                                <div className="carousel-caption text-center" style={{ ...captionStyle, justifyContent: "center" }}>
                                    <h1 style={{ ...titleStyle, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} className="fw-bold">Mere Paas to</h1>
                                    <h2 style={{ ...subtitleStyle, fontSize: "clamp(1rem, 3vw, 1.5rem)" }} className="fw-bold">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                    <h3 className="d-none d-md-block">Tumhare Paas Kya Hai, Hain...</h3>
                                    <Button variant="outline-light" size="lg" style={exploreButtonStyle} className="mt-3" onClick={handleExploreClick}>Explore</Button>
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src={images.background1} className="d-block w-100 img-fluid" alt="Image 1" />
                                <div style={overlayStyle}></div>
                                <div className="carousel-caption text-center" style={{ ...captionStyle, justifyContent: "center" }}>
                                    <h1 style={{ ...titleStyle, fontSize: "clamp(1rem, 4vw, 2.5rem)" }} className="fw-bold">Mere Paas to</h1>
                                    <h2 style={{ ...subtitleStyle, fontSize: "clamp(0.5rem, 3vw, 1.5rem)" }} className="fw-bold">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                    <h3 className="d-none d-md-block">Tumhare Paas Kya Hai, Hain...</h3>
                                    <Button variant="outline-light" size="lg" style={exploreButtonStyle} className="mt-3" onClick={handleExploreClick}>Explore</Button>
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src={images.background3} className="d-block w-100 img-fluid" alt="Image 1" />
                                <div style={overlayStyle}></div>
                                <div className="carousel-caption text-center" style={{ ...captionStyle, justifyContent: "center" }}>
                                    <h1 style={{ ...titleStyle, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} className="fw-bold">Mere Paas to</h1>
                                    <h2 style={{ ...subtitleStyle, fontSize: "clamp(1rem, 3vw, 1.5rem)" }} className="fw-bold">Ghar hai, Gadi Hai, Zameen Hai</h2>
                                    <h3 className="d-none d-md-block">Tumhare Paas Kya Hai, Hain...</h3>
                                    <Button variant="outline-light" size="lg" style={exploreButtonStyle} className="mt-3" onClick={handleExploreClick}>Explore</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
