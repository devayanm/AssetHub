import React, { useState, useEffect } from 'react';
import { Button, Carousel, Card, Form, Col, Row, Container, FormControl, InputGroup, Dropdown, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import images from "../../constants/images";

const Home = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [trendingCities, setTrendingCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthentication = () => {
            const accessToken = localStorage.getItem('accessToken');
            const isAuthenticated = accessToken !== null;
            console.log('Is authenticated:', isAuthenticated);
            setAuthenticated(isAuthenticated);
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        generateTrendingCities();
    }, []);

    const generateTrendingCities = async () => {
        const cityNames = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Pune', 'Surat'];
        const cities = cityNames.map(async city => {
            try {
                const response = await fetch(`https://source.unsplash.com/featured/?${city}&query=city`);
                return {
                    name: city,
                    image: response.url
                };
            } catch (error) {
                console.error(`Error fetching image for ${city}:`, error);
                return {
                    name: city,
                    image: images.default
                };
            }
        });
        const trendingCitiesData = await Promise.all(cities);
        setTrendingCities(trendingCitiesData);
    };

    return (
        <>
            <div className=" hero container-fluid mb-3">
                <Carousel fade nextLabel={<span aria-hidden="true">&raquo;</span>} prevLabel={<span aria-hidden="true">&laquo;</span>}>
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
                                <Link to="/explore">
                                    <button className="btn btn-outline-dark btn-lg">Explore</button>
                                </Link>
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
                                <Link to="/explore">
                                    <button className="btn btn-outline-dark btn-lg">Explore</button>
                                </Link>
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
                                <Link to="/explore">
                                    <button className="btn btn-outline-dark btn-lg">Explore</button>
                                </Link>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Trending cities */}
            <Container className="py-5">
                <h2 className="mb-4 text-center" style={{ color: "#4CAF50" }}>Trending Cities for Buying/Selling Assets</h2>
                <Carousel
                    fade
                    interval={null}
                    indicators={false}
                    pause={false}
                    prevIcon={
                        <span className="carousel-control-prev" style={{ left: '-40px' }} aria-hidden="true">
                            <i className="fas fa-chevron-left" style={{ color: 'black', fontSize: '30px' }}></i>
                        </span>}
                    nextIcon={
                        <span className="carousel-control-next" style={{ right: '-40px', color: 'blue' }} aria-hidden="true" >
                            <i className="fas fa-chevron-right" style={{ color: 'black', fontSize: '30px' }}></i>
                        </span>}
                >
                    {[...Array(Math.ceil(trendingCities.length / 5))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-around">
                                {trendingCities.slice(index * 5, (index + 1) * 5).map((city, innerIndex) => (
                                    <Card
                                        className="text-center shadow-sm"
                                        style={{
                                            width: '12rem',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            borderRadius: '1rem',
                                            border: 'none',
                                        }}
                                    >
                                        <div
                                            className="position-relative"
                                            style={{ borderRadius: '1rem', overflow: 'hidden' }}
                                        >
                                            <Card.Img
                                                src={city.image}
                                                alt={city.name}
                                                className="rounded-top"
                                                style={{
                                                    height: '10rem',
                                                    objectFit: 'cover',
                                                    filter: 'blur(5px)',
                                                }}
                                            />
                                            <div
                                                className="position-absolute top-50 start-50 translate-middle"
                                                style={{ transform: 'translate(-50%, -50%)' }}
                                            >
                                                <h5 className="text-white">{city.name}</h5>
                                            </div>
                                            <div
                                                className="overlay position-absolute top-0 start-0 w-100 h-100"
                                                style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            ></div>
                                        </div>
                                    </Card>

                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>

            {/* search bar */}
            <Container className="py-5">
                <h2 className="mb-4 text-center" style={{ color: "#4CAF50" }}>Find Your Perfect Asset</h2>
                <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search for assets..."
                            aria-label="Search for assets"
                            aria-describedby="basic-addon2"
                            style={{ borderRadius: "30px 0 0 30px" }}
                        />
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-success" id="dropdown-basic" style={{ borderRadius: "0 30px 30px 0" }}>
                                Filter
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Action</Dropdown.Item>
                                <Dropdown.Item>Another action</Dropdown.Item>
                                <Dropdown.Item>Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                    <div className="d-grid gap-2 justify-content-center">
                        <Button variant="success" id="button-addon2" style={{ borderRadius: "30px", fontSize: "0.9rem" }}>
                            Search
                        </Button>
                    </div>
                </Form>
                <p className="text-center mt-3" style={{ fontSize: "1.1rem", color: "#888" }}>
                    Refine your search with advanced filters
                </p>
            </Container>


            {/* body */}
            <Container className="py-5">
                <Row className="mb-5">
                    <Col md={12} className="text-center">
                        <h1 className="display-4 mb-4" style={{ color: "#4CAF50" }}>Welcome to AssetHub</h1>
                        <p className="lead mb-4" style={{ fontSize: "1.2rem", color: "#555" }}>
                            Your premier platform for managing and trading real estate assets.
                        </p>
                        <p className="lead mb-4" style={{ fontSize: "1.2rem", color: "#555" }}>
                            At AssetHub, we provide a comprehensive solution for registering,
                            renting, and auctioning properties, cars, and land. Whether
                            you're a property owner, renter, or investor, AssetHub has the
                            tools you need to streamline your transactions and maximize your
                            returns.
                        </p>
                        <p className="lead mb-5" style={{ fontSize: "1.2rem", color: "#555" }}>
                            Explore our platform to discover a seamless experience for
                            managing your assets and unlocking new opportunities in the
                            real estate market.
                        </p>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow">
                            <Card.Body>
                                <h3 className="card-title" style={{ color: "#4CAF50" }}>Efficiency</h3>
                                <p className="card-text">
                                    Streamline your property transactions with our intuitive platform.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow">
                            <Card.Body>
                                <h3 className="card-title" style={{ color: "#4CAF50" }}>Accessibility</h3>
                                <p className="card-text">
                                    Access your assets and manage transactions anytime, anywhere.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card className="h-100 shadow">
                            <Card.Body>
                                <h3 className="card-title" style={{ color: "#4CAF50" }}>Security</h3>
                                <p className="card-text">
                                    Ensure the safety and integrity of your transactions with our robust security measures.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={6} className="mb-3">
                        <h2 className="mb-4" style={{ color: "#4CAF50" }}>Ready to Manage Your Assets?</h2>
                        {authenticated ? (
                            <>
                                <p className="mb-4" style={{ fontSize: "1.2rem", color: "#555" }}>
                                    Go to your personalized dashboard to experience the power of AssetHub.
                                </p>
                                <Link to="/dashboard">
                                    <Button variant="success" size="lg">Dashboard</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="mb-4" style={{ fontSize: "1.2rem", color: "#555" }}>
                                    Sign up for a free account today and experience the power of AssetHub.
                                </p>
                                <Link to="/auth/signup">
                                    <Button variant="success" size="lg">Sign Up Now</Button>
                                </Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
