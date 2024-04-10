import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Image, Modal } from "react-bootstrap";
import { BsPencilSquare, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [editProfileImage, setEditProfileImage] = useState(false);
    const [editProfileDetails, setEditProfileDetails] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/user"); // Fetch user data from backend
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleEditProfileImage = () => {
        setEditProfileImage(true);
    };

    const handleEditProfileDetails = () => {
        setEditProfileDetails(true);
    };

    const handleCancelEdit = () => {
        setEditProfileImage(false);
        setEditProfileDetails(false);
    };

    const handleCloseErrorModal = () => {
        setError(null);
    };

    const handleCloseSuccessModal = () => {
        setSuccess(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Profile</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-header">
                                <h5 className="profile-header-title">Profile Image</h5>
                            </div>
                            <hr />
                            <div className="profile-image-container justify-content-center align-items-center">
                                {editProfileImage ? (
                                    <ProfileImageForm onCancel={handleCancelEdit} setSuccess={setSuccess} setError={setError} />
                                ) : (
                                    <ProfileImage userData={userData} onEdit={handleEditProfileImage} />
                                )}
                            </div>
                            <hr />
                            {!editProfileImage && !editProfileDetails && (
                                <ProfileDetails userData={userData} onEdit={handleEditProfileDetails} />
                            )}
                            {editProfileDetails && <ProfileDetailsForm userData={userData} onCancel={handleCancelEdit} setSuccess={setSuccess} setError={setError} />}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={!!error} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={!!success} onHide={handleCloseSuccessModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{success}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSuccessModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const ProfileDetails = ({ userData, onEdit }) => {
    return (
        <div>
            <h5 className="card-title">Profile Details</h5>
            <p className="card-text"><strong>Name:</strong> {userData.name}</p>
            <p className="card-text"><strong>Email:</strong> {userData.email}</p>
            <p className="card-text"><strong>Phone Number:</strong> {userData.phone}</p>
            <p className="card-text"><strong>PAN Number:</strong> {userData.pan}</p>
            <p className="card-text"><strong>Aadhar Number:</strong> {userData.aadhar}</p>
            <Button variant="outline-success" onClick={onEdit} className="edit-button">
                <FaUserEdit /> Edit
            </Button>
        </div>
    );
};

const ProfileDetailsForm = ({ userData, onCancel, setSuccess, setError }) => {
    return (
        <Formik
            initialValues={{
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                pan: userData.pan,
                aadhar: userData.aadhar
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSuccess("Profile details updated successfully!");
                    setSubmitting(false);
                }, 400);
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
                pan: Yup.string().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Invalid PAN number").required("PAN number is required"),
                aadhar: Yup.string().matches(/^\d{12}$/, "Aadhar number must be 12 digits").required("Aadhar number is required")
            })}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <Field type="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <Field type="tel" name="phone" className="form-control" />
                        <ErrorMessage name="phone" component="div" className="error" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">PAN Number</label>
                        <Field type="text" name="pan" className="form-control" />
                        <ErrorMessage name="pan" component="div" className="error" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Aadhar Number</label>
                        <Field type="text" name="aadhar" className="form-control" />
                        <ErrorMessage name="aadhar" component="div" className="error" />
                    </div>
                    <Button type="submit" variant="success" disabled={isSubmitting}>
                        <BsCheckCircle /> Save
                    </Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        <BsXCircle /> Cancel
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

const ProfileImage = ({ userData, onEdit }) => {
    return (
        <div>
            <Image src={userData.avatar} alt="Profile" roundedCircle style={{ width: "200px", height: "200px", objectFit: "cover" }} />
            <Button variant="outline-success" onClick={onEdit} className="edit-button">
                <BsPencilSquare /> Edit
            </Button>
        </div>
    );
};

const ProfileImageForm = ({ onCancel, setSuccess, setError }) => {
    const handleImageChange = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        try {
            // Send image to backend
            setSuccess("Profile image updated successfully!");
        } catch (error) {
            setError("Error updating profile image");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <Button variant="outline-secondary" onClick={onCancel} className="edit-button">
                <BsXCircle /> Cancel
            </Button>
        </div>
    );
};

export default UserProfile;
