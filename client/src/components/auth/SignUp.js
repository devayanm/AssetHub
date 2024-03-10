import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Card, Button } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import Metamask from "../Metamask";

const Register = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <Card className="p-4 shadow" style={{ width: "25rem" }}>
                <h2 className="mb-4 text-center">Sign Up</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser />
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="rounded-end"
                            />
                        </div>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaEnvelope />
                            </span>
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-end"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaPhone />
                            </span>
                            <Form.Control
                                type="tel"
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="rounded-end"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaLock />
                            </span>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-end"
                            />
                        </div>
                    </Form.Group>
                    <Metamask />
                    <Button variant="success" type="submit" className="w-100 mt-3">
                        Sign up
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    Already have an account? <Link to="/auth/signin">Log In</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
