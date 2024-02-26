import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import images from "../../constants/images";



const Home = () => {
    useEffect(() => {
       

        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js';
        bootstrapScript.async = true;
        document.body.appendChild(bootstrapScript);

        return () => {
            
            document.body.removeChild(bootstrapScript);
        };
    }, []);

    return (
        <><style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,800&display=swap');

            .carousel {
                overflow: hidden;
            }

            .carousel-caption h1 {
                height: 100px;
                font-family: "Poppins", sans-serif;
                font-weight: 800;
                font-style: italic;
                color: teal;
                font-size: 70px;
                margin: 0;
            }

            .carousel-caption h2 {
                font-family: "Poppins", sans-serif;
                font-weight: 800;
                font-style: italic;
                height: 90px;
                font-size: 60px;
                margin: 0;
            }

            .carousel-caption h3 {
                font-family: "Poppins", sans-serif;
                font-weight: 800;
                font-style: italic;
                height: 90px;
                font-size: 45px;
                margin: 0;
            }

            .carousel-item img {
                width: 100vw;
                height: 100vh;
                object-fit: cover;
            }

            .carousel-caption {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                text-align: center;
                overflow: hidden;
            }

            .carousel-container {
                overflow: hidden;
            }

            .btn {
                background-color: #008080;
                color: white;
                border-color: white;
                border-width: 2px;
                transform: translateY(150px);
                font-weight: bold;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                width: 150px !important;
            }

            .btn:hover {
                background-color: #009999;
                color: white;
            }

            @media (max-width: 768px) {
                .carousel-caption h1 {
                    font-size: 40px;
                    height: 90px;
                    margin: 5px;
                }

                .carousel-caption h2 {
                    font-size: 30px;
                    height: 45px;
                    margin-bottom: 0;
                }

                .carousel-caption h3 {
                    font-size: 25px;
                    height: 70px;
                    margin: 5px;
                    margin-top: 0;
                }
            }
        `}
    </style>
        <Container fluid>
                <Row>
                    <Col style={{ padding: 0 }}>
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={images.background} className="d-block w-100" alt="Image 1" style={{ objectFit: "cover", height: "800px", width: "100vw" }} />
                                    <div className="carousel-caption">
                                        <h1 style={{color:"white"}}>mere paas ghar hai</h1>
                                        <h2>gadi hai makaan hai</h2>
                                        <h3>tumhare paas kya hai , hain...</h3>
                                        <button type="button" class="btn btn-lg">Explore</button>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={images.background1} className="d-block w-100" alt="Image 2" style={{ objectFit: "cover", height: "800px", width: "100vw" }} />
                                    <div className="carousel-caption">
                                    <h1>mere paas ghar hai</h1>
                                        <h2  style={{color:"teal"}}>gadi hai makaan hai</h2>
                                        <h3>tumhare paas kya hai , hain...</h3>
                                        <button type="button" class="btn btn-lg">Explore</button>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src={images.background3} className="d-block w-100" alt="Image 3" style={{ objectFit: "cover", height: "800px", width: "100vw" }} />
                                    <div className="carousel-caption">
                                    <h1>mere paas ghar hai</h1>
                                        <h2>gadi hai makaan hai</h2>
                                        <h3>tumhare paas kya hai , hain...</h3>
                                        <button type="button" class="btn btn-lg">Explore</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container></>
    )
};

export default Home;
