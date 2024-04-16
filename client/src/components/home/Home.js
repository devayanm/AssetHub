import React, { useState, useEffect } from 'react';
import { Button, Carousel, Card, Form, Col, Row, Container, FormControl, InputGroup, Dropdown, Spinner, Alert } from "react-bootstrap";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import casual from 'casual-browserify';
import images from "../../constants/images";

const Home = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [trendingCities, setTrendingCities] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPropertyData = async () => {
        try {
            // Fetch property data from API
            // Replace this with your actual API call
            // const response = await fetch('api/properties');
            // const data = await response.json();
            // setProperties(data);

            // For now, use sample data if API is not available
            const sampleData = generateSampleData(10);
            setProperties(sampleData);
        } catch (error) {
            console.error('Error fetching property data:', error);
            setError('Failed to fetch property data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const generateTrendingCities = async () => {
        const cityNames = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad', 'Pune', 'Surat'];
        const cities = cityNames.map(async city => {
            try {
                const response = await fetch(`https://source.unsplash.com/featured/?${city}&query=city`);
                return {
                    name: city,
                    image: response.url,
                    avgPrice: Math.floor(Math.random() * 1000000),
                };
            } catch (error) {
                console.error(`Error fetching image for ${city}:`, error);
                return {
                    name: city,
                    image: images.default, 
                    avgPrice: Math.floor(Math.random() * 1000000),
                };
            }
        });
        try {
            const trendingCitiesData = await Promise.all(cities);
            setTrendingCities(trendingCitiesData);
        } catch (error) {
            console.error('Error fetching trending cities:', error);
            setError('Failed to fetch trending cities. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuthentication = () => {
            const accessToken = localStorage.getItem('accessToken');
            const isAuthenticated = accessToken !== null;
            console.log('Is authenticated:', isAuthenticated);
            setAuthenticated(isAuthenticated);
        };
        checkAuthentication();
        fetchPropertyData();
        generateTrendingCities();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    const generateSampleData = (count) => {
        const sampleData = [];
        for (let i = 0; i < count; i++) {
            const property = {
                id: i + 1,
                image: `https://source.unsplash.com/featured/?house${i + 1}`,
                title: casual.street,
                description: casual.description,
                avgPrice: casual.integer(50000, 5000000),
                city: casual.city,
                country: casual.country,
            };
            sampleData.push(property);
        }
        return sampleData;
    };

    if (loading) {
        return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

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
                <Slider {...settings}>
                    {trendingCities.map((city, index) => (
                        <div key={index} className="d-flex justify-content-center">
                            <Card
                                className="text-center shadow-sm"
                                style={{
                                    width: '18rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    borderRadius: '1rem',
                                    border: 'none',
                                }}
                            >
                                <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
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
                                </div>
                                <Card.Body
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: '0.5rem',
                                        borderRadius: '1rem',
                                        textAlign: 'center' // Center-align text within the card body
                                    }}
                                >                                    <h5 className="text-dark mb-0">{city.name}</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Avg. Price: ${city.avgPrice}</p>
                                    <Link to={`/explore/${city.name}`} className="btn btn-success mt-2">Explore</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>

            {/* Featured Properties */}
            <Container className="py-5 text-center">
                <h2 className="mb-4" style={{ color: "#4CAF50" }}>Featured Properties</h2>
                <Slider {...settings}>
                    {properties.map((property) => (
                        <div key={property.id} className="mx-2">
                            <Card
                                className="text-center shadow-sm"
                                style={{
                                    width: '15rem',
                                    cursor: 'pointer',
                                    borderRadius: '1rem',
                                    border: 'none',
                                    margin: 'auto', 
                                }}
                            >
                                <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                                    <Card.Img
                                        src={property.image}
                                        alt={property.title}
                                        className="rounded-top"
                                        style={{
                                            height: '10rem',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <Card.Body
                                    className="text-center"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        textAlign: 'center' // Center-align text within the card body
                                    }}
                                >
                                    {property.images && property.images.length > 0 ? (
                                        <div id={`carousel-${property.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {property.images.map((image, index) => (
                                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                        <img src={image} className="d-block w-100" alt={`Property ${index + 1}`} style={{ height: '200px', objectFit: 'cover' }} />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${property.id}`} data-bs-slide="prev">
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${property.id}`} data-bs-slide="next">
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    ) : null}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h5 className="text-dark mb-0">{property.title}</h5>
                                        <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                                            <span role="img" aria-label="Price Indicator">
                                                💵
                                            </span>
                                            Average Price: ${property.avgPrice}
                                        </p>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                            {Math.random() > 0.5 ? (
                                                <>
                                                    <span style={{ color: 'green' }}>
                                                        <i className="fas fa-arrow-up"></i>
                                                    </span>
                                                    Prices are trending up!
                                                </>
                                            ) : (
                                                <>
                                                    <span style={{ color: 'red' }}>
                                                        <i className="fas fa-arrow-down"></i>
                                                    </span>
                                                    Prices are trending down!
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <Link to={`/properties/${property.id}`} className="btn btn-success me-2">
                                            View Details
                                        </Link>
                                        <button className="btn btn-outline-success">
                                            Add to Favorites
                                        </button>
                                    </div>
                                </Card.Body>


                            </Card>
                        </div>
                    ))}
                </Slider>
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
