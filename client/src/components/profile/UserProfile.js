import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Modal } from "react-bootstrap";
import { userApi } from '../services/api';
import Metamask from "../Metamask";

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [editing, setEditing] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await userApi.getCurrentUser();
            setUserData(response.data);
            setUpdatedUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await userApi.updateAccountDetails(updatedUserData);
            setUserData(updatedUserData);
            setSuccess("Profile updated successfully");
        } catch (error) {
            console.error("Error updating user profile:", error);
            setError("Failed to update profile");
        } finally {
            setEditing(false);
        }
    };

    const handleCancelClick = () => {
        setEditing(false);
        setUpdatedUserData(userData);
    };

    const handleLogout = async () => {
        try {
            await userApi.logoutUser();
            navigate('/auth/signin'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="card shadow p-4">
                        <div className="text-center">
                            <Image
                                src={userData.avatar}
                                alt="Profile"
                                roundedCircle
                                style={{ width: "150px", height: "150px", marginBottom: "20px" }}
                            />
                            <h3 className="mb-3">Welcome {userData.username}</h3>
                        </div>
                        <hr />
                        {editing ? (
                            <EditProfileForm
                                userData={updatedUserData}
                                onInputChange={handleInputChange}
                                onSave={handleSaveClick}
                                onCancel={handleCancelClick}
                            />
                        ) : (
                            <ViewProfile userData={userData} onEdit={handleEditClick} onLogout={handleLogout} />
                        )}
                    </div>
                </Col>
            </Row>
            <ErrorModal message={error} onClose={() => setError(null)} />
            <SuccessModal message={success} onClose={() => setSuccess(null)} />
        </Container>
    );
};

const ViewProfile = ({ userData, onEdit, onLogout }) => {
    return (
        <div>
            <div>
                <p className="mb-2"><strong>Full Name:</strong> {userData.fullName || "Not Provided"}</p>
                <p className="mb-2"><strong>Email:</strong> {userData.email || "Not Provided"}</p>
                <p className="mb-2"><strong>Phone Number:</strong> {userData.phoneNumber || "Not Provided"}</p>
                <Metamask />
                <Button variant="primary" className="me-3" onClick={onEdit}>Edit</Button>
                <Button variant="danger" onClick={onLogout}>Logout</Button>
            </div>
        </div>
    );
};

const EditProfileForm = ({ userData, onInputChange, onSave, onCancel }) => {
    return (
        <Form>
            <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber || ""}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Button variant="primary" onClick={onSave} className="me-3">Save</Button>
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
    );
};

const ErrorModal = ({ message, onClose }) => {
    return (
        <Modal show={!!message} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const SuccessModal = ({ message, onClose }) => {
    return (
        <Modal show={!!message} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserProfile;
