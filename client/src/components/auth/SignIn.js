import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Modal,
  Spinner,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../services/api";
import WalletButton from "../WalletButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await userApi.loginUser({
        username: username,
        password,
      });
      setShowConfirmation(true);
      console.log(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate("/");
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow">
            <div className="mb-3">
              <Button variant="outline-primary" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Back to Home
              </Button>
            </div>
            <h2 className="mb-4 text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId="formBasicUsername"
                className="mb-3 position-relative"
              >
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <strong>Username Requirements:</strong>
                          <br />
                          - Only letters (a-z), numbers (0-9), underscores (_),
                          and periods (.) are allowed.
                          <br />
                          - Must be between 5 to 15 characters.
                          <br />- Must be unique and not already in use.
                        </Tooltip>
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </OverlayTrigger>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                className="position-relative"
              >
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text
                    style={{ cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <strong>Password Requirements:</strong>
                          <br />
                          - Must be at least 8 characters long.
                          <br />
                          - Must contain at least one uppercase letter (A-Z).
                          <br />
                          - Must contain at least one lowercase letter (a-z).
                          <br />
                          - Must contain at least one digit (0-9).
                          <br />- Must contain at least one special character
                          (e.g., !, @, #, $, etc.).
                        </Tooltip>
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </OverlayTrigger>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div className="text-center mt-3">
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </div>

              <div className="mb-3">
                <WalletButton />
              </div>

              <Button
                variant="success"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Log In"}
              </Button>

              <div className="text-center mt-3">
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
              </div>
            </Form>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
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
