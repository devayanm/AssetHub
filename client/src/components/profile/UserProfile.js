import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Modal, ListGroup, Card, Badge, Spinner } from "react-bootstrap";
import { userApi } from '../services/api';
import WalletButton from "../WalletButton";

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [registeredAssets, setRegisteredAssets] = useState([]);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [communityDiscussions, setCommunityDiscussions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
        // fetchRegisteredAssets();
        // fetchTransactionHistory();
        // fetchCommunityDiscussions();
    }, []);

    const navigate = useNavigate();


    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await userApi.getCurrentUser();
            setUserData(response.data);
            setUpdatedUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data");
            setLoading(false);
        }
    };

    // const fetchRegisteredAssets = async () => {
    //     try {
    //         const response = await userApi.getRegisteredAssets();
    //         setRegisteredAssets(response.data);
    //     } catch (error) {
    //         console.error("Error fetching registered assets:", error);
    //         setError("Failed to fetch registered assets");
    //     }
    // };

    // const fetchTransactionHistory = async () => {
    //     try {
    //         const response = await userApi.getTransactionHistory();
    //         setTransactionHistory(response.data);
    //     } catch (error) {
    //         console.error("Error fetching transaction history:", error);
    //         setError("Failed to fetch transaction history");
    //     }
    // };

    // const fetchCommunityDiscussions = async () => {
    //     try {
    //         const response = await userApi.getCommunityDiscussions();
    //         setCommunityDiscussions(response.data);
    //     } catch (error) {
    //         console.error("Error fetching community discussions:", error);
    //         setError("Failed to fetch community discussions");
    //     }
    // };


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
            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                await userApi.uploadAvatar(formData);
                setAvatarFile(null);
            }
        } catch (error) {
            console.error("Error updating user profile:", error);
            setError("Failed to update profile");
        } finally {
            setEditing(false);
        }
    };

    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setUpdatedUserData(userData);
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await userApi.logoutUser();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow p-4 mb-4">
                        <Card.Body>
                            {editing ? (
                                <div className="text-center">
                                    <Image
                                        src={userData.avatar}
                                        alt="Profile"
                                        roundedCircle
                                        style={{ width: "150px", height: "150px", marginBottom: "20px" }}
                                    />
                                    <h3 className="mb-3">Welcome {userData.username}</h3>
                                    {editing ? (
                                        <Form.Group controlId="formAvatar" className="mb-3">
                                            <Form.Label>Change Avatar</Form.Label>
                                            <Form.Control type="file" onChange={handleAvatarChange} />
                                        </Form.Group>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Image
                                        src={userData.avatar}
                                        alt="Profile"
                                        roundedCircle
                                        style={{ width: "150px", height: "150px", marginBottom: "20px" }}
                                    />
                                    <h3 className="mb-3">Welcome {userData.username}</h3>
                                </div>
                            )}
                            <hr />
                            {editing ? (
                                <EditProfileForm
                                    userData={updatedUserData}
                                    onInputChange={handleInputChange}
                                    onSave={handleSaveClick}
                                    onCancel={handleCancelClick}
                                />
                            ) : (
                                <ViewProfile
                                    userData={userData}
                                    onEdit={handleEditClick}
                                    onLogout={handleLogout}
                                    loading={loading}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Registered Assets Card */}
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card className="shadow p-4 mb-4">
                        <Card.Body>
                            <h3 className="mb-3">Registered Assets</h3>
                            <RegisteredAssetsList assets={registeredAssets} />
                            <UnderDevelopmentNotice />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Transaction History Card */}
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card className="shadow p-4 mb-4">
                        <Card.Body>
                            <h3 className="mb-3">Transaction History</h3>
                            <TransactionHistoryList transactions={transactionHistory} />
                            <UnderDevelopmentNotice />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Community Discussions Card */}
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <Card className="shadow p-4 mb-4">
                        <Card.Body>
                            <h3 className="mb-3">Community Discussions</h3>
                            <CommunityDiscussionsList discussions={communityDiscussions} />
                            <UnderDevelopmentNotice />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ErrorModal message={error} onClose={() => setError(null)} />
            <SuccessModal message={success} onClose={() => setSuccess(null)} />
            {loading && <LoadingSpinner />}
        </Container>
    );
};

const ViewProfile = ({ userData, onEdit, onLogout, loading }) => {
    return (
        <div>
            <div>
                <p className="mb-2"><strong>Full Name:</strong> {userData.fullName || "Not Provided"}</p>
                <p className="mb-2"><strong>Email:</strong> {userData.email || "Not Provided"}</p>
                <p className="mb-2"><strong>Phone Number:</strong> {userData.phoneNumber || "Not Provided"}</p>
                <p className="mb-2"><strong>Alternative Number:</strong> {userData.alternativeNumber || "Not Provided"}</p>
                <p className="mb-2"><strong>Pan Number:</strong> {userData.panNumber || "Not Provided"}</p>
                <p className="mb-2"><strong>Aadhar Number:</strong> {userData.aadharNumber || "Not Provided"}</p>
                <p className="mb-2"><strong>Address:</strong> {userData.address || "Not Provided"}</p>
                <WalletButton />
                <Button variant="primary" className="me-3" onClick={onEdit}>Edit</Button>
                <Button
                    variant="danger"
                    onClick={onLogout}
                    disabled={loading}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Logout'}
                </Button>
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

const RegisteredAssetsList = ({ assets }) => {
    return (
        <ListGroup>
            <ListGroup.Item variant="info" className="fw-bold">Registered Assets</ListGroup.Item>
            {assets.map((asset, index) => (
                <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="mb-1">{asset.name}</p>
                            <p className="mb-0">{asset.location}</p>
                        </div>
                        <div>
                            <Button variant="outline-primary" size="sm">View Details</Button>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

const TransactionHistoryList = ({ transactions }) => {
    return (
        <ListGroup>
            <ListGroup.Item variant="info" className="fw-bold">Transaction History</ListGroup.Item>
            {transactions.map((transaction, index) => (
                <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="mb-1">{transaction.description}</p>
                            <p className="mb-0">{transaction.date}</p>
                        </div>
                        <div>
                            <Badge bg="secondary">{transaction.type}</Badge>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

const CommunityDiscussionsList = ({ discussions }) => {
    return (
        <ListGroup>
            <ListGroup.Item variant="info" className="fw-bold">Community Discussions</ListGroup.Item>
            {discussions.map((discussion, index) => (
                <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="mb-1">{discussion.topic}</p>
                            <p className="mb-0">{discussion.author}</p>
                        </div>
                        <div>
                            <Button variant="outline-primary" size="sm">Join Discussion</Button>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
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

const UnderDevelopmentNotice = () => {
    return (
        <div className="mt-4">
            <p className="text-muted">Under development: More features coming soon!</p>
        </div>
    );
};

const LoadingSpinner = () => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default UserProfile;
