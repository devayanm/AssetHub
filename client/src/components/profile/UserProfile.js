import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Image } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Metamask from "../Metamask";


const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [editProfileImage, setEditProfileImage] = useState(false);
    const [editProfileDetails, setEditProfileDetails] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/user");
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
                                    <ProfileImageForm onCancel={handleCancelEdit} />
                                ) : (
                                    <ProfileImage userData={userData} onEdit={handleEditProfileImage} />
                                )}
                            </div>
                            <hr />
                            {!editProfileImage && !editProfileDetails && (
                                <ProfileDetails userData={userData} onEdit={handleEditProfileDetails} />
                            )}
                            {editProfileDetails && <ProfileDetailsForm userData={userData} onCancel={handleCancelEdit} />}
                        </div>
                        <div>
                            <Metamask />
                        </div>
                    </div>
                </div>
            </div>
            <AssetImages />
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
            <Button variant="outline-primary" onClick={onEdit} className="edit-button">
                <BsPencilSquare /> Edit
            </Button>
        </div>
    );
};

const ProfileDetailsForm = ({ userData, onCancel }) => {
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
                    alert(JSON.stringify(values, null, 2));
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
                    <Button type="submit" variant="primary" disabled={isSubmitting}>Save</Button>
                    <Button type="button" variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
                </Form>
            )}
        </Formik>
    );
};

const ProfileImage = ({ userData, onEdit }) => {
    return (
        <div className="profile-image text-center">
            <div className="profile-image-frame" onClick={onEdit} style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", border: "2px solid #4CAF50", margin: "auto" }}>
                {userData.profileImage ? (
                    <Image src={userData.profileImage} alt="Profile" roundedCircle style={{ width: "100%", height: "100%" }} />
                ) : (
                    <div className="empty-profile-image d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }}>
                        <FaUser style={{ fontSize: "50px", color: "#999" }} />
                    </div>
                )}
            </div>
            <div className="mt-2">
                <p className="text-muted mb-0">Click on the image to edit</p>
            </div>
            <div className="text-end mt-2">
                <Button variant="outline-primary" onClick={onEdit} className="edit-button">
                    <BsPencilSquare /> Edit
                </Button>
            </div>
        </div>
    );
};


const ProfileImageForm = ({ onCancel }) => {
    return (
        <Formik
            initialValues={{ profileImage: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
            validationSchema={Yup.object().shape({
                profileImage: Yup.mixed().required("Profile image is required"),
            })}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="mb-3">
                        <label className="form-label">Profile Image</label>
                        <Field type="file" name="profileImage" className="form-control-file" accept="image/*" />
                        <ErrorMessage name="profileImage" component="div" className="error" />
                    </div>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>Save</Button>
                    <Button type="button" variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
                </Form>
            )}
        </Formik>
    );
};

const AssetImages = () => {
    return null; // Implement AssetImages component here
};

export default UserProfile;
