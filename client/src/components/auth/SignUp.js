import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Modal, Spinner } from 'react-bootstrap';
import { userApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Metamask from "../Metamask";

const ConfirmationModal = ({ show, onClose, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); 
        
        try {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('avatar', avatar);
            formData.append('coverImage', coverImage);

            const response = await userApi.registerUser(formData);
            setShowConfirmation(true);
            console.log(response);
        } catch (error) {
            console.error('Error occurred during registration:', error);
            setError(error.message || 'An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
        navigate('/auth/signin');
        window.location.reload();
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row className="justify-content-center w-100">
                <Col xs={12} md={8} lg={6} xl={4}>
                    <Card className="shadow p-4">
                        <h2 className="mb-4 text-center">Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formBasicFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <Form.Group controlId="formBasicAvatar">
                                        <Form.Label>Avatar</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setAvatar(e.target.files[0])}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <Form.Group controlId="formBasicCoverImage">
                                        <Form.Label>Cover Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setCoverImage(e.target.files[0])}
                                        />
                                    </Form.Group>
                                </Col>
                                <Metamask />
                            </Row>
                            <Button variant="success" type="submit" className="w-100 mb-3" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                            </Button>
                            <div className="text-center mt-3">
                                Already have an account? <Link to="/auth/signin">Log In</Link>
                            </div>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Card>
                </Col>
            </Row>
            {showConfirmation && (
                <ConfirmationModal
                    show={showConfirmation}
                    onClose={handleConfirmationClose}
                    message="Registration successful! You are now registered."
                />
            )}
        </Container>
    );
};

export default Register;
