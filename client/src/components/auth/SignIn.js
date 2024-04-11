import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Modal } from 'react-bootstrap';
import { userApi } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Metamask from "../Metamask";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await userApi.loginUser({
        username: usernameOrEmail,
        password,
      });
      setShowConfirmation(true); // Show confirmation pop-up
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/');
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow">
            <h2 className="mb-4 text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsernameOrEmail" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username or Email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3 position-relative">
                <Form.Control
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility based on showPassword state
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye} // Show eye icon based on showPassword state
                  onClick={togglePasswordVisibility} // Toggle password visibility when eye icon is clicked
                  className="position-absolute end-0 top-50 translate-middle-y me-3" // Position eye icon within the password field
                  style={{ cursor: 'pointer' }} // Add pointer cursor on hover
                />
              </Form.Group>

              <div className="text-center mt-3">
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </div>

              <div className='mb-3'>
                <Metamask />
              </div>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Log In
              </Button>

              <div className="text-center mt-3">
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
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
          message="Login successful! You are now logged in."
        />
      )}
    </Container>
  );
};

export default Login;
