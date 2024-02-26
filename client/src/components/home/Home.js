import React, { useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import images from "../../constants/images";
import './Home.css';


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
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,800&display=swap')
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
