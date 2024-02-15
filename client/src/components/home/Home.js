import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from 'react-bootstrap';
import images from "../../constants/images";
import './Home.css';

const Home = () => {
    return (
        <div className="homepage">
            <svg className="ellipse1" width="361" height="1015" viewBox="0 0 361 1015" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="-160.327" cy="539.403" rx="520.673" ry="538.883" fill="#90E4C1" />
            </svg>
            <svg className="ellipse2" width="385" height="651" viewBox="0 0 385 651" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M765.521 562.342C652.524 698.07 401.884 673.597 205.7 507.68C9.51709 341.764 -57.9187 97.2337 55.0783 -38.4935C168.075 -174.221 418.716 -149.748 614.899 16.1686C811.082 182.085 878.518 426.615 765.521 562.342Z" fill="#90E4C1" />
            </svg>
            <svg className="ellipse3" width="330" height="610" viewBox="0 0 330 610" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M867.027 393.268C867.027 610.222 673.065 786.099 433.8 786.099C194.535 786.099 0.572021 610.222 0.572021 393.268C0.572021 176.314 194.535 0.437683 433.8 0.437683C673.065 0.437683 867.027 176.314 867.027 393.268Z" fill="#90E4C1" />
            </svg>
            <svg className="ellipse4" width="872" height="143" viewBox="0 0 872 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1084 172.5C1084 267.769 841.338 345 542 345C242.662 345 0 267.769 0 172.5C0 77.2308 242.662 -6.10352e-05 542 -6.10352e-05C841.338 -6.10352e-05 1084 77.2308 1084 172.5Z" fill="#90E4C1" />
            </svg>

            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="hero-text">
                            <h1 className="hero-title">AssetHub</h1>
                            <p className="hero-desc">Streamlining Asset Management: Efficient, Reliable, And Secure</p>
                        </div>
                        <div className="hero-image">
                            <img className="hero-img img-fluid" src={images.hero} alt="Hero" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Button variant="primary">Explore</Button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>
                        <h2>About AssetHub</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ligula sit amet magna accumsan bibendum. Nulla facilisi. Sed in porta nisi. Duis ultricies magna vitae tempor rutrum. Integer vitae elit eu nisl condimentum consectetur eget in ex. Nulla facilisi. Vivamus fringilla felis at eros ultricies efficitur. Proin auctor sapien sed ligula placerat, ut molestie urna venenatis.</p>
                        <p>Nulla facilisi. Curabitur id dictum arcu. Quisque sit amet libero fermentum, varius est eu, convallis justo. Nullam imperdiet ligula nisi, a lobortis libero placerat at. Duis euismod viverra tortor, ut maximus nisi accumsan vel. Ut aliquet, ex in varius consequat, odio quam vulputate nibh, id fermentum libero dui sed dui. Proin bibendum, enim nec commodo finibus, nisl lectus mattis eros, non placerat ligula neque sit amet ex.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
